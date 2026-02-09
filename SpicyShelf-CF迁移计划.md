# SpicyShelf — Cloudflare Pages + D1 迁移计划

## 一、迁移目标

- 将网站部署到 Cloudflare Workers（通过 @opennextjs/cloudflare）
- 书籍、Tropes、评论数据迁移到 Cloudflare D1 数据库
- 添加新书只需往 D1 插入数据，无需重新构建
- 保持 SEO 效果（服务端渲染 + CDN 缓存）

## 二、技术方案

### 当前架构
```
JSON 文件 → build 时读取 → 46 个静态 HTML → 部署
```

### 目标架构
```
用户请求 → CF 边缘节点 → Worker 查询 D1 → SSR 渲染 → CDN 缓存 → 返回 HTML
```

### 核心技术栈
- Next.js 16（保持不变）
- @opennextjs/cloudflare（适配器，支持 Next.js 16 所有版本）
- Cloudflare D1（SQLite 数据库）
- Cloudflare R2（ISR 缓存存储）
- Wrangler CLI（开发/部署工具）

## 三、D1 数据库设计

### 设计原则
- 需要查询筛选的字段（spice_level、slug 等）独立建列
- 只在详情页展示的数组字段（subgenres、moods 等）存 JSON 字符串
- 需要关联查询的关系（book ↔ trope）用关联表
- 评论独立表，方便以后扩展用户提交功能

### 表结构

```sql
-- ========================================
-- 书籍主表
-- ========================================
CREATE TABLE books (
  slug              TEXT PRIMARY KEY,
  title             TEXT NOT NULL,
  author            TEXT NOT NULL,
  description       TEXT,
  cover_url         TEXT,
  spice_level       INTEGER NOT NULL,
  page_count        INTEGER,
  publish_year      INTEGER,
  isbn              TEXT UNIQUE,
  amazon_url        TEXT,
  spice_description TEXT,
  editorial_review  TEXT,
  spicy_scene_count INTEGER,
  pov_style         TEXT,
  steam_level       TEXT,
  narrator          TEXT,
  -- 系列信息
  series_name       TEXT,
  series_number     INTEGER,
  series_total_books INTEGER,
  -- 数组字段存 JSON 字符串
  subgenres         TEXT DEFAULT '[]',
  content_warnings  TEXT DEFAULT '[]',
  similar_books     TEXT DEFAULT '[]',
  perfect_for       TEXT DEFAULT '[]',
  skip_if           TEXT DEFAULT '[]',
  moods             TEXT DEFAULT '[]',
  -- 时间戳
  created_at        TEXT DEFAULT (datetime('now')),
  updated_at        TEXT DEFAULT (datetime('now'))
);

-- ========================================
-- Tropes 表
-- ========================================
CREATE TABLE tropes (
  slug        TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT,
  emoji       TEXT
);

-- ========================================
-- 书籍-Trope 关联表（多对多）
-- ========================================
CREATE TABLE book_tropes (
  book_slug  TEXT NOT NULL REFERENCES books(slug) ON DELETE CASCADE,
  trope_slug TEXT NOT NULL REFERENCES tropes(slug) ON DELETE CASCADE,
  PRIMARY KEY (book_slug, trope_slug)
);

-- ========================================
-- 评论表
-- ========================================
CREATE TABLE reviews (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  book_slug    TEXT NOT NULL REFERENCES books(slug) ON DELETE CASCADE,
  username     TEXT NOT NULL,
  spice_rating INTEGER,
  text         TEXT,
  date         TEXT,
  source       TEXT
);

-- ========================================
-- 索引
-- ========================================
CREATE INDEX idx_books_spice ON books(spice_level);
CREATE INDEX idx_books_publish_year ON books(publish_year);
CREATE INDEX idx_book_tropes_trope ON book_tropes(trope_slug);
CREATE INDEX idx_reviews_book ON reviews(book_slug);
```

### 查询模式对应

| 页面 | 查询 |
|------|------|
| 首页（精选书籍） | `SELECT * FROM books ORDER BY created_at DESC LIMIT 6` |
| /books/[slug] | `SELECT * FROM books WHERE slug = ?` + JOIN reviews + JOIN book_tropes |
| /tropes/[slug] | `SELECT b.* FROM books b JOIN book_tropes bt ON b.slug = bt.book_slug WHERE bt.trope_slug = ?` |
| /spice/[level] | `SELECT * FROM books WHERE spice_level = ?` |
| /tropes 列表 | `SELECT t.*, COUNT(bt.book_slug) FROM tropes t LEFT JOIN book_tropes bt ON t.slug = bt.trope_slug GROUP BY t.slug` |
| sitemap.xml | `SELECT slug FROM books` + `SELECT slug FROM tropes` |

## 四、需要修改的文件

### 新增文件
| 文件 | 说明 |
|------|------|
| `wrangler.jsonc` | Wrangler 配置，定义 D1 binding、R2 binding |
| `open-next.config.ts` | OpenNext 适配器配置，定义缓存策略 |
| `.dev.vars` | 本地开发环境变量 |
| `public/_headers` | 静态资源缓存头 |
| `src/lib/db.ts` | D1 数据库访问层（替代当前 books.ts 的 JSON 读取） |
| `scripts/seed.ts` | 数据迁移脚本（JSON → D1） |
| `scripts/schema.sql` | D1 建表 SQL |
| `cloudflare-env.d.ts` | CF 环境类型声明（wrangler 自动生成） |

### 修改文件
| 文件 | 改动 |
|------|------|
| `package.json` | 添加依赖 + CF 相关 scripts |
| `next.config.ts` | 添加 `initOpenNextCloudflareForDev()` 调用 |
| `src/lib/books.ts` | 从 JSON import 改为调用 db.ts 查询 D1 |
| `src/app/books/[slug]/page.tsx` | 移除 generateStaticParams，改为动态渲染 + revalidate |
| `src/app/tropes/[slug]/page.tsx` | 同上 |
| `src/app/spice/[level]/page.tsx` | 同上 |
| `src/app/page.tsx` | 数据获取改为异步 D1 查询 |
| `src/app/tropes/page.tsx` | 同上 |
| `src/app/spice/page.tsx` | 同上 |
| `src/app/sitemap.ts` | 同上 |
| `.gitignore` | 添加 `.open-next`、`.dev.vars` |

### 删除文件
| 文件 | 原因 |
|------|------|
| `src/data/books.json` | 数据迁移到 D1 |
| `src/data/tropes.json` | 数据迁移到 D1 |
| `src/data/reviews.json` | 数据迁移到 D1 |

## 五、缓存策略

### 页面缓存（ISR）
```ts
// 每个动态页面设置 revalidate
export const revalidate = 3600; // 1 小时
```
- 首次请求：Worker 查询 D1 → SSR 渲染 → 缓存到 R2 → 返回
- 后续请求：直接从缓存返回（1 小时内）
- 缓存过期：后台重新渲染，用户无感知（stale-while-revalidate）

### 主动刷新缓存
添加一个 API route，新书入库后调用即可立即生效：
```ts
// src/app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const { secret, path } = await request.json();
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Invalid secret' }, { status: 401 });
  }
  revalidatePath(path || '/');
  return Response.json({ revalidated: true });
}
```

### 缓存组件配置（open-next.config.ts）
```ts
// 小型站点推荐配置
{
  incrementalCache: "r2",           // R2 存储缓存数据
  queue: "durable-objects",         // DO 处理 revalidation 队列
  tagCache: "d1-next-mode",         // D1 管理缓存标签
}
```

## 六、实施步骤

### 第 1 步：安装依赖和配置
1. `npm install @opennextjs/cloudflare`
2. `npm install -D wrangler`
3. 创建 `wrangler.jsonc`（定义 D1、R2 binding）
4. 创建 `open-next.config.ts`
5. 创建 `.dev.vars`
6. 创建 `public/_headers`
7. 更新 `next.config.ts`（添加 initOpenNextCloudflareForDev）
8. 更新 `package.json` scripts
9. 更新 `.gitignore`

### 第 2 步：创建 D1 数据库
1. `npx wrangler d1 create spicyshelf-db`
2. 将数据库 ID 填入 `wrangler.jsonc`
3. 执行 `scripts/schema.sql` 建表

### 第 3 步：数据迁移
1. 编写 `scripts/seed.ts` 读取现有 JSON 文件
2. 将 books.json → books 表 + book_tropes 表
3. 将 tropes.json → tropes 表
4. 将 reviews.json → reviews 表
5. 执行迁移，验证数据完整性

### 第 4 步：重写数据层
1. 创建 `src/lib/db.ts`（D1 查询函数）
2. 重写 `src/lib/books.ts`（调用 db.ts 而非 JSON）
3. 所有数据函数改为 async

### 第 5 步：改造页面
1. 所有页面组件改为 async
2. 移除 `generateStaticParams`（改为动态渲染）
3. 添加 `export const revalidate = 3600`
4. 添加 revalidate API route
5. 更新 sitemap.ts

### 第 6 步：删除旧数据文件
1. 删除 `src/data/books.json`
2. 删除 `src/data/tropes.json`
3. 删除 `src/data/reviews.json`
4. 删除 `src/data/` 目录

### 第 7 步：本地测试
1. `npm run dev` 测试本地开发（使用本地 D1 模拟）
2. `npm run preview` 测试 Workers 运行时
3. 验证所有页面正常渲染
4. 验证 SEO 元数据正确

### 第 8 步：部署
1. `npm run deploy`
2. 验证线上所有页面
3. 配置自定义域名
4. 测试添加新书流程

## 七、添加新书流程（迁移完成后）

```sql
-- 1. 插入书籍
INSERT INTO books (slug, title, author, spice_level, isbn, ...) 
VALUES ('new-book-slug', 'New Book Title', 'Author Name', 4, '9781234567890', ...);

-- 2. 关联 tropes
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('new-book-slug', 'enemies-to-lovers');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('new-book-slug', 'slow-burn');

-- 3. 添加评论（可选）
INSERT INTO reviews (book_slug, username, spice_rating, text, date, source)
VALUES ('new-book-slug', 'reader123', 4, 'Great book!', '2025-01-15', 'Reddit');
```

缓存会在 revalidate 时间（1小时）后自动更新，或调用 revalidate API 立即刷新。

## 八、成本估算（Cloudflare 免费额度）

| 资源 | 免费额度 | 预估用量 |
|------|---------|---------|
| Workers | 10万 requests/天 | 远低于限制 |
| D1 | 5M reads/天, 100K writes/天 | 远低于限制 |
| R2 | 10GB 存储, 1000万 reads/月 | 远低于限制 |
| Pages/Workers 部署 | 无限制 | — |

对于内容型 SEO 站点，免费额度完全够用。

## 九、未来扩展方向

- **搜索功能**：D1 支持 LIKE 查询，或接入 CF Workers AI 做语义搜索
- **后台管理**：添加 admin API routes 做 CRUD，配合简单的管理界面
- **用户系统**：D1 加 users 表 + CF Access 认证
- **评论提交**：开放用户提交评论的 API
- **多语言**：books 表加 locale 字段
- **数据量增长**：D1 单库支持 10GB，可容纳数万本书

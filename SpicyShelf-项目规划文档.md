# SpicyShelf 项目规划文档

## 一、项目概述

SpicyShelf 是一个面向 Romance / Romantasy 读者的工具型网站，核心功能是帮助用户快速查询任意一本 romance 书的「辣度（Spice Level）」「套路标签（Tropes）」和「内容预警（Content Warnings）」。

盈利模式：Amazon Associates 联盟 + Bookshop.org 联盟 + 展示广告（流量起来后）。

定位类比：
- bookseriesinorder.com 拥有「[作者] books in order」这个关键词模式 → 月访问 163 万
- SpicyShelf 要拥有「[书名] spice level」这个关键词模式

---

## 二、市场分析

### 2.1 为什么选择 Romance 书籍方向

Romance 是全球图书市场中最大的虚构类（Fiction）品类。根据 Circana（原 NPD BookScan）数据，BookTok 小说占整个图书市场 7% 的份额。Romantasy（Romance + Fantasy 的融合）正在支撑整个出版行业 — 2025 年畅销榜上大量席位被 Rebecca Yarros 和 Sarah J. Maas 两位作者占据。

BookTok（TikTok 上的读书社区）持续制造新的热门书，每本热门书都会产生一系列搜索需求：
- 「is [书名] spicy」
- 「[书名] spice level」
- 「[书名] content warnings」
- 「[书名] tropes」
- 「[trope名] books」（如 enemies to lovers books）

这些搜索目前由零散的博客文章、Reddit 帖子、TikTok 视频来满足，没有一个专门的结构化工具站。

### 2.2 已验证的同类成功案例（Semrush 2025年12月数据）

以下是经过 Semrush 流量数据验证的、与 SpicyShelf 同类型的「工具型」书籍网站：

| 网站 | 月访问量 | 模式 |
|------|---------|------|
| thestorygraph.com | 403 万 | 通用阅读追踪 + 情绪标签 + 内容预警 |
| romance.io | 351 万 | 按 trope 找相似 romance 书 + 用户提交 spice 评分 |
| bookseriesinorder.com | 163 万 | 查询书籍系列阅读顺序 |
| fictiondb.com | 26.9 万 | 小说数据库 / 系列列表 |
| meetnewbooks.com | 26.6 万 | 读完一本书后推荐下一本 |
| mostrecommendedbooks.com | 16.5 万 | 名人 / 专家推荐的书 |
| booknotification.com | 14.6 万 | 作者新书出版提醒 |

其中 romance.io（351 万月访问）直接验证了 romance 书工具站的巨大市场需求。

### 2.3 竞品分析

| 竞品 | 月访问 | 做什么 | 弱点 / SpicyShelf 的差异化空间 |
|------|--------|--------|-------------------------------|
| romance.io | 351 万 | 按 trope 找相似书，用户评论中含 spice 评分 | 定位是「推荐引擎」而非「查询工具」；spice 信息埋在评论里，不是核心功能；无法直接搜「is [书] spicy」得到答案 |
| thestorygraph.com | 403 万 | 通用阅读追踪 + 情绪标签 | 太大太杂，不是 romance 专用工具；内容预警功能存在但不突出 |
| isthebookspicy.com | 极小 | 书的辣度评级 | Wix 站，体验极差，数据量少，SEO 几乎为零 |
| booktriggerwarnings.com | 极小 | 书的内容预警 wiki | wiki 格式，UX 差，搜索体验差，无 trope 标签 |

核心结论：**「[书名] spice level」这个关键词模式目前无人占领。** romance.io 做的是「推荐」，SpicyShelf 做的是「查询」— 用户意图不同。


### 2.4 关键词机会分析

SpicyShelf 的 SEO 策略基于两类关键词模式：

**模式一：书名 + spice（每本书一个页面）**

每本热门 romance / romantasy 书都会产生以下搜索：
- 「fourth wing spice level」
- 「is twisted love spicy」
- 「a court of thorns and roses content warnings」
- 「iron flame spicy chapters」
- 「ugly love spice rating」
- 「king of wrath heat level」

BookTok 每月都在制造新的热门书，意味着关键词池在持续增长。目前这些搜索结果全是零散的博客文章和 Reddit 帖子，没有专门工具站。

**模式二：trope + books（每个 trope 一个页面）**

- 「enemies to lovers books」
- 「forced proximity romance books」
- 「fake dating books」
- 「grumpy sunshine romance」
- 「dark romance books」
- 「fated mates fantasy books」

这些关键词搜索量大，目前由 Goodreads 列表和博客文章竞争。一个结构化的、可筛选的工具页面有明确的排名优势。

### 2.5 收入模型分析

**Amazon Associates（主要收入）**
- 实体书佣金：4.5%
- Kindle 电子书佣金：约 4%
- 一本 $15 的书 → 约 $0.60-0.68 佣金
- 佣金率低，但 romance 是高频购买品类，读者平均每月读 4-8 本书

**Bookshop.org 联盟（补充收入）**
- 佣金率：10%（比 Amazon 高一倍多）
- 适合对独立书店有好感的读者群体

**Audible 联盟（补充收入）**
- 有声书推荐
- 佣金因地区和计划而异

**展示广告（流量起来后）**
- Mediavine（需 50K sessions/月）或 AdThrive（需 100K pageviews/月）
- RPM 预估：$15-30（书籍/娱乐类）
- 10 万月访问 × $20 RPM = $2,000/月广告收入

**收入预估（保守）**

| 阶段 | 月访问 | 联盟收入 | 广告收入 | 月总收入 |
|------|--------|---------|---------|---------|
| 6 个月 | 1-5 万 | $50-200 | $0 | $50-200 |
| 12 个月 | 5-20 万 | $200-800 | $500-1,000 | $700-1,800 |
| 18 个月 | 20-50 万 | $800-2,000 | $2,000-5,000 | $2,800-7,000 |

---

## 三、可行性评估总结

| 维度 | 评分 | 说明 |
|------|------|------|
| 市场需求 | ⭐⭐⭐⭐⭐ | romance.io 351 万月访问验证了市场 |
| 关键词空间 | ⭐⭐⭐⭐⭐ | 「[书名] spice level」模式无人占领 |
| 竞争强度 | ⭐⭐⭐ | romance.io 强但角度不同；isthebookspicy.com 弱 |
| 数据获取 | ⭐⭐⭐ | 基础数据有 API，核心数据（spice/trope）需手动 + 社区贡献 |
| 佣金收入 | ⭐⭐⭐ | 单笔低（4.5%），需靠量 + 广告补充 |
| 开发难度 | ⭐⭐⭐⭐⭐ | 一个人完全能做，标准 Next.js + 数据库 |
| 增长潜力 | ⭐⭐⭐⭐ | BookTok 持续制造新关键词，市场在增长 |

**风险点：**
1. Amazon 联盟佣金率低（4-4.5%），单靠联盟收入有限
2. Goodreads API 已被 Amazon 关闭，核心数据（spice/trope/content warning）需手动整理
3. romance.io 如果加强 spice 查询功能，会形成竞争
4. Google AI Overview 可能直接回答部分查询，吃掉一些流量

**缓解措施：**
1. 多元化收入：Bookshop.org（10%）+ Audible + 展示广告
2. 初始手动整理 500 本热门书，上线后开放社区贡献
3. 占领不同的关键词模式（「查询」vs「推荐」）
4. 提供结构化社区评分数据（具体到章节），这是 AI 难以复制的


---

## 四、产品规划

### 4.1 核心用户画像

- 年龄：18-35 岁女性为主
- 行为：活跃于 BookTok / Instagram Bookstagram / Reddit r/RomanceBooks
- 核心需求：选书前快速了解一本书的辣度、套路、是否有敏感内容
- 使用场景：
  - 「朋友推荐了 Fourth Wing，我想知道有多辣再决定要不要读」
  - 「我想找 enemies to lovers + 高辣度的 romantasy 书」
  - 「我有 PTSD 触发点，想提前知道这本书有没有相关内容」

### 4.2 核心功能

**MVP（第一阶段 — 已完成骨架）**

1. **书籍详情页**（SEO 核心页面）
   - 封面 + 基础信息（作者、页数、出版年份）
   - 🌶️ Spice Level 评分（0-5 级，醒目展示）
   - Trope 标签（可点击跳转到 trope 页面）
   - Content Warnings 列表
   - Amazon 购买链接（联盟链接）
   - 相似书籍推荐
   - FAQ 区域（针对 SEO：「Is [书名] spicy?」等）
   - JSON-LD 结构化数据

2. **Trope 浏览页**
   - 所有 trope 列表页
   - 单个 trope 页面（如 /tropes/enemies-to-lovers）→ 列出该 trope 下所有书

3. **Spice Level 浏览页**
   - 按辣度等级浏览（0-5 级）
   - 每个等级一个页面（如 /spice/4）

4. **首页**
   - 热门书籍展示
   - Trope 快速导航
   - Spice Level 快速导航

**第二阶段（上线后 1-3 个月）**

5. **搜索功能**
   - 按书名 / 作者搜索
   - 自动补全建议

6. **高级筛选**
   - 多条件组合筛选：trope + spice level + subgenre
   - 例如：「enemies to lovers + spice 4+ + romantasy」

7. **社区贡献系统**
   - 用户提交 spice 评分（投票制，取平均值）
   - 用户提交 trope 标签
   - 用户提交 content warnings
   - 无需注册，简单的投票 / 提交表单

**第三阶段（3-6 个月）**

8. **用户账户系统**
   - 注册 / 登录
   - 个人书架（想读 / 已读）
   - 阅读偏好设置

9. **「Spicy Chapters」功能**
   - 标注具体哪些章节有 spicy 内容
   - 这是 isthebookspicy.com 没做好的功能，也是用户高频搜索的内容

10. **BookTok 热门追踪**
    - 自动或手动追踪 BookTok 当前热门书
    - 「本周 BookTok 热门」板块

### 4.3 页面结构与 URL 设计

```
/                           → 首页
/books/[slug]               → 书籍详情页（SEO 核心）
/tropes                     → 所有 trope 列表
/tropes/[slug]              → 单个 trope 下的书籍列表
/spice                      → 按辣度浏览总览
/spice/[level]              → 某个辣度等级的书籍列表
/search                     → 搜索页（第二阶段）
/about                      → 关于页面
/submit                     → 社区提交页面（第二阶段）
```

### 4.4 SEO 策略

**页面级 SEO**
- 每个书籍页面的 title 格式：`{书名} Spice Level — {辣度描述} ({数字}/5) | SpicyShelf`
- 每个书籍页面的 description 包含：书名、作者、spice level、主要 tropes、content warnings
- keywords 覆盖：`{书名} spice level`、`is {书名} spicy`、`{书名} content warnings`、`{书名} tropes`
- JSON-LD 结构化数据（Book schema）
- FAQ 区域（针对 Google Featured Snippets）

**Trope 页面 SEO**
- title 格式：`{Trope名} Books — {数量} Romance Books with This Trope | SpicyShelf`
- 覆盖关键词：`{trope} books`、`{trope} romance books`、`best {trope} books`

**技术 SEO**
- 全站静态生成（SSG），加载速度极快
- 自动生成 sitemap.xml
- 移动端完全响应式
- Core Web Vitals 优化（静态页面天然优秀）

**内容增长策略**
- 初始：500 本 BookTok 热门 romance 书
- 每周新增：10-20 本新书（跟踪 BookTok 热门 + 新出版）
- 目标 12 个月：2,000+ 本书 = 2,000+ 个 SEO 着陆页


---

## 五、技术架构

### 5.1 技术栈

| 层级 | 技术选型 | 理由 |
|------|---------|------|
| 框架 | Next.js 16 (App Router) | SSG 静态生成，SEO 友好，Vercel 免费部署 |
| 语言 | TypeScript | 类型安全，减少 bug |
| 样式 | Tailwind CSS | 快速开发，响应式 |
| 数据存储（MVP） | JSON 文件 | 零成本，静态生成，简单 |
| 数据存储（第二阶段） | Supabase (PostgreSQL) | 免费额度大，支持社区贡献 |
| 部署 | Vercel | 免费，自动 CI/CD，全球 CDN |
| 域名 | spicybooks.org | 已确定 |

### 5.2 数据模型

```
Book {
  slug: string          // URL 友好的唯一标识，如 "fourth-wing"
  title: string         // 书名
  author: string        // 作者
  description: string   // 简介
  coverUrl: string      // 封面图片 URL
  spiceLevel: number    // 0-5 辣度评分
  pageCount: number     // 页数
  publishYear: number   // 出版年份
  isbn: string          // ISBN
  amazonUrl: string     // Amazon 联盟链接
  tropes: string[]      // trope slug 数组
  subgenres: string[]   // 子类型
  contentWarnings: string[]  // 内容预警
  similarBooks: string[]     // 相似书籍的 slug 数组
}

Trope {
  slug: string          // URL 友好的唯一标识
  name: string          // 显示名称
  description: string   // 描述
  emoji: string         // 图标 emoji
}
```

### 5.3 Spice Level 评分体系

| 等级 | 标签 | 描述 |
|------|------|------|
| 0 | No Spice (Clean) | 无任何浪漫/亲密内容 |
| 1 | Mild (Fade to Black) | 有浪漫情节但亲密场景淡出处理 |
| 2 | Warm (Closed Door+) | 有暗示性内容但不详细描写 |
| 3 | Spicy (Moderate Scenes) | 有明确的亲密场景，中等程度描写 |
| 4 | Very Spicy (Explicit) | 详细的亲密场景描写 |
| 5 | Scorching (Very Explicit) | 非常详细且频繁的亲密场景 |

### 5.4 Trope 标签体系（初始 20 个）

| Trope | Emoji | 说明 |
|-------|-------|------|
| Enemies to Lovers | ⚔️ | 从互相讨厌到相爱 |
| Forced Proximity | 🏠 | 被迫近距离相处 |
| Fake Dating | 💍 | 假装约会变真感情 |
| Friends to Lovers | 🤝 | 朋友变恋人 |
| Grumpy / Sunshine | 🌤️ | 一个闷骚一个阳光 |
| Second Chance | 🔄 | 旧情复燃 |
| Forbidden Love | 🚫 | 禁忌之恋 |
| Slow Burn | 🔥 | 慢热型感情线 |
| Only One Bed | 🛏️ | 只有一张床 |
| Arranged Marriage | 👑 | 包办婚姻 |
| Love Triangle | 🔺 | 三角恋 |
| Dark Romance | 🖤 | 黑暗浪漫 |
| Touch Her and Die | 🗡️ | 极度保护欲 |
| Who Did This to You | 😤 | 发现对方受伤后的保护模式 |
| He Falls First | 💘 | 男主先动心 |
| Found Family | 🏡 | 非血缘的家人 |
| Fated Mates | ✨ | 命中注定 |
| Billionaire / CEO | 💰 | 霸道总裁 |
| Sports Romance | 🏈 | 体育浪漫 |
| Romantasy | 🐉 | 浪漫 + 奇幻 |

### 5.5 项目文件结构

```
spicyshelf/
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 全局布局（Header + Footer + SEO meta）
│   │   ├── page.tsx            # 首页
│   │   ├── globals.css         # 全局样式
│   │   ├── books/
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # 书籍详情页（SEO 核心）
│   │   ├── tropes/
│   │   │   ├── page.tsx        # 所有 trope 列表
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # 单个 trope 书籍列表
│   │   └── spice/
│   │       ├── page.tsx        # 辣度浏览总览
│   │       └── [level]/
│   │           └── page.tsx    # 某辣度等级书籍列表
│   ├── components/
│   │   ├── BookCard.tsx        # 书籍卡片组件
│   │   ├── SpiceRating.tsx     # 辣度评分展示组件
│   │   ├── TropeTag.tsx        # Trope 标签组件
│   │   ├── ContentWarning.tsx  # 内容预警组件
│   │   └── Header.tsx          # 顶部导航
│   ├── lib/
│   │   ├── books.ts            # 数据访问层
│   │   └── types.ts            # TypeScript 类型定义
│   └── data/
│       ├── books.json          # 书籍种子数据
│       └── tropes.json         # Trope 标签数据
```


---

## 六、数据源与数据获取策略

### 6.1 可用的免费数据源

| 数据源 | 提供什么 | 限制 |
|--------|---------|------|
| Open Library API | 书名、作者、ISBN、封面、页数、出版日期 | 免费，无需 API key |
| Open Library Covers | 封面图片（`https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg`） | 免费 |
| Google Books API | 书名、作者、描述、封面、页数 | 免费额度 1000 次/天 |
| Amazon Product Advertising API | 价格、评分、购买链接 | 需要 Amazon Associates 账号 |

**注意：Goodreads API 已被 Amazon 关闭，不可用。**

### 6.2 核心数据获取策略

Spice Level、Tropes、Content Warnings 这三类核心数据没有现成的免费 API，需要通过以下方式获取：

**阶段一：手动整理（上线前）**
- 目标：500 本最热门的 romance / romantasy 书
- 数据来源：
  - Reddit r/RomanceBooks 社区的推荐帖和讨论
  - Goodreads 的 shelf 标签（如 enemies-to-lovers shelf）
  - BookTok 热门书单
  - romance.io 的公开书籍页面
  - StoryGraph 的公开内容预警信息
- 预估工作量：每本书约 5-10 分钟，500 本约 40-80 小时
- 可以分批进行：先做 100 本最热门的上线，再逐步扩充

**阶段二：社区贡献（上线后）**
- 开放用户提交表单
- 用户可以为任意书籍提交：spice 评分、trope 标签、content warnings
- 采用投票制：多人提交取平均值 / 多数值
- 参考模式：booktriggerwarnings.com 的 wiki 模式，但 UX 更好

**阶段三：半自动化（规模化后）**
- 利用 AI 辅助从书评中提取 trope 和 content warning 信息
- 人工审核 + AI 建议的混合模式

### 6.3 封面图片方案

MVP 阶段使用 Open Library Covers API：
```
https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg
```

示例：
```
https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg  → Fourth Wing 封面
```

优点：免费、无需存储、直接通过 ISBN 获取
缺点：部分新书可能没有封面，需要 fallback 占位图

---

## 七、Amazon 联盟接入指南

### 7.1 注册 Amazon Associates

1. 访问 https://affiliate-program.amazon.com/
2. 注册账号（需要网站 URL，可以先用临时域名）
3. 获取 Associate Tag（格式如 `spicyshelf-20`）
4. 将 `YOUR_TAG` 替换为真实的 tag

### 7.2 联盟链接格式

```
https://www.amazon.com/dp/{ASIN}?tag={YOUR_TAG}
```

示例：
```
https://www.amazon.com/dp/1649374042?tag=spicyshelf-20
```

### 7.3 佣金率

| 品类 | 佣金率 |
|------|--------|
| 实体书 | 4.50% |
| Kindle 电子书 | ~4% |
| Audible 有声书 | 因计划而异 |

### 7.4 合规要求

- 页面底部必须包含 Amazon Associates 披露声明
- 已在 layout.tsx 的 footer 中添加：「As an Amazon Associate we earn from qualifying purchases.」
- 联盟链接必须添加 `rel="nofollow"` 属性（已在代码中实现）

---

## 八、部署与上线计划

### 8.1 部署到 Vercel

```bash
cd spicyshelf
npx vercel
```

Vercel 免费计划包含：
- 自动 HTTPS
- 全球 CDN
- 自动 CI/CD（推送到 GitHub 自动部署）
- 自定义域名支持
- 每月 100GB 带宽（足够初期使用）

### 8.2 域名建议

已确定域名：spicybooks.org

### 8.3 上线检查清单

- [ ] 替换所有 `YOUR_TAG` 为真实的 Amazon Associates tag
- [ ] 添加真实封面图片（Open Library Covers API）
- [ ] 扩充书籍数据到至少 100 本
- [ ] 添加 sitemap.xml（Next.js 内置支持）
- [ ] 添加 robots.txt
- [ ] 配置 Google Search Console
- [ ] 配置 Google Analytics
- [ ] 注册域名并绑定到 Vercel
- [ ] 提交 sitemap 到 Google Search Console
- [ ] 在 Reddit r/RomanceBooks 等社区做初始推广


---

## 九、增长路线图

### 第一阶段：冷启动（第 1-3 个月）

**目标：** 100-500 本书上线，开始获取自然搜索流量

| 任务 | 优先级 | 预估时间 |
|------|--------|---------|
| 扩充书籍数据到 100 本 | P0 | 1-2 周 |
| 接入 Open Library Covers API 显示真实封面 | P0 | 1 天 |
| 注册 Amazon Associates 并替换联盟链接 | P0 | 1 天 |
| 部署到 Vercel + 绑定域名 | P0 | 1 天 |
| 配置 Google Search Console + 提交 sitemap | P0 | 1 天 |
| 扩充到 500 本书 | P1 | 2-4 周 |
| 添加搜索功能 | P1 | 2-3 天 |
| 在 Reddit / BookTok 社区做初始推广 | P1 | 持续 |
| 添加 Bookshop.org 联盟链接 | P2 | 1 天 |

### 第二阶段：增长（第 4-6 个月）

**目标：** 1,000+ 本书，月访问 5-10 万

| 任务 | 优先级 | 预估时间 |
|------|--------|---------|
| 开放社区贡献系统（用户提交 spice/trope/warnings） | P0 | 1-2 周 |
| 接入 Supabase 数据库（替代 JSON 文件） | P0 | 1 周 |
| 高级筛选功能（多条件组合） | P1 | 3-5 天 |
| 「Spicy Chapters」功能 | P1 | 1 周 |
| 扩充到 1,000+ 本书 | P1 | 持续 |
| 申请 Mediavine 广告（需 50K sessions/月） | P2 | 达标后申请 |

### 第三阶段：规模化（第 7-12 个月）

**目标：** 2,000+ 本书，月访问 20-50 万

| 任务 | 优先级 |
|------|--------|
| 用户账户系统 + 个人书架 | P1 |
| BookTok 热门追踪板块 | P1 |
| 邮件订阅（每周新书推荐） | P2 |
| 多语言支持（西班牙语市场巨大） | P2 |
| 移动 App（PWA） | P3 |

---

## 十、当前项目状态

### 已完成

- ✅ Next.js 16 + TypeScript + Tailwind CSS 项目初始化
- ✅ 12 本 BookTok 热门 romance 书的种子数据
- ✅ 20 个 trope 标签体系
- ✅ 书籍详情页（含 spice 评分 / tropes / content warnings / FAQ / JSON-LD）
- ✅ Trope 浏览页（列表页 + 单个 trope 页）
- ✅ Spice Level 浏览页（总览 + 单个等级页）
- ✅ 首页（热门书籍 + trope 导航 + spice level 导航）
- ✅ SEO meta 标签（每个页面精准定位目标关键词）
- ✅ Amazon 联盟链接占位
- ✅ 构建验证通过（44 个静态页面全部生成）

### 待完成（上线前必须）

- ⬜ 替换 `YOUR_TAG` 为真实 Amazon Associates tag
- ⬜ 扩充书籍数据到 100+ 本
- ⬜ 接入 Open Library Covers API 显示真实封面
- ⬜ 添加 sitemap.xml
- ⬜ 部署到 Vercel
- ⬜ 注册域名

### 运行方式

```bash
cd spicyshelf
npm install
npm run dev     # 开发模式，访问 http://localhost:3000
npm run build   # 生产构建
```

---

## 附录：参考网站与数据来源

| 网站 | URL | 用途 |
|------|-----|------|
| romance.io | https://romance.io | 竞品参考（351 万月访问） |
| bookseriesinorder.com | https://bookseriesinorder.com | 模式参考（163 万月访问） |
| isthebookspicy.com | https://isthebookspicy.com | 直接竞品（极弱） |
| booktriggerwarnings.com | https://booktriggerwarnings.com | 内容预警参考 |
| thestorygraph.com | https://thestorygraph.com | 功能参考 |
| Open Library API | https://openlibrary.org/developers/api | 书籍元数据 |
| Open Library Covers | https://covers.openlibrary.org | 封面图片 |
| Amazon Associates | https://affiliate-program.amazon.com | 联盟注册 |
| Reddit r/RomanceBooks | https://reddit.com/r/RomanceBooks | 社区调研 + 数据来源 |
| Semrush | https://semrush.com/website/ | 流量数据验证 |

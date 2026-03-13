# 添加新书 SQL 示例

## 使用方法

通过 `wrangler d1 execute` 命令将 SQL 语句执行到远程 D1 数据库。

```bash
# 执行单条 SQL
npx wrangler d1 execute spicybooks-db --remote --command "你的SQL语句"

# 执行 SQL 文件
npx wrangler d1 execute spicybooks-db --remote --file ./scripts/insert-book.sql
```

---

## 一、查询已有数据（避免重复）

```bash
# 查看所有书籍
npx wrangler d1 execute spicybooks-db --remote --command "SELECT slug, title, author FROM books ORDER BY title"

# 查看所有 tropes
npx wrangler d1 execute spicybooks-db --remote --command "SELECT slug, name FROM tropes ORDER BY name"

# 查看某本书是否已存在
npx wrangler d1 execute spicybooks-db --remote --command "SELECT slug FROM books WHERE slug = 'your-book-slug'"
```

---

## 二、SQL 模板

### 插入书籍（完整模板）

```sql
INSERT INTO books (
  slug, title, author, description, cover_url, spice_level,
  page_count, publish_year, isbn, amazon_url,
  spice_description, editorial_review, spicy_scene_count,
  pov_style, steam_level, narrator,
  series_name, series_number, series_total_books,
  subgenres, content_warnings, similar_books,
  perfect_for, skip_if, moods
) VALUES (
  'book-slug-here',                    -- slug (主键，URL标识符)
  'Book Title Here',                   -- title (必填)
  'Author Name',                       -- author (必填)
  'Book description...',               -- description
  'https://cover-image-url.jpg',       -- cover_url
  3,                                   -- spice_level (0-5，必填)
  350,                                 -- page_count
  2023,                                -- publish_year
  '9781234567890',                     -- isbn
  'https://www.amazon.com/dp/ASIN?tag=chessanalys05-20',  -- amazon_url
  'Spice description text...',         -- spice_description
  'Editorial review text...',          -- editorial_review
  5,                                   -- spicy_scene_count
  'Dual POV',                          -- pov_style
  'Steamy',                            -- steam_level
  NULL,                                -- narrator (有声书朗读者，无则 NULL)
  NULL,                                -- series_name (无系列则 NULL)
  NULL,                                -- series_number
  NULL,                                -- series_total_books
  '["Contemporary Romance","Romantic Comedy"]',  -- subgenres (JSON数组)
  '["Explicit sexual content"]',                 -- content_warnings (JSON数组)
  '["some-other-book-slug"]',                    -- similar_books (JSON数组，存slug)
  '["Fans of enemies-to-lovers"]',               -- perfect_for (JSON数组)
  '["You prefer clean romance"]',                -- skip_if (JSON数组)
  '["Funny","Steamy"]'                           -- moods (JSON数组)
);
```

### 插入 book_tropes 关联（每个 trope 一条）

```sql
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('book-slug-here', 'enemies-to-lovers');
INSERT INTO book_tropes (book_slug, trope_slug) VALUES ('book-slug-here', 'forced-proximity');
```

### 插入评论（可选）

```sql
INSERT INTO reviews (book_slug, username, spice_rating, text, date, source)
VALUES ('book-slug-here', 'BookLover99', 4, 'Great spicy read!', '2024-06-15', 'Goodreads');
```

---

## 三、已有 Tropes 列表（可直接引用）

| slug | name |
|------|------|
| arranged-marriage | Arranged Marriage |
| billionaire-ceo | Billionaire / CEO |
| cinderella-retelling | Cinderella Retelling |
| dark-romance | Dark Romance |
| enemies-to-lovers | Enemies to Lovers |
| fake-dating | Fake Dating |
| fated-mates | Fated Mates |
| forbidden-love | Forbidden Love |
| forced-proximity | Forced Proximity |
| found-family | Found Family |
| friends-to-lovers | Friends to Lovers |
| grumpy-sunshine | Grumpy / Sunshine |
| he-falls-first | He Falls First |
| historical-romance | Historical Romance |
| love-triangle | Love Triangle |
| marriage-of-convenience | Marriage of Convenience |
| only-one-bed | Only One Bed |
| pen-pals-to-lovers | Pen Pals to Lovers |
| rake-reformed | Rake Reformed |
| romantasy | Romantasy |
| second-chance | Second Chance |
| secret-identity | Secret Identity |
| slow-burn | Slow Burn |
| sports-romance | Sports Romance |
| touch-her-and-die | Touch Her and Die |
| unrequited-love | Unrequited Love |
| who-did-this-to-you | Who Did This to You |

如果需要新的 trope，先插入 tropes 表：

```sql
INSERT INTO tropes (slug, name, description, emoji)
VALUES ('new-trope-slug', 'New Trope Name', 'Description of the trope', '🔥');
```

---

## 四、添加新 Trope 的 SQL 模板

```sql
INSERT INTO tropes (slug, name, description, emoji)
VALUES (
  'trope-slug',        -- slug (主键)
  'Trope Name',        -- name (必填)
  'Description...',    -- description
  '🔥'                 -- emoji
);
```

---

## 五、Spice Level 参考

| 等级 | 标签 | 说明 |
|------|------|------|
| 0 | No Spice (Clean) | 无浪漫或亲密内容 |
| 1 | Mild (Fade to Black) | 有浪漫但亲密场景淡出 |
| 2 | Warm (Closed Door+) | 有暗示性内容但不明确描述 |
| 3 | Spicy (Moderate Scenes) | 明确的亲密场景，适度描述 |
| 4 | Very Spicy (Explicit) | 详细的明确亲密场景 |
| 5 | Scorching (Very Explicit) | 非常详细且频繁的亲密场景 |

---

## 六、字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| slug | TEXT | ✅ | URL标识符，小写+连字符，如 `the-duke-and-i` |
| title | TEXT | ✅ | 书名 |
| author | TEXT | ✅ | 作者 |
| description | TEXT | | 书籍简介 |
| cover_url | TEXT | | 封面图片URL |
| spice_level | INTEGER | ✅ | 辣度 0-5 |
| page_count | INTEGER | | 页数 |
| publish_year | INTEGER | | 出版年份 |
| isbn | TEXT | | ISBN（唯一） |
| amazon_url | TEXT | | Amazon链接（含affiliate tag） |
| spice_description | TEXT | | 辣度详细描述 |
| editorial_review | TEXT | | 编辑推荐语 |
| spicy_scene_count | INTEGER | | 辣味场景数量 |
| pov_style | TEXT | | 叙事视角，如 Dual POV, First Person |
| steam_level | TEXT | | 蒸汽等级描述 |
| narrator | TEXT | | 有声书朗读者 |
| series_name | TEXT | | 系列名称 |
| series_number | INTEGER | | 系列第几本 |
| series_total_books | INTEGER | | 系列总数 |
| subgenres | TEXT | | JSON数组，子类型 |
| content_warnings | TEXT | | JSON数组，内容警告 |
| similar_books | TEXT | | JSON数组，相似书籍slug |
| perfect_for | TEXT | | JSON数组，适合人群 |
| skip_if | TEXT | | JSON数组，不适合情况 |
| moods | TEXT | | JSON数组，阅读氛围 |

---

## 七、注意事项

1. slug 必须唯一，建议格式：书名小写，空格换连字符，去掉特殊字符
2. JSON 数组字段用单引号包裹，内部用双引号：`'["item1","item2"]'`
3. 无值的字段用 `NULL`
4. amazon_url 格式：`https://www.amazon.com/dp/{ASIN}?tag=chessanalys05-20`
5. 添加书籍后记得也添加 book_tropes 关联
6. 前台页面有 1 小时缓存（revalidate = 3600），新书添加后最多 1 小时后显示

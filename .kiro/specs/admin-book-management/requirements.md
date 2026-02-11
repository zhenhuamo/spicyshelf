# 需求文档

## 简介

为 SpicyBooks 网站创建一个后台管理系统（`/admin`），供网站所有者管理书籍数据、Tropes 分类和用户评论。系统使用简单的密码认证，通过 Cloudflare 环境变量存储密码，并使用 cookie 保持登录状态。后台提供书籍的完整 CRUD 操作，支持通过 ISBN 从 Google Books API 自动填充基础信息，以及分步表单录入 Spice 数据、标签分类和编辑内容。

## 术语表

- **Admin_System**：后台管理系统，部署在 `/admin` 路径下的所有页面和 API 的总称
- **Auth_Module**：认证模块，负责密码验证和 cookie 会话管理
- **Book_Form**：书籍表单，用于添加和编辑书籍的分步表单组件
- **Book_List**：书籍列表页面，展示所有书籍并支持搜索和分页
- **ISBN_Fetcher**：ISBN 数据获取器，通过 Google Books API 根据 ISBN 获取书籍基础信息
- **Slug_Generator**：Slug 生成器，从书名自动生成 URL 友好的标识符
- **ASIN_URL_Builder**：ASIN URL 构建器，根据输入的 ASIN 自动拼接完整的 Amazon Associates 链接
- **Trope_Manager**：Trope 管理模块，负责 tropes 的增删改操作
- **Review_Manager**：评论管理模块，负责用户评论的增删改操作
- **Tag_Input**：标签输入组件，用于输入和管理 JSON 数组类型的字段（subgenres、content_warnings、moods 等）
- **Admin_API**：后台 API 路由，处理所有 CRUD 操作的 Next.js Route Handlers

## 需求

### 需求 1：管理员认证

**用户故事：** 作为网站所有者，我希望通过密码保护后台管理页面，以防止未授权访问。

#### 验收标准

1. WHEN 未认证用户访问 `/admin` 路径下的任何页面, THE Admin_System SHALL 显示登录表单要求输入密码
2. WHEN 用户提交正确的密码, THE Auth_Module SHALL 设置一个 HTTP-only cookie 并将用户重定向到 `/admin/books`
3. WHEN 用户提交错误的密码, THE Auth_Module SHALL 显示错误提示信息并保持在登录页面
4. WHILE 用户持有有效的认证 cookie, THE Admin_System SHALL 允许访问所有后台管理页面
5. WHEN 用户点击登出按钮, THE Auth_Module SHALL 清除认证 cookie 并重定向到登录页面
6. THE Auth_Module SHALL 将用户提交的密码与 Cloudflare 环境变量 `ADMIN_PASSWORD` 中存储的值进行比较

### 需求 2：书籍列表与搜索

**用户故事：** 作为网站所有者，我希望查看所有书籍并能快速搜索，以便高效管理书籍数据。

#### 验收标准

1. WHEN 管理员访问 `/admin/books`, THE Book_List SHALL 以分页列表形式展示所有书籍，每页显示 20 条记录
2. WHEN 管理员在搜索框中输入关键词, THE Book_List SHALL 按书名和作者名过滤书籍列表
3. WHEN 书籍列表展示时, THE Book_List SHALL 显示每本书的封面缩略图、书名、作者、spice_level 和创建时间
4. WHEN 管理员点击某本书, THE Book_List SHALL 导航到该书的编辑页面
5. WHEN 管理员点击"添加新书"按钮, THE Book_List SHALL 导航到 `/admin/books/new`

### 需求 3：通过 ISBN 自动填充书籍信息

**用户故事：** 作为网站所有者，我希望输入 ISBN 后自动从 Google Books API 获取书籍基础信息，以减少手动输入工作量。

#### 验收标准

1. WHEN 管理员在 Book_Form 的第一步输入 ISBN 并点击"获取信息"按钮, THE ISBN_Fetcher SHALL 调用 Google Books API 获取书籍数据
2. WHEN Google Books API 返回有效数据, THE ISBN_Fetcher SHALL 自动填充 title、author、description、page_count、publish_year、cover_url 字段
3. IF Google Books API 返回空结果或请求失败, THEN THE ISBN_Fetcher SHALL 显示错误提示并允许管理员手动填写所有字段
4. WHEN ISBN_Fetcher 自动填充字段后, THE Book_Form SHALL 允许管理员修改任何已填充的字段

### 需求 4：书籍创建与编辑

**用户故事：** 作为网站所有者，我希望通过分步表单添加和编辑书籍的完整信息，以确保数据录入的准确性和完整性。

#### 验收标准

1. THE Book_Form SHALL 将书籍信息分为五个步骤展示：基础信息、Spice 信息、标签和分类、编辑内容、关联数据
2. WHEN 管理员在基础信息步骤填写书名, THE Slug_Generator SHALL 自动生成 slug 值，将书名转为小写、移除特殊字符、用连字符替换空格
3. WHEN 管理员输入 ASIN, THE ASIN_URL_Builder SHALL 自动拼接完整的 Amazon URL，格式为 `https://www.amazon.com/dp/{ASIN}?tag=chessanalys05-20`
4. WHEN 管理员在 Spice 信息步骤设置 spice_level, THE Book_Form SHALL 提供 0-5 的滑块控件
5. WHEN 管理员在标签和分类步骤选择 tropes, THE Book_Form SHALL 以多选 checkbox 形式展示所有已有的 tropes
6. WHEN 管理员在标签和分类步骤输入 subgenres、content_warnings 或 moods, THE Tag_Input SHALL 支持逐个添加和删除标签
7. WHEN 管理员在编辑内容步骤输入 perfect_for 或 skip_if, THE Book_Form SHALL 提供可动态添加和删除条目的列表控件
8. WHEN 管理员在关联数据步骤选择 similar_books, THE Book_Form SHALL 从已有书籍列表中提供选择
9. WHEN 管理员提交完整的书籍表单, THE Admin_API SHALL 将数据写入 books 表和 book_tropes 关联表
10. WHEN 管理员编辑已有书籍并提交, THE Admin_API SHALL 更新 books 表中对应记录并同步更新 book_tropes 关联表
11. WHEN 管理员在编辑页面点击"删除"按钮并确认, THE Admin_API SHALL 从 books 表中删除该书籍记录（级联删除关联的 book_tropes 和 reviews）

### 需求 5：Slug 生成

**用户故事：** 作为网站所有者，我希望 slug 从书名自动生成，以确保 URL 的一致性和可读性。

#### 验收标准

1. WHEN Slug_Generator 接收一个书名, THE Slug_Generator SHALL 将书名转为小写
2. WHEN Slug_Generator 处理书名, THE Slug_Generator SHALL 移除撇号和单引号字符
3. WHEN Slug_Generator 处理书名, THE Slug_Generator SHALL 将非字母数字字符替换为连字符
4. WHEN Slug_Generator 处理书名, THE Slug_Generator SHALL 移除首尾的连字符
5. WHEN 管理员手动修改 slug 字段, THE Book_Form SHALL 使用管理员输入的值而非自动生成的值

### 需求 6：Trope 管理

**用户故事：** 作为网站所有者，我希望管理 tropes 分类数据，以便在添加书籍时选择合适的 tropes。

#### 验收标准

1. WHEN 管理员访问 `/admin/tropes`, THE Trope_Manager SHALL 展示所有 tropes 的列表，包含名称、slug、emoji 和描述
2. WHEN 管理员添加新 trope, THE Trope_Manager SHALL 将新记录写入 tropes 表
3. WHEN 管理员编辑已有 trope, THE Trope_Manager SHALL 更新 tropes 表中对应记录
4. WHEN 管理员删除一个 trope, THE Trope_Manager SHALL 从 tropes 表中删除该记录（级联删除 book_tropes 中的关联）

### 需求 7：评论管理

**用户故事：** 作为网站所有者，我希望管理用户评论数据，以维护评论内容的质量。

#### 验收标准

1. WHEN 管理员访问 `/admin/reviews`, THE Review_Manager SHALL 展示所有评论的列表，包含用户名、关联书籍、spice_rating、评论文本和日期
2. WHEN 管理员为某本书添加评论, THE Review_Manager SHALL 将新记录写入 reviews 表，包含 book_slug、username、spice_rating、text、date 和 source 字段
3. WHEN 管理员删除一条评论, THE Review_Manager SHALL 从 reviews 表中删除该记录

### 需求 8：ASIN URL 构建

**用户故事：** 作为网站所有者，我希望只输入 ASIN 就能自动生成完整的 Amazon Associates 链接，以简化操作并确保 affiliate tag 的一致性。

#### 验收标准

1. WHEN ASIN_URL_Builder 接收一个 ASIN 字符串, THE ASIN_URL_Builder SHALL 生成格式为 `https://www.amazon.com/dp/{ASIN}?tag=chessanalys05-20` 的完整 URL
2. WHEN ASIN 字段为空, THE ASIN_URL_Builder SHALL 返回空字符串
3. THE ASIN_URL_Builder SHALL 始终使用 `chessanalys05-20` 作为 Amazon Associates Store ID

### 需求 9：API 路由认证保护

**用户故事：** 作为网站所有者，我希望所有后台 API 路由受到认证保护，以防止未授权的数据修改。

#### 验收标准

1. WHEN 未携带有效认证 cookie 的请求访问 Admin_API, THE Admin_API SHALL 返回 HTTP 401 状态码
2. WHILE 请求携带有效的认证 cookie, THE Admin_API SHALL 正常处理请求并返回相应数据

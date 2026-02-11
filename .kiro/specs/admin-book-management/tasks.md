# Implementation Plan: Admin Book Management

## Overview

基于已批准的需求和设计文档，将后台管理系统的实现分解为增量式的编码任务。每个任务构建在前一个任务之上，从工具函数和认证开始，逐步构建 API 路由和前端页面。使用 TypeScript + Next.js App Router + Cloudflare D1。

## Tasks

- [x] 1. 创建工具函数和类型定义
  - [x] 1.1 创建 `src/lib/utils.ts`，实现 `slugify(title: string): string` 和 `buildAmazonUrl(asin: string): string` 函数
    - `slugify`: 转小写、移除撇号/单引号、非字母数字替换为连字符、去除首尾连字符、合并连续连字符
    - `buildAmazonUrl`: 空 ASIN 返回空字符串，非空拼接 `https://www.amazon.com/dp/{ASIN}?tag=chessanalys05-20`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 8.1, 8.2, 8.3_
  - [ ]* 1.2 为 `slugify` 编写属性测试
    - **Property 1: Slug 生成正确性**
    - 使用 `fast-check` 生成随机字符串，验证输出全小写、仅含 `[a-z0-9-]`、无首尾连字符
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.4**
  - [ ]* 1.3 为 `buildAmazonUrl` 编写属性测试
    - **Property 2: ASIN URL 构建正确性**
    - 使用 `fast-check` 生成随机非空字符串，验证输出包含 ASIN 和正确的 tag
    - **Validates: Requirements 8.1, 8.2, 8.3**
  - [x] 1.4 创建 `src/lib/admin-types.ts`，定义 `BookFormData`、`BookListResponse`、`IsbnLookupResponse`、`TropeFormData`、`ReviewFormData` 类型
    - _Requirements: 4.1, 4.9_

- [x] 2. 实现认证模块
  - [x] 2.1 创建 `src/lib/admin-auth.ts`，实现 `createAdminToken(password: string): string` 和 `verifyAdminToken(token: string, password: string): boolean` 函数
    - Token 格式: `{timestamp}.{hmac_signature}`，使用 Web Crypto API 的 HMAC-SHA256
    - 验证时检查签名有效性和 7 天过期时间
    - _Requirements: 1.2, 1.6_
  - [x] 2.2 创建 `src/middleware.ts`，拦截 `/admin`（排除 `/admin` 登录页本身）和 `/api/admin`（排除 `/api/admin/auth`）路由
    - 从 cookie 中读取 `admin_token`，调用 `verifyAdminToken` 校验
    - 无效时：页面请求重定向到 `/admin`，API 请求返回 401
    - _Requirements: 1.1, 1.4, 9.1, 9.2_
  - [x] 2.3 创建 `/api/admin/auth/route.ts`
    - POST: 接收 `{ password }` body，与环境变量 `ADMIN_PASSWORD` 比较，正确则设置 `admin_token` cookie 并返回 200，错误返回 401
    - DELETE: 清除 `admin_token` cookie 并返回 200
    - _Requirements: 1.2, 1.3, 1.5, 1.6_
  - [ ]* 2.4 为认证模块编写单元测试
    - 测试 `createAdminToken` 和 `verifyAdminToken` 的正确性
    - 测试过期 token 被拒绝
    - 测试错误密码生成的 token 被拒绝
    - _Requirements: 1.2, 1.3, 1.6_

- [x] 3. 实现书籍 CRUD API
  - [x] 3.1 创建 `src/lib/admin-db.ts`，实现书籍的数据库操作函数
    - `getBooksPaginated(db, page, limit, search?)`: 分页查询，支持按 title/author 搜索
    - `getBookBySlugAdmin(db, slug)`: 获取单本书完整数据（含 tropes）
    - `createBook(db, data)`: 插入 books 表 + batch 插入 book_tropes
    - `updateBook(db, slug, data)`: 更新 books 表 + 重建 book_tropes
    - `deleteBook(db, slug)`: 删除书籍（CASCADE 处理关联数据）
    - _Requirements: 2.1, 2.2, 4.9, 4.10, 4.11_
  - [x] 3.2 创建 `/api/admin/books/route.ts`（GET 列表 + POST 创建）
    - GET: 解析 `search`、`page`、`limit` 查询参数，调用 `getBooksPaginated`
    - POST: 解析 body，调用 `slugify` 生成 slug（如未提供），调用 `buildAmazonUrl` 转换 ASIN，调用 `createBook`
    - _Requirements: 2.1, 2.2, 4.9_
  - [x] 3.3 创建 `/api/admin/books/[slug]/route.ts`（GET 详情 + PUT 更新 + DELETE 删除）
    - GET: 调用 `getBookBySlugAdmin`
    - PUT: 解析 body，调用 `updateBook`
    - DELETE: 调用 `deleteBook`
    - _Requirements: 4.9, 4.10, 4.11_
  - [x] 3.4 创建 `/api/admin/isbn-lookup/route.ts`
    - GET: 接收 `?isbn=` 参数，调用 Google Books API，解析并返回 `IsbnLookupResponse`
    - 处理 API 失败和无结果的情况
    - _Requirements: 3.1, 3.2, 3.3_

- [x] 4. Checkpoint - 确保 API 层正常工作
  - 确保所有测试通过，如有问题请询问用户。

- [x] 5. 实现 Trope 和评论 CRUD API
  - [x] 5.1 在 `src/lib/admin-db.ts` 中添加 trope 操作函数
    - `getAllTropesAdmin(db)`: 获取所有 tropes
    - `createTrope(db, data)`: 插入 tropes 表
    - `updateTrope(db, slug, data)`: 更新 tropes 表
    - `deleteTrope(db, slug)`: 删除 trope
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  - [x] 5.2 创建 `/api/admin/tropes/route.ts`（GET + POST）和 `/api/admin/tropes/[slug]/route.ts`（PUT + DELETE）
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  - [x] 5.3 在 `src/lib/admin-db.ts` 中添加评论操作函数
    - `getReviewsAdmin(db, bookSlug?)`: 获取评论列表，支持按 book_slug 过滤
    - `createReview(db, data)`: 插入 reviews 表
    - `deleteReview(db, id)`: 删除评论
    - _Requirements: 7.1, 7.2, 7.3_
  - [x] 5.4 创建 `/api/admin/reviews/route.ts`（GET + POST）和 `/api/admin/reviews/[id]/route.ts`（DELETE）
    - _Requirements: 7.1, 7.2, 7.3_

- [x] 6. 实现管理后台前端页面 - 登录和布局
  - [x] 6.1 创建 `src/app/admin/layout.tsx`，后台布局组件
    - 不包含前台的 Header/Footer，使用简洁的后台导航栏
    - 导航项：书籍、Tropes、评论、登出
    - _Requirements: 1.1, 1.5_
  - [x] 6.2 创建 `src/app/admin/page.tsx`，登录页面
    - 密码输入表单，提交到 `/api/admin/auth`
    - 成功后重定向到 `/admin/books`，失败显示错误提示
    - _Requirements: 1.1, 1.2, 1.3_

- [x] 7. 实现书籍列表页面
  - [x] 7.1 创建 `src/app/admin/books/page.tsx`，书籍列表页面
    - 搜索框 + 分页控件 + 书籍表格（封面、书名、作者、spice_level、创建时间）
    - 点击书籍行导航到编辑页，"添加新书"按钮导航到 `/admin/books/new`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 8. 实现书籍表单（添加/编辑）
  - [x] 8.1 创建 `src/components/admin/TagInput.tsx` 和 `src/components/admin/ListInput.tsx` 可复用组件
    - TagInput: 输入框 + 标签列表，支持添加/删除
    - ListInput: 可动态添加/删除条目的列表
    - _Requirements: 4.6, 4.7_
  - [x] 8.2 创建 `src/components/admin/BookFormSteps.tsx`，分步表单容器
    - 管理 5 个步骤的导航和 BookFormData 状态
    - 步骤指示器显示当前进度
    - _Requirements: 4.1_
  - [x] 8.3 实现 Step 1 基础信息组件（含 ISBN 自动填充）
    - ISBN 输入 + "获取信息"按钮，调用 `/api/admin/isbn-lookup`
    - 自动填充 title、author、description、page_count、publish_year、cover_url
    - 书名变化时自动生成 slug（可手动覆盖）
    - ASIN 输入框，实时预览生成的 Amazon URL
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 4.2, 4.3, 5.5_
  - [x] 8.4 实现 Step 2-5 组件
    - Step 2: spice_level 滑块、spice_description 文本框、spicy_scene_count、steam_level、pov_style
    - Step 3: tropes 多选 checkbox（从 API 加载）、subgenres/content_warnings/moods 使用 TagInput
    - Step 4: editorial_review 大文本框、perfect_for/skip_if 使用 ListInput
    - Step 5: similar_books 从已有书籍选择、series 信息、narrator
    - _Requirements: 4.4, 4.5, 4.6, 4.7, 4.8_
  - [x] 8.5 创建 `src/app/admin/books/new/page.tsx` 和 `src/app/admin/books/[slug]/edit/page.tsx`
    - new: 空表单，提交 POST 到 `/api/admin/books`
    - edit: 加载已有数据预填表单，提交 PUT 到 `/api/admin/books/[slug]`，包含删除按钮
    - _Requirements: 4.9, 4.10, 4.11_

- [x] 9. 实现 Trope 和评论管理页面
  - [x] 9.1 创建 `src/app/admin/tropes/page.tsx`
    - Trope 列表 + 内联添加/编辑表单 + 删除按钮
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  - [x] 9.2 创建 `src/app/admin/reviews/page.tsx`
    - 评论列表（按书籍过滤）+ 添加评论表单 + 删除按钮
    - _Requirements: 7.1, 7.2, 7.3_

- [x] 10. Final checkpoint - 确保所有功能正常
  - 确保所有测试通过，如有问题请询问用户。

## Notes

- 标记 `*` 的任务为可选测试任务，可跳过以加快 MVP 进度
- 每个任务引用了具体的需求编号以确保可追溯性
- Checkpoint 任务用于阶段性验证
- 属性测试验证通用正确性属性，单元测试验证具体示例和边界情况

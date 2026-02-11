#!/usr/bin/env npx tsx
/**
 * 自动化添加书籍脚本
 *
 * 用法:
 *   npx tsx scripts/add-book.ts
 *
 * 功能:
 *   1. 输入书名或 ISBN，自动从 Google Books API 拉取基础信息
 *   2. 交互式补充 spice 相关内容
 *   3. 生成 SQL 并可选择直接执行到本地或远程 D1
 *
 * 也可以直接传入 JSON 文件批量添加:
 *   npx tsx scripts/add-book.ts --file books-to-add.json
 */

import { createInterface } from "readline";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { execSync } from "child_process";

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q: string): Promise<string> =>
  new Promise((r) => rl.question(q, (a) => r(a.trim())));

function esc(s: string | undefined | null): string {
  if (s == null) return "NULL";
  return `'${s.replace(/'/g, "''")}'`;
}

function jsonStr(arr: string[]): string {
  return esc(JSON.stringify(arr));
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface GoogleBooksVolume {
  totalItems: number;
  items?: Array<{
    volumeInfo: {
      title: string;
      authors?: string[];
      description?: string;
      pageCount?: number;
      publishedDate?: string;
      imageLinks?: { thumbnail?: string; smallThumbnail?: string };
      industryIdentifiers?: Array<{ type: string; identifier: string }>;
    };
  }>;
}

async function fetchBookInfo(query: string): Promise<{
  title: string;
  author: string;
  description: string;
  pageCount: number;
  publishYear: number;
  isbn: string;
  coverUrl: string;
} | null> {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=1`;
    const res = await fetch(url);
    const data = (await res.json()) as GoogleBooksVolume;

    if (!data.items || data.items.length === 0) return null;

    const vol = data.items[0].volumeInfo;
    const isbn13 = vol.industryIdentifiers?.find((i) => i.type === "ISBN_13")?.identifier;
    const isbn10 = vol.industryIdentifiers?.find((i) => i.type === "ISBN_10")?.identifier;

    // Build a higher-res cover URL from Google Books
    const coverId = data.items[0] as unknown as { id: string };
    const coverUrl = vol.imageLinks?.thumbnail
      ? vol.imageLinks.thumbnail.replace("zoom=1", "zoom=1")
      : `https://books.google.com/books/content?id=${(coverId as { id: string }).id || ""}&printsec=frontcover&img=1&zoom=1&source=gbs_api`;

    return {
      title: vol.title || "",
      author: vol.authors?.[0] || "",
      description: vol.description || "",
      pageCount: vol.pageCount || 0,
      publishYear: vol.publishedDate ? parseInt(vol.publishedDate.substring(0, 4)) : 0,
      isbn: isbn13 || isbn10 || "",
      coverUrl,
    };
  } catch (e) {
    console.error("Google Books API 请求失败:", e);
    return null;
  }
}

async function askList(prompt: string): Promise<string[]> {
  const input = await ask(prompt + " (逗号分隔): ");
  if (!input) return [];
  return input.split(",").map((s) => s.trim()).filter(Boolean);
}

interface BookData {
  slug: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  spiceLevel: number;
  pageCount: number;
  publishYear: number;
  isbn: string;
  amazonUrl: string;
  spiceDescription: string;
  editorialReview: string;
  spicySceneCount: number | null;
  povStyle: string;
  steamLevel: string;
  narrator: string | null;
  seriesName: string | null;
  seriesNumber: number | null;
  seriesTotalBooks: number | null;
  subgenres: string[];
  contentWarnings: string[];
  similarBooks: string[];
  perfectFor: string[];
  skipIf: string[];
  moods: string[];
  tropes: string[];
}

function generateSQL(book: BookData): string {
  const lines: string[] = [];

  lines.push(`-- ${book.title} by ${book.author}`);
  lines.push(
    `INSERT OR REPLACE INTO books (slug, title, author, description, cover_url, spice_level, page_count, publish_year, isbn, amazon_url, spice_description, editorial_review, spicy_scene_count, pov_style, steam_level, narrator, series_name, series_number, series_total_books, subgenres, content_warnings, similar_books, perfect_for, skip_if, moods) VALUES (${esc(book.slug)}, ${esc(book.title)}, ${esc(book.author)}, ${esc(book.description)}, ${esc(book.coverUrl)}, ${book.spiceLevel}, ${book.pageCount}, ${book.publishYear}, ${esc(book.isbn)}, ${esc(book.amazonUrl)}, ${esc(book.spiceDescription)}, ${esc(book.editorialReview)}, ${book.spicySceneCount ?? "NULL"}, ${esc(book.povStyle)}, ${esc(book.steamLevel)}, ${book.narrator ? esc(book.narrator) : "NULL"}, ${book.seriesName ? esc(book.seriesName) : "NULL"}, ${book.seriesNumber ?? "NULL"}, ${book.seriesTotalBooks ?? "NULL"}, ${jsonStr(book.subgenres)}, ${jsonStr(book.contentWarnings)}, ${jsonStr(book.similarBooks)}, ${jsonStr(book.perfectFor)}, ${jsonStr(book.skipIf)}, ${jsonStr(book.moods)});`
  );

  for (const trope of book.tropes) {
    lines.push(
      `INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES (${esc(book.slug)}, ${esc(trope)});`
    );
  }

  return lines.join("\n");
}

async function interactiveAdd(): Promise<void> {
  console.log("\n📚 SpicyBooks 添加书籍工具\n");

  const searchQuery = await ask("输入书名或 ISBN 搜索: ");
  if (!searchQuery) {
    console.log("未输入内容，退出。");
    rl.close();
    return;
  }

  console.log("🔍 正在从 Google Books 搜索...");
  const info = await fetchBookInfo(searchQuery);

  let book: Partial<BookData> = {};

  if (info) {
    console.log(`\n✅ 找到: ${info.title} by ${info.author}`);
    console.log(`   页数: ${info.pageCount} | 年份: ${info.publishYear} | ISBN: ${info.isbn}\n`);

    book = {
      title: info.title,
      author: info.author,
      description: info.description,
      pageCount: info.pageCount,
      publishYear: info.publishYear,
      isbn: info.isbn,
      coverUrl: info.coverUrl,
      slug: slugify(info.title),
    };

    const useInfo = await ask("使用以上信息？(Y/n): ");
    if (useInfo.toLowerCase() === "n") {
      book.title = (await ask(`书名 [${book.title}]: `)) || book.title;
      book.author = (await ask(`作者 [${book.author}]: `)) || book.author;
    }
  } else {
    console.log("❌ 未找到，请手动输入基础信息：\n");
    book.title = await ask("书名: ");
    book.author = await ask("作者: ");
    book.description = await ask("简介: ");
    book.pageCount = parseInt(await ask("页数: ")) || 0;
    book.publishYear = parseInt(await ask("出版年份: ")) || 0;
    book.isbn = await ask("ISBN: ");
    book.coverUrl = await ask("封面 URL (留空使用 Open Library): ");
    book.slug = slugify(book.title!);
  }

  if (!book.coverUrl && book.isbn) {
    book.coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;
  }

  // Amazon URL
  const asin = await ask("Amazon ASIN (留空跳过): ");
  book.amazonUrl = asin
    ? `https://www.amazon.com/dp/${asin}?tag=chessanalys05-20`
    : "";

  // Spice info
  console.log("\n🌶️ Spice 信息：");
  book.spiceLevel = parseInt(await ask("Spice Level (0-5): ")) || 0;
  book.spiceDescription = await ask("Spice 描述: ");
  book.spicySceneCount = parseInt(await ask("Spicy 场景数量 (留空跳过): ")) || null;
  book.steamLevel = await ask("Steam Level (如 Moderate, Explicit): ");
  book.povStyle = await ask("POV 风格 (如 First person, Dual POV): ");

  // Editorial
  book.editorialReview = await ask("编辑评论: ");

  // Series
  const isSeries = await ask("是否属于系列？(y/N): ");
  if (isSeries.toLowerCase() === "y") {
    book.seriesName = await ask("系列名: ");
    book.seriesNumber = parseInt(await ask("第几本: ")) || null;
    book.seriesTotalBooks = parseInt(await ask("系列总共几本: ")) || null;
  }

  // Narrator
  book.narrator = (await ask("有声书朗读者 (留空跳过): ")) || null;

  // Lists
  book.tropes = await askList("Trope slugs");
  book.subgenres = await askList("子类型");
  book.contentWarnings = await askList("内容预警");
  book.similarBooks = await askList("相似书籍 slugs");
  book.perfectFor = await askList("适合人群");
  book.skipIf = await askList("不适合人群");
  book.moods = await askList("氛围标签");

  const sql = generateSQL(book as BookData);

  console.log("\n📝 生成的 SQL:\n");
  console.log(sql);

  // Save to file
  const filename = `scripts/add-${book.slug}.sql`;
  writeFileSync(filename, sql + "\n");
  console.log(`\n💾 已保存到 ${filename}`);

  // Execute
  const execute = await ask("\n执行到哪里？(local/remote/skip): ");
  if (execute === "local") {
    try {
      execSync(`npx wrangler d1 execute spicybooks-db --local --file=${filename}`, { stdio: "inherit" });
      console.log("✅ 已执行到本地数据库");
    } catch (e) {
      console.error("❌ 执行失败:", e);
    }
  } else if (execute === "remote") {
    try {
      execSync(`npx wrangler d1 execute spicybooks-db --remote --file=${filename}`, { stdio: "inherit" });
      console.log("✅ 已执行到远程数据库");
    } catch (e) {
      console.error("❌ 执行失败:", e);
    }
  }

  rl.close();
}

// Batch mode: npx tsx scripts/add-book.ts --file books.json
const args = process.argv.slice(2);
if (args[0] === "--file" && args[1]) {
  const filePath = args[1];
  if (!existsSync(filePath)) {
    console.error(`文件不存在: ${filePath}`);
    process.exit(1);
  }
  const books: BookData[] = JSON.parse(readFileSync(filePath, "utf-8"));
  const allSql = books.map((b) => {
    b.slug = b.slug || slugify(b.title);
    return generateSQL(b);
  });
  const output = allSql.join("\n\n");
  const outFile = filePath.replace(".json", ".sql");
  writeFileSync(outFile, output + "\n");
  console.log(`✅ 已生成 ${books.length} 本书的 SQL → ${outFile}`);
  console.log(`\n执行命令:`);
  console.log(`  本地: npx wrangler d1 execute spicybooks-db --local --file=${outFile}`);
  console.log(`  远程: npx wrangler d1 execute spicybooks-db --remote --file=${outFile}`);
} else {
  interactiveAdd();
}

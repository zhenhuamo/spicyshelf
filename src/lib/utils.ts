/**
 * 从书名生成 URL 友好的 slug
 * - 转小写
 * - 移除撇号和单引号
 * - 非字母数字字符替换为连字符
 * - 合并连续连字符
 * - 去除首尾连字符
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[''ʼ`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * 从 ASIN 构建 Amazon Associates URL
 * Store ID: chessanalys05-20
 */
export function buildAmazonUrl(asin: string): string {
  if (!asin || !asin.trim()) return "";
  return `https://www.amazon.com/dp/${asin.trim()}?tag=chessanalys05-20`;
}

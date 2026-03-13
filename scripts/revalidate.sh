#!/bin/bash
# 手动触发全站缓存刷新
# 用法: ./scripts/revalidate.sh
# 或刷新特定页面: ./scripts/revalidate.sh /spice

SITE_URL="https://spicybooks.org"
SECRET="${REVALIDATE_SECRET:-your-secret-key-here}"
PATH_TO_REVALIDATE="${1:-/all}"

echo "🔄 Revalidating: $PATH_TO_REVALIDATE"
curl -s -X POST "$SITE_URL/api/revalidate" \
  -H "Content-Type: application/json" \
  -d "{\"secret\": \"$SECRET\", \"path\": \"$PATH_TO_REVALIDATE\"}"
echo ""
echo "✅ Done"

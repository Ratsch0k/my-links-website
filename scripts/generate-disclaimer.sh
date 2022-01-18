#!/bin/sh

echo "Generate licenses disclaimer with yarn"

LICENSES=$(yarn licenses generate-disclaimer)

CLEANED_LICENSES=$(echo "$LICENSES" | awk '{gsub("`","\`"); print}')

FILE_CONTENT="export default \`$CLEANED_LICENSES\`"

echo "Store in $1"

echo "$FILE_CONTENT" > "$1"

echo "Amend to last commit"

git commit --amend --noedit "$1"
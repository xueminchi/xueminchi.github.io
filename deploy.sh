#!/bin/bash

echo "🔨 Building project..."
pnpm build

echo "📦 Copying files..."
cp -r dist/public/* .
cp dist/public/.nojekyll .

echo "📝 Committing changes..."
git add .
git commit -m "Update website content"

echo "🚀 Pushing to GitHub..."
git push origin master

echo "✅ Deployment complete! Visit https://xueminchi.github.io"
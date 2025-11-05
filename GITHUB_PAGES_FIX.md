# GitHub Pages SPA路由修复说明

## 问题描述

当你在GitHub Pages上部署单页应用（SPA）时，直接访问子路由（如 `/blog/1`）会出现404错误。这是因为GitHub Pages会尝试寻找实际的文件夹 `blog/1/index.html`，但我们的应用是客户端路由，所有路由都应该由 `index.html` 处理。

## 解决方案

我已经为你的网站添加了SPA路由修复，包含两个关键文件：

### 1. `404.html`

这个文件会在用户访问不存在的路由时被GitHub Pages加载。它会将URL转换为查询参数，然后重定向到 `index.html`。

**位置：** `client/public/404.html`

### 2. `index.html` 中的重定向脚本

在 `index.html` 的 `<head>` 部分添加了一个脚本，用于将查询参数转换回正确的URL，并使用 `window.history.replaceState()` 更新浏览器历史记录。

**位置：** `client/index.html`（第20-43行）

## 工作原理

1. 用户访问 `https://xueminchi.github.io/blog/1`
2. GitHub Pages找不到该路径，返回 `404.html`
3. `404.html` 中的脚本将URL转换为 `https://xueminchi.github.io/?/blog/1`
4. 浏览器加载 `index.html`
5. `index.html` 中的脚本将URL恢复为 `https://xueminchi.github.io/blog/1`
6. React应用正常路由到Blog详情页面

## 验证修复

修复已经部署到你的网站。等待几分钟后，你可以：

1. 访问 https://xueminchi.github.io/blog
2. 点击任意一篇博客文章
3. 应该能够正常显示博客详情页面，而不是404错误

## 注意事项

- 这个修复已经集成到项目中，以后每次构建都会自动包含
- `404.html` 和 `index.html` 都会在 `pnpm build` 时自动生成
- 不需要手动修改这些文件

## 参考

这个解决方案基于 [spa-github-pages](https://github.com/rafgraph/spa-github-pages) 项目。

---

**修复时间：** 2025-11-05  
**状态：** ✅ 已部署

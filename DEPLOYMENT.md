# GitHub Pages 部署指南

## 前置要求

- GitHub 账户
- Git 已安装
- Node.js 和 pnpm 已安装

## 部署步骤

### 1. 创建 GitHub 仓库

1. 访问 [GitHub](https://github.com/new)
2. 创建一个新仓库，名称为 `<your-username>.github.io`
   - 例如：如果你的 GitHub 用户名是 `xueminchi`，仓库名应该是 `xueminchi.github.io`
3. 选择 "Public" 仓库
4. 不要初始化 README、.gitignore 或 license

### 2. 初始化本地 Git 仓库

在项目根目录运行：

```bash
git init
git add .
git commit -m "Initial commit: Personal website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```

将 `<your-username>` 替换为你的 GitHub 用户名。

### 3. 启用 GitHub Pages

1. 访问你的仓库设置：`https://github.com/<your-username>/<your-username>.github.io/settings/pages`
2. 在 "Build and deployment" 部分，选择：
   - **Source**: "GitHub Actions"
3. 工作流会自动运行并部署你的网站

### 4. 访问你的网站

部署完成后（通常需要 1-2 分钟），访问：
```
https://<your-username>.github.io
```

## 使用自定义域名（可选）

如果你有自己的域名，可以配置自定义域名：

1. 在项目根目录创建 `CNAME` 文件，内容为你的域名（例如 `yourname.com`）
2. 在 GitHub 仓库设置中配置自定义域名
3. 按照 DNS 提供商的说明配置 DNS 记录

## 更新网站

每次你推送更改到 `main` 分支时，GitHub Actions 会自动构建并部署你的网站：

```bash
git add .
git commit -m "Update: Add new research paper"
git push
```

## 自定义内容

### 替换头像

1. 将你的头像图片放在 `client/public/` 目录下
2. 在 `client/src/pages/Home.tsx` 中更新头像引用

### 更新 Research 列表

编辑 `client/src/pages/Research.tsx` 中的 `researchItems` 数组，添加你的研究成果：

```typescript
const researchItems = [
  {
    id: 1,
    title: "Your Paper Title",
    conference: "Conference/Journal Name",
    date: "2024",
    description: "Brief description",
    link: "https://link-to-paper.com",
    color: "cyan"
  },
  // ... 更多论文
];
```

### 更新 Blog 列表

编辑 `client/src/pages/Blog.tsx` 中的 `blogPosts` 数组，添加你的博客文章：

```typescript
const blogPosts = [
  {
    id: 1,
    title: "Blog Post Title",
    date: "2024-11-05",
    excerpt: "Brief excerpt of your blog post",
    link: "#",
  },
  // ... 更多文章
];
```

### 更新个人信息

编辑 `client/src/pages/Home.tsx` 中的个人信息部分，更新你的名字、身份和介绍。

编辑 `client/src/components/Navigation.tsx` 和 `client/src/components/Footer.tsx` 中的联系方式。

## 故障排除

### 网站没有更新

- 检查 GitHub Actions 工作流是否成功运行
- 访问仓库的 "Actions" 标签查看构建日志
- 清除浏览器缓存后重新访问

### 构建失败

- 检查 `pnpm-lock.yaml` 是否已提交
- 确保所有依赖都已正确安装
- 查看 GitHub Actions 日志中的错误信息

## 本地开发

在部署前，你可以在本地测试网站：

```bash
pnpm install
pnpm run dev
```

然后访问 `http://localhost:3000` 查看你的网站。

## 更多帮助

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [GitHub Actions 官方文档](https://docs.github.com/en/actions)

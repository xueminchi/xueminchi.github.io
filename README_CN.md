# 个人网站使用指南

欢迎使用你的个人网站！这个指南将帮助你快速修改网站内容并部署更新。

## 📁 项目结构

```
xueminchi.github.io/
├── client/
│   ├── public/              # 静态资源文件夹
│   │   └── (放置头像图片)
│   └── src/
│       ├── pages/           # 页面文件
│       │   ├── Home.tsx     # 首页（个人介绍、联系方式）
│       │   ├── Research.tsx # Research页面
│       │   ├── Blog.tsx     # Blog列表页面
│       │   └── BlogPost.tsx # Blog文章详情页面
│       └── components/      # 组件文件
│           ├── Navigation.tsx  # 导航栏
│           └── Footer.tsx      # 页脚
├── dist/                    # 构建输出文件夹
│   └── public/             # 构建后的网站文件
└── README_CN.md            # 本文档
```

---

## 🎨 如何修改网站内容

### 1. 修改头像

**步骤：**
1. 将你的头像图片（推荐格式：jpg、png、webp）放入 `client/public/` 文件夹
2. 建议命名为 `avatar.jpg` 或 `avatar.png`
3. 打开 `client/src/pages/Home.tsx` 文件
4. 找到第 **13-21** 行左右的头像部分：

```tsx
{/* Avatar Placeholder */}
<div style={{ 
  width: '160px', 
  height: '160px', 
  backgroundColor: 'rgb(200 200 200)', 
  borderRadius: '2px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgb(100 100 100)',
  fontSize: '12px'
}}>
  Avatar
</div>
```

5. 替换为：

```tsx
{/* Avatar */}
<img 
  src="/avatar.jpg" 
  alt="Xuemin Chi" 
  style={{ 
    width: '160px', 
    height: '160px', 
    borderRadius: '2px',
    objectFit: 'cover'
  }} 
/>
```

---

### 2. 修改个人信息和联系方式

**文件位置：** `client/src/pages/Home.tsx`

**修改内容：**

#### 姓名和职位（第 25-26 行）
```tsx
<h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '8px' }}>
  Xuemin Chi  {/* 修改你的名字 */}
</h1>
<p style={{ fontSize: '14px', color: 'rgb(100 100 100)', marginBottom: '16px' }}>
  PhD Candidate  {/* 修改你的职位 */}
</p>
```

#### 个人简介（第 29-31 行）
```tsx
<p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '24px', maxWidth: '500px' }}>
  Work on robotics manipulation planning, generative model.  {/* 修改你的简介 */}
</p>
```

#### Email链接（第 36-38 行）
```tsx
<a 
  href="mailto:xueminchisnow@gmail.com"  {/* 修改为你的邮箱 */}
  style={{ ... }}
>
  Email
</a>
```

#### GitHub链接（第 50-52 行）
```tsx
<a 
  href="https://github.com/xueminchi"  {/* 修改为你的GitHub链接 */}
  style={{ ... }}
>
  GitHub
</a>
```

#### LinkedIn链接（第 64-66 行）
```tsx
<a 
  href="https://www.linkedin.com/in/xueminchi"  {/* 修改为你的LinkedIn链接 */}
  style={{ ... }}
>
  LinkedIn
</a>
```

#### Google Scholar链接（第 78-80 行）
```tsx
<a 
  href="https://scholar.google.com/citations?user=YOUR_ID"  {/* 修改为你的Google Scholar链接 */}
  style={{ ... }}
>
  Scholar
</a>
```

---

### 3. 修改Research内容

**文件位置：** `client/src/pages/Research.tsx`

**修改研究成果列表（第 1-38 行）：**

```tsx
const researchItems = [
  {
    id: 1,
    title: "你的论文标题",              // 修改论文标题
    conference: "会议或期刊名称",        // 修改会议/期刊
    date: "2024",                       // 修改年份
    description: "论文简介",            // 修改论文描述
    link: "https://arxiv.org/..."       // 修改论文链接
  },
  {
    id: 2,
    title: "另一篇论文标题",
    conference: "Journal Name",
    date: "2024",
    description: "论文简介",
    link: "#"
  },
  // 添加更多论文...
];
```

**添加新论文：**
只需在数组中添加新的对象，格式与上面相同。

---

### 4. 修改Blog内容

#### 修改Blog列表

**文件位置：** `client/src/pages/Blog.tsx`

找到第 **1-38** 行的 `blogPosts` 数组：

```tsx
const blogPosts = [
  {
    id: 1,
    title: "你的博客标题",                    // 修改标题
    date: "2024-11-05",                      // 修改日期
    excerpt: "博客摘要，简短介绍博客内容"      // 修改摘要
  },
  {
    id: 2,
    title: "另一篇博客标题",
    date: "2024-10-28",
    excerpt: "另一篇博客的摘要"
  },
  // 添加更多博客...
];
```

#### 修改Blog文章详情

**文件位置：** `client/src/pages/BlogPost.tsx`

找到 `blogPostsData` 对象（第 3 行开始）：

```tsx
const blogPostsData: Record<string, any> = {
  '1': {
    id: 1,
    title: "你的博客标题",                    // 修改标题
    date: "2024-11-05",                      // 修改日期
    excerpt: "博客摘要",                      // 修改摘要
    paperLink: "https://arxiv.org/...",     // 修改Paper链接（如果有）
    content: `
# 博客标题

Published on November 5, 2024

## Introduction

这里写你的博客内容...

## Main Content

更多内容...

## Conclusion

结论部分...

---

**Author:** Xuemin Chi  
**Date:** November 5, 2024
    `
  },
  '2': {
    // 第二篇博客...
  },
  // 添加更多博客...
};
```

**重要提示：**
- 博客ID（如 `'1'`, `'2'`）必须与Blog列表中的ID一致
- `content` 字段使用Markdown格式编写
- 如果不需要Paper按钮，可以删除 `paperLink` 字段

---

## 🚀 如何部署更新

### 方法一：完整部署流程（推荐）

在VSCode Terminal中按顺序执行以下命令：

```bash
# 1. 确保在项目根目录
cd xueminchi.github.io

# 2. 安装依赖（首次运行需要）
pnpm install

# 3. 构建项目
pnpm build

# 4. 复制构建文件到根目录
cp -r dist/public/* .
cp dist/public/.nojekyll .

# 5. 提交更改
git add .
git commit -m "Update website content"

# 6. 推送到GitHub
git push origin master
```

### 方法二：快速部署脚本

创建一个部署脚本 `deploy.sh`：

```bash
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
```

然后在Terminal中运行：

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🔧 本地预览

在部署之前，你可以先在本地预览网站效果：

```bash
# 启动开发服务器
pnpm dev

# 在浏览器中打开 http://localhost:3000
```

---

## 📝 常见问题

### Q1: 修改后网站没有更新？
**A:** 确保执行了完整的部署流程，特别是 `pnpm build` 和复制文件步骤。

### Q2: 图片显示不出来？
**A:** 
- 确保图片放在 `client/public/` 文件夹中
- 在代码中使用 `/图片名.jpg` 引用（以 `/` 开头）
- 重新运行 `pnpm build`

### Q3: GitHub Pages显示404？
**A:** 
- 检查GitHub仓库的Settings → Pages，确保Source设置为 `master` 分支和 `/` (root)
- 确保根目录有 `index.html` 文件
- 等待几分钟，GitHub Pages需要时间部署

### Q4: 如何添加更多页面？
**A:** 
1. 在 `client/src/pages/` 中创建新的 `.tsx` 文件
2. 在 `client/src/App.tsx` 中添加新的路由
3. 在 `client/src/components/Navigation.tsx` 中添加导航链接

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看GitHub仓库的Issues
2. 参考 `CUSTOMIZATION.md` 文档
3. 检查浏览器控制台的错误信息

---

## 🎉 快速开始

最快速的修改流程：

1. **修改个人信息** → `client/src/pages/Home.tsx`
2. **添加头像** → 放入 `client/public/avatar.jpg`，修改 `Home.tsx`
3. **更新Research** → `client/src/pages/Research.tsx`
4. **写Blog** → `client/src/pages/BlogPost.tsx`
5. **部署** → 运行 `pnpm build` → 复制文件 → `git push`

就这么简单！🚀

---

**网站地址：** https://xueminchi.github.io  
**GitHub仓库：** https://github.com/xueminchi/xueminchi.github.io

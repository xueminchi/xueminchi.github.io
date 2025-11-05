# 网站自定义指南

本文档将指导你如何自定义网站内容，使其展示你的个人信息、研究成果和博客文章。

## 快速开始

### 1. 更新个人信息

编辑 `client/src/pages/Home.tsx`：

```typescript
// 更新你的名字和身份
<h1 className="text-4xl md:text-5xl font-bold mb-4">
  Xuemin Chi  {/* 改为你的名字 */}
</h1>
<h2 className="text-xl md:text-2xl text-gray-500 mb-6">
  PhD Candidate  {/* 改为你的身份 */}
</h2>
<p className="text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
  Work on robotics manipulation planning, generative model.  {/* 改为你的介绍 */}
</p>
```

### 2. 更新联系方式

编辑 `client/src/pages/Home.tsx` 中的联系方式链接：

```typescript
<a 
  href="mailto:xueminchisnow@gmail.com"  {/* 改为你的邮箱 */}
  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
>
  Email
</a>
<a 
  href="https://github.com/your-username"  {/* 改为你的GitHub链接 */}
  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
>
  GitHub
</a>
<a 
  href="https://linkedin.com/in/your-profile"  {/* 改为你的LinkedIn链接 */}
  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
>
  LinkedIn
</a>
```

同时更新 `client/src/components/Footer.tsx` 中的联系方式。

### 3. 添加头像

1. 将你的头像图片保存为 `avatar.jpg` 或 `avatar.png`
2. 放在 `client/public/` 目录下
3. 编辑 `client/src/pages/Home.tsx`，替换头像部分：

```typescript
<div className="w-32 h-32 md:w-40 md:h-40 rounded-lg bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
  <img src="/avatar.jpg" alt="Xuemin Chi" className="w-full h-full object-cover rounded-lg" />
</div>
```

## Research 页面自定义

编辑 `client/src/pages/Research.tsx`，更新 `researchItems` 数组：

```typescript
const researchItems = [
  {
    id: 1,
    title: "Real-Time Action Chunking with Large Models",  // 论文标题
    conference: "Conference Name",  // 会议或期刊名称
    date: "2024",  // 发表年份
    description: "A real-time system for large VLAs that maintains precision and speed in the face of high latency.",  // 简短描述
    link: "https://arxiv.org/abs/...",  // 论文链接
    color: "cyan"  // 颜色：cyan, purple, green, yellow, pink, blue
  },
  {
    id: 2,
    title: "VLAs that Train Fast, Run Fast, and Generalize Better",
    conference: "ICML 2024",
    date: "2024",
    description: "A method to train vision-language-action models that train quickly, maintain internet-scale knowledge, have high quality inference properties, and generalize well.",
    link: "https://arxiv.org/abs/...",
    color: "purple"
  },
  // ... 添加更多论文
];
```

### 颜色选项

- `cyan` - 青色
- `purple` - 紫色
- `green` - 绿色
- `yellow` - 黄色
- `pink` - 粉色
- `blue` - 蓝色

## Blog 页面自定义

编辑 `client/src/pages/Blog.tsx`，更新 `blogPosts` 数组：

```typescript
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Robotics Manipulation",  // 文章标题
    date: "2024-11-05",  // 发表日期（YYYY-MM-DD 格式）
    excerpt: "An introduction to robotics manipulation planning and key concepts you need to know.",  // 文章摘要
    link: "https://your-blog.com/post-1",  // 文章链接
  },
  {
    id: 2,
    title: "Understanding Generative Models",
    date: "2024-10-28",
    excerpt: "Deep dive into how generative models work and their applications in robotics.",
    link: "https://your-blog.com/post-2",
  },
  // ... 添加更多文章
];
```

## 网站导航和页脚

### 更新导航栏

编辑 `client/src/components/Navigation.tsx`：

```typescript
<Link href="/">
  <a className="text-lg font-bold hover:no-underline">
    Xuemin Chi  {/* 改为你的名字 */}
  </a>
</Link>
```

### 更新页脚

编辑 `client/src/components/Footer.tsx`：

```typescript
<p className="text-sm text-gray-500">
  © {currentYear} Xuemin Chi. All rights reserved.  {/* 改为你的名字 */}
</p>
```

## 本地测试

修改内容后，在本地测试网站：

```bash
pnpm run dev
```

然后访问 `http://localhost:3000` 查看你的更改。

## 样式自定义

### 修改全局样式

编辑 `client/src/index.css` 中的 CSS 变量和样式。

### 修改特定页面的样式

每个页面都使用 Tailwind CSS 类名。你可以直接修改 JSX 中的 `className` 属性来改变样式。

例如，改变首页标题的大小：

```typescript
// 原来
<h1 className="text-4xl md:text-5xl font-bold mb-4">

// 改为
<h1 className="text-5xl md:text-6xl font-bold mb-4">
```

## 常见 Tailwind CSS 类名

- `text-*` - 字体大小（如 `text-lg`, `text-2xl`）
- `font-bold` - 加粗
- `mb-*` - 下边距（如 `mb-4`, `mb-6`）
- `px-*` - 水平内边距（如 `px-4`）
- `py-*` - 垂直内边距（如 `py-2`）
- `border` - 边框
- `rounded` - 圆角
- `bg-*` - 背景颜色（如 `bg-gray-100`）
- `text-*` - 文字颜色（如 `text-gray-500`）

更多信息请查看 [Tailwind CSS 文档](https://tailwindcss.com/docs)。

## 部署更改

修改完成后，提交并推送到 GitHub：

```bash
git add .
git commit -m "Update: Customize website content"
git push
```

GitHub Actions 会自动构建并部署你的网站。

## 需要帮助？

- 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 了解部署步骤
- 查看 [README.md](./README.md) 了解项目结构
- 访问 [Tailwind CSS 文档](https://tailwindcss.com/docs) 了解样式

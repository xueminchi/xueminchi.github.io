import { useRoute, Link } from 'wouter';

const blogPostsData: Record<string, any> = {
  '1': {
    id: 1,
    title: "Blog Post Title 1",
    date: "2024-11-05",
    excerpt: "A brief excerpt or summary of your blog post. This gives readers a preview of what to expect.",
    content: `
# Blog Post Title 1

Published on November 5, 2024

## Introduction

This is a sample blog post. You can replace this with your actual content. The blog post is written in markdown format, which makes it easy to format and style your content.

## Main Content

This section contains the main body of your blog post. You can write about your research, technical insights, tutorials, or any topic you're passionate about.

### Subsection

You can organize your content using headings and subheadings to make it more readable.

## Conclusion

This is the conclusion section of your blog post. Summarize your main points and provide any final thoughts or recommendations.

## References

You can add references or links to related resources here.

---

**Author:** Xuemin Chi  
**Date:** November 5, 2024
    `
  },
  '2': {
    id: 2,
    title: "Blog Post Title 2",
    date: "2024-10-28",
    excerpt: "Another interesting blog post about robotics, machine learning, or technical topics.",
    content: `
# Blog Post Title 2

Published on October 28, 2024

## Introduction

This is another sample blog post template. You can use this structure for all your blog posts.

## Main Content

Replace this content with your actual blog post content. You can include:
- Code snippets
- Images
- Lists
- Tables
- And more

## Conclusion

Wrap up your blog post with a conclusion that summarizes the key points.

---

**Author:** Xuemin Chi  
**Date:** October 28, 2024
    `
  },
  '3': {
    id: 3,
    title: "Blog Post Title 3",
    date: "2024-10-15",
    excerpt: "Share your thoughts and experiences on research, development, or any topic you're passionate about.",
    content: `
# Blog Post Title 3

Published on October 15, 2024

## Introduction

This is the third sample blog post.

## Main Content

Add your content here.

## Conclusion

Conclude your thoughts here.

---

**Author:** Xuemin Chi  
**Date:** October 15, 2024
    `
  },
  '4': {
    id: 4,
    title: "Blog Post Title 4",
    date: "2024-09-30",
    excerpt: "Technical tutorial or deep dive into a specific topic related to your research.",
    content: `
# Blog Post Title 4

Published on September 30, 2024

## Introduction

This is the fourth sample blog post.

## Main Content

Add your technical content here.

## Conclusion

Conclude your technical discussion here.

---

**Author:** Xuemin Chi  
**Date:** September 30, 2024
    `
  }
};

export default function BlogPost() {
  const [match, params] = useRoute('/blog/:id');

  if (!match) {
    return null;
  }

  const postId = params?.id;
  const post = blogPostsData[postId];

  if (!post) {
    return (
      <div className="container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '24px' }}>Post not found</h1>
        <Link href="/blog">
          <span style={{ color: 'rgb(59 130 246)', cursor: 'pointer', fontSize: '14px' }}>
            Back to Blog
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '64px', paddingBottom: '64px', maxWidth: '800px' }}>
      {/* Back Link */}
      <Link href="/blog">
        <span style={{ color: 'rgb(59 130 246)', cursor: 'pointer', fontSize: '12px', marginBottom: '32px', display: 'inline-block' }}>
          ← Back to Blog
        </span>
      </Link>

      {/* Post Header */}
      <article>
        <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '12px' }}>
          {post.title}
        </h1>
        <p style={{ fontSize: '12px', color: 'rgb(100 100 100)', marginBottom: '32px' }}>
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        {/* Post Content */}
        <div style={{ fontSize: '14px', lineHeight: '1.8', color: 'rgb(0 0 0)' }}>
          {post.content.split('\n').map((line: string, index: number) => {
            if (line.startsWith('# ')) {
              return (
                <h2 key={index} style={{ fontSize: '24px', fontWeight: '400', marginTop: '24px', marginBottom: '12px' }}>
                  {line.replace('# ', '')}
                </h2>
              );
            } else if (line.startsWith('## ')) {
              return (
                <h3 key={index} style={{ fontSize: '18px', fontWeight: '400', marginTop: '20px', marginBottom: '12px' }}>
                  {line.replace('## ', '')}
                </h3>
              );
            } else if (line.startsWith('### ')) {
              return (
                <h4 key={index} style={{ fontSize: '14px', fontWeight: '400', marginTop: '16px', marginBottom: '8px' }}>
                  {line.replace('### ', '')}
                </h4>
              );
            } else if (line === '---') {
              return <hr key={index} style={{ borderTop: '1px solid rgb(200 200 200)', margin: '24px 0' }} />;
            } else if (line.trim() === '') {
              return <p key={index} style={{ marginBottom: '12px' }}>&nbsp;</p>;
            } else {
              return (
                <p key={index} style={{ marginBottom: '12px' }}>
                  {line}
                </p>
              );
            }
          })}
        </div>
      </article>
    </div>
  );
}

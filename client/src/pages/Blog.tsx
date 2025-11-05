const blogPosts = [
  {
    id: 1,
    title: "Blog Post Title 1",
    date: "2024-11-05",
    excerpt: "A brief excerpt or summary of your blog post. This gives readers a preview of what to expect.",
    link: "#",
  },
  {
    id: 2,
    title: "Blog Post Title 2",
    date: "2024-10-28",
    excerpt: "Another interesting blog post about robotics, machine learning, or technical topics.",
    link: "#",
  },
  {
    id: 3,
    title: "Blog Post Title 3",
    date: "2024-10-15",
    excerpt: "Share your thoughts and experiences on research, development, or any topic you're passionate about.",
    link: "#",
  },
  {
    id: 4,
    title: "Blog Post Title 4",
    date: "2024-09-30",
    excerpt: "Technical tutorial or deep dive into a specific topic related to your research.",
    link: "#",
  },
];

export default function Blog() {
  return (
    <div className="container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '16px' }}>Blog</h1>
        <p style={{ fontSize: '14px', color: 'rgb(100 100 100)', maxWidth: '600px' }}>
          Thoughts, tutorials, and technical articles about robotics, machine learning, and more.
        </p>
      </div>

      {/* Blog Posts List */}
      <div style={{ maxWidth: '800px' }}>
        {blogPosts.map((post) => (
          <article key={post.id} style={{ borderBottom: '1px solid rgb(200 200 200)', paddingBottom: '24px', marginBottom: '24px' }}>
            <a href={post.link} style={{ textDecoration: 'none', color: 'rgb(0 0 0)' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '400', marginBottom: '8px', color: 'rgb(0 0 0)' }}>
                {post.title}
              </h2>
            </a>
            <p style={{ fontSize: '12px', color: 'rgb(100 100 100)', marginBottom: '8px' }}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
              {post.excerpt}
            </p>
            <a href={`/blog/${post.id}`} style={{ display: 'inline-block', marginTop: '8px', fontSize: '12px', color: 'rgb(59 130 246)', textDecoration: 'none' }}>
              Read more →
            </a>
          </article>
        ))}
      </div>

      {/* Placeholder Notice */}
      <div style={{ marginTop: '48px', padding: '24px', backgroundColor: 'rgb(245 245 245)', border: '1px solid rgb(200 200 200)', borderRadius: '2px', maxWidth: '800px' }}>
        <p style={{ fontSize: '12px', color: 'rgb(100 100 100)', margin: 0 }}>
          💡 <strong>Placeholder content:</strong> Replace the blog posts above with your actual articles. You can either link to external blog platforms or create static markdown files for each post.
        </p>
      </div>
    </div>
  );
}

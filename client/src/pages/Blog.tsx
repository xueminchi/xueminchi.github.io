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
    <div className="container py-16 md:py-24">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Thoughts, tutorials, and technical articles about robotics, machine learning, and more.
        </p>
      </div>

      {/* Blog Posts List */}
      <div className="max-w-3xl">
        {blogPosts.map((post) => (
          <article key={post.id} className="blog-post">
            <a href={post.link} className="hover:no-underline">
              <h2 className="text-2xl font-bold mb-2 hover:text-blue-500 transition-colors">
                {post.title}
              </h2>
            </a>
            <p className="blog-date mb-3">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-base leading-relaxed">
              {post.excerpt}
            </p>
            <a href={post.link} className="inline-block mt-4 text-blue-500 hover:underline">
              Read more →
            </a>
          </article>
        ))}
      </div>

      {/* Placeholder Notice */}
      <div className="mt-12 p-6 bg-gray-50 border border-gray-300 rounded max-w-3xl">
        <p className="text-sm text-gray-500">
          💡 <strong>Placeholder content:</strong> Replace the blog posts above with your actual articles. You can either link to external blog platforms or create static markdown files for each post.
        </p>
      </div>
    </div>
  );
}

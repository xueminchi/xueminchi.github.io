const blogPosts = [
  {
    id: "asynchronous-vla-control",
    title: "Asynchronous Control: Inference-Time RTC and VLASH",
    date: "2026-09-05",
    excerpt: "A comparative study of inference-time guidance and latency-aware training for asynchronous robot control, with offline analysis and dual-arm manipulation experiments.",
    link: "/blog/asynchronous-vla-control/",
  },
  {
    id: "vla-wam-benchmark",
    title: "VLA / WAM Benchmark Reference",
    date: "2026-05-24",
    excerpt: "An interactive research map for robot VLA evaluation, real-world benchmarks, simulation proxies, and world action models.",
    link: "/blog/vla-wam-benchmark/",
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
            <a href={post.link} style={{ display: 'inline-block', marginTop: '8px', fontSize: '12px', color: 'rgb(59 130 246)', textDecoration: 'none' }}>
              Read more →
            </a>
          </article>
        ))}
      </div>

      {/* Placeholder Notice */}
      {/* <div style={{ marginTop: '48px', padding: '24px', backgroundColor: 'rgb(245 245 245)', border: '1px solid rgb(200 200 200)', borderRadius: '2px', maxWidth: '800px' }}>
        <p style={{ fontSize: '12px', color: 'rgb(100 100 100)', margin: 0 }}>
          💡 <strong>Placeholder content:</strong> Replace the blog posts above with your actual articles. You can either link to external blog platforms or create static markdown files for each post.
        </p>
      </div> */}
    </div>
  );
}

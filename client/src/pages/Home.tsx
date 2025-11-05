import { Link } from 'wouter';

export default function Home() {
  return (
    <div className="container py-16 md:py-24">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left: Avatar Placeholder */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Avatar</span>
            </div>
          </div>

          {/* Right: Introduction */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Xuemin Chi
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-500 mb-6">
              PhD Candidate
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
              Work on robotics manipulation planning, generative model.
            </p>

            {/* Contact Links */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a 
                href="mailto:xueminchisnow@gmail.com"
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
              >
                Email
              </a>
              <a 
                href="#"
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                title="GitHub link - placeholder"
              >
                GitHub
              </a>
              <a 
                href="#"
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                title="LinkedIn link - placeholder"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="section-divider pt-8">
        <h3 className="text-xl font-bold mb-6">Explore</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/research">
            <a className="p-6 border-2 border-blue-400 bg-blue-50 rounded hover:shadow-md transition-all">
              <h4 className="text-lg font-bold mb-2">Research</h4>
              <p className="text-sm text-gray-500">
                Publications, papers, and research projects
              </p>
            </a>
          </Link>
          <Link href="/blog">
            <a className="p-6 border-2 border-purple-400 bg-purple-50 rounded hover:shadow-md transition-all">
              <h4 className="text-lg font-bold mb-2">Blog</h4>
              <p className="text-sm text-gray-500">
                Thoughts, tutorials, and technical articles
              </p>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}

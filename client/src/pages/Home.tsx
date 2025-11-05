import { Link } from 'wouter';

export default function Home() {
  return (
    <div className="container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
      {/* Hero Section */}
      <section style={{ marginBottom: '64px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '48px', alignItems: 'flex-start' }}>
          {/* Left: Avatar Placeholder */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ width: '160px', height: '160px', borderRadius: '8px', backgroundColor: 'rgb(200 200 200)', border: '2px solid rgb(200 200 200)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'rgb(150 150 150)', fontSize: '12px' }}>Avatar</span>
            </div>
          </div>

          {/* Right: Introduction */}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '16px' }}>
              Xuemin Chi
            </h1>
            <h2 style={{ fontSize: '18px', fontWeight: '400', color: 'rgb(100 100 100)', marginBottom: '24px' }}>
              PhD Candidate
            </h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '24px', maxWidth: '600px' }}>
              Work on robotics manipulation planning, generative model.
            </p>

            {/* Contact Links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
              <a 
                href="mailto:xueminchisnow@gmail.com"
                style={{ padding: '8px 16px', border: '1px solid rgb(0 0 0)', borderRadius: '2px', textDecoration: 'none', color: 'rgb(0 0 0)', fontSize: '12px', transition: 'all 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(0 0 0)';
                  e.currentTarget.style.color = 'rgb(255 255 255)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'rgb(0 0 0)';
                }}
              >
                Email
              </a>
              <a 
                href="#"
                style={{ padding: '8px 16px', border: '1px solid rgb(0 0 0)', borderRadius: '2px', textDecoration: 'none', color: 'rgb(0 0 0)', fontSize: '12px', transition: 'all 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(0 0 0)';
                  e.currentTarget.style.color = 'rgb(255 255 255)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'rgb(0 0 0)';
                }}
              >
                GitHub
              </a>
              <a 
                href="#"
                style={{ padding: '8px 16px', border: '1px solid rgb(0 0 0)', borderRadius: '2px', textDecoration: 'none', color: 'rgb(0 0 0)', fontSize: '12px', transition: 'all 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(0 0 0)';
                  e.currentTarget.style.color = 'rgb(255 255 255)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'rgb(0 0 0)';
                }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section style={{ borderTop: '1px solid rgb(200 200 200)', paddingTop: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '400', marginBottom: '24px' }}>Explore</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <Link href="/research">
            <a style={{ padding: '24px', border: '2px solid rgb(59 130 246)', backgroundColor: 'rgba(59 130 246 / 0.05)', borderRadius: '2px', textDecoration: 'none', color: 'rgb(0 0 0)', transition: 'all 0.2s' }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.boxShadow = 'none';
               }}
            >
              <h4 style={{ fontSize: '16px', fontWeight: '400', marginBottom: '8px' }}>Research</h4>
              <p style={{ fontSize: '12px', color: 'rgb(100 100 100)' }}>
                Publications, papers, and research projects
              </p>
            </a>
          </Link>
          <Link href="/blog">
            <a style={{ padding: '24px', border: '2px solid rgb(168 85 247)', backgroundColor: 'rgba(168 85 247 / 0.05)', borderRadius: '2px', textDecoration: 'none', color: 'rgb(0 0 0)', transition: 'all 0.2s' }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.boxShadow = 'none';
               }}
            >
              <h4 style={{ fontSize: '16px', fontWeight: '400', marginBottom: '8px' }}>Blog</h4>
              <p style={{ fontSize: '12px', color: 'rgb(100 100 100)' }}>
                Thoughts, tutorials, and technical articles
              </p>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}

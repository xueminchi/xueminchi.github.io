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

      {/* Quick Links Section - Text Only */}
      <section style={{ borderTop: '1px solid rgb(200 200 200)', paddingTop: '32px' }}>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          <Link href="/research">
            <span style={{ fontSize: '14px', color: 'rgb(59 130 246)', cursor: 'pointer', textDecoration: 'none' }}>
              Research
            </span>
          </Link>
          <Link href="/blog">
            <span style={{ fontSize: '14px', color: 'rgb(59 130 246)', cursor: 'pointer', textDecoration: 'none' }}>
              Blog
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}

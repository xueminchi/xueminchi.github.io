import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="container" style={{ paddingTop: '96px', paddingBottom: '96px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '48px', fontWeight: '400', marginBottom: '16px' }}>404</h1>
      <p style={{ fontSize: '18px', color: 'rgb(100 100 100)', marginBottom: '32px' }}>Page not found</p>
      <Link href="/">
        <a style={{ padding: '12px 24px', border: '1px solid rgb(0 0 0)', borderRadius: '2px', textDecoration: 'none', color: 'rgb(0 0 0)', fontSize: '12px', transition: 'all 0.2s' }}
           onMouseEnter={(e) => {
             e.currentTarget.style.backgroundColor = 'rgb(0 0 0)';
             e.currentTarget.style.color = 'rgb(255 255 255)';
           }}
           onMouseLeave={(e) => {
             e.currentTarget.style.backgroundColor = 'transparent';
             e.currentTarget.style.color = 'rgb(0 0 0)';
           }}
        >
          Back to Home
        </a>
      </Link>
    </div>
  );
}

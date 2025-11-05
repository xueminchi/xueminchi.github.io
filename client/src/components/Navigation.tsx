import { Link, useLocation } from 'wouter';

const Navigation = () => {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <nav style={{ backgroundColor: 'rgb(245 245 245)', borderBottom: '1px solid rgb(200 200 200)' }} className="sticky top-0 z-50">
      <div className="container flex items-center justify-between" style={{ height: '60px' }}>
        <Link href="/">
          <span style={{ fontSize: '16px', fontWeight: '400', textDecoration: 'none', color: 'rgb(0 0 0)', cursor: 'pointer' }}>
            Xuemin Chi
          </span>
        </Link>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/">
            <span 
              className="nav-link"
              style={isActive('/') ? { 
                backgroundColor: 'rgb(236 72 153)', 
                borderColor: 'rgb(236 72 153)', 
                color: 'white',
                display: 'inline-block',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: '400',
                border: '1px solid rgb(236 72 153)',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              } : {
                display: 'inline-block',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: '400',
                border: '1px solid rgb(0 0 0)',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Home
            </span>
          </Link>
          <Link href="/research">
            <span 
              className="nav-link"
              style={isActive('/research') ? { 
                backgroundColor: 'rgb(59 130 246)', 
                borderColor: 'rgb(59 130 246)', 
                color: 'white',
                display: 'inline-block',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: '400',
                border: '1px solid rgb(59 130 246)',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              } : {
                display: 'inline-block',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: '400',
                border: '1px solid rgb(0 0 0)',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Research
            </span>
          </Link>
          <Link href="/blog">
            <span 
              className="nav-link"
              style={isActive('/blog') ? { 
                backgroundColor: 'rgb(234 88 12)', 
                borderColor: 'rgb(234 88 12)', 
                color: 'white',
                display: 'inline-block',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: '400',
                border: '1px solid rgb(234 88 12)',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              } : {
                display: 'inline-block',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: '400',
                border: '1px solid rgb(0 0 0)',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Blog
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

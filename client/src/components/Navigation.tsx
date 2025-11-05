import { Link, useLocation } from 'wouter';

const Navigation = () => {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <nav style={{ backgroundColor: 'rgb(245 245 245)', borderBottom: '1px solid rgb(200 200 200)' }} className="sticky top-0 z-50">
      <div className="container flex items-center justify-between" style={{ height: '60px' }}>
        <Link href="/">
          <a style={{ fontSize: '16px', fontWeight: '400', textDecoration: 'none', color: 'rgb(0 0 0)' }}>
            Xuemin Chi
          </a>
        </Link>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/">
            <a 
              className="nav-link"
              style={isActive('/') ? { 
                backgroundColor: 'rgb(236 72 153)', 
                borderColor: 'rgb(236 72 153)', 
                color: 'white' 
              } : {}}
            >
              Home
            </a>
          </Link>
          <Link href="/research">
            <a 
              className="nav-link"
              style={isActive('/research') ? { 
                backgroundColor: 'rgb(59 130 246)', 
                borderColor: 'rgb(59 130 246)', 
                color: 'white' 
              } : {}}
            >
              Research
            </a>
          </Link>
          <Link href="/blog">
            <a 
              className="nav-link"
              style={isActive('/blog') ? { 
                backgroundColor: 'rgb(234 88 12)', 
                borderColor: 'rgb(234 88 12)', 
                color: 'white' 
              } : {}}
            >
              Blog
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

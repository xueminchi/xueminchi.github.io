import { Link, useLocation } from 'wouter';

const Navigation = () => {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-300">
      <div className="container flex items-center justify-between h-16">
        <Link href="/">
          <a className="text-lg font-bold hover:no-underline">
            Xuemin Chi
          </a>
        </Link>
        
        <div className="flex gap-6">
          <Link href="/">
            <a className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </a>
          </Link>
          <Link href="/research">
            <a className={`nav-link ${isActive('/research') ? 'active' : ''}`}>
              Research
            </a>
          </Link>
          <Link href="/blog">
            <a className={`nav-link ${isActive('/blog') ? 'active' : ''}`}>
              Blog
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

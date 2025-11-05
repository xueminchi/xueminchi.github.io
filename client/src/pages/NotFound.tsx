import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="container py-24 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-500 mb-8">Page not found</p>
      <Link href="/">
        <a className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-100 transition-colors">
          Back to Home
        </a>
      </Link>
    </div>
  );
}

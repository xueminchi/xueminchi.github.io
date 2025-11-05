export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-300 bg-gray-50">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} Xuemin Chi. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="mailto:xueminchisnow@gmail.com" className="text-blue-500 hover:underline">
              Email
            </a>
            <a href="#" className="text-blue-500 hover:underline">
              GitHub
            </a>
            <a href="#" className="text-blue-500 hover:underline">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


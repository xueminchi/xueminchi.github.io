export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid rgb(200 200 200)', backgroundColor: 'rgb(245 245 245)' }}>
      <div className="container py-8">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <p style={{ fontSize: '12px', color: 'rgb(100 100 100)', margin: 0 }}>
            © {currentYear} Xuemin Chi. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px', fontSize: '12px' }}>
            <a href="mailto:xueminchisnow@gmail.com" style={{ color: 'rgb(59 130 246)', textDecoration: 'none' }}>
              Email
            </a>
            <a href="#" style={{ color: 'rgb(59 130 246)', textDecoration: 'none' }}>
              GitHub
            </a>
            <a href="#" style={{ color: 'rgb(59 130 246)', textDecoration: 'none' }}>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

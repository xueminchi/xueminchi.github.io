const researchItems = [
  {
    id: 1,
    title: "Research Paper Title 1",
    conference: "Conference Name",
    date: "2024",
    description: "Brief description of your research work and findings.",
    link: "#"
  },
  {
    id: 2,
    title: "Research Paper Title 2",
    conference: "Journal Name",
    date: "2024",
    description: "Brief description of your research work and findings.",
    link: "#"
  },
  {
    id: 3,
    title: "Research Paper Title 3",
    conference: "Conference Name",
    date: "2023",
    description: "Brief description of your research work and findings.",
    link: "#"
  },
  {
    id: 4,
    title: "Research Paper Title 4",
    conference: "Journal Name",
    date: "2023",
    description: "Brief description of your research work and findings.",
    link: "#"
  },
];

export default function Research() {
  return (
    <div className="container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '16px' }}>Research</h1>
        <p style={{ fontSize: '14px', color: 'rgb(100 100 100)', maxWidth: '600px' }}>
          Publications and research projects on robotics manipulation planning and generative models.
        </p>
      </div>

      {/* Research List - Simplified */}
      <div>
        {researchItems.map((item, index) => (
          <div key={item.id} style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: index < researchItems.length - 1 ? '1px solid rgb(200 200 200)' : 'none' }}>
            <a 
              href={item.link}
              style={{ 
                textDecoration: 'none',
                color: 'rgb(0 0 0)',
                display: 'block',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgb(59 130 246)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgb(0 0 0)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '400', margin: 0, flex: 1 }}>{item.title}</h3>
                <span style={{ fontSize: '12px', color: 'rgb(100 100 100)', marginLeft: '16px', flexShrink: 0 }}>{item.date}</span>
              </div>
              <p style={{ fontSize: '12px', color: 'rgb(100 100 100)', margin: '4px 0' }}>{item.conference}</p>
              <p style={{ fontSize: '12px', margin: '4px 0', lineHeight: '1.6' }}>{item.description}</p>
            </a>
          </div>
        ))}
      </div>

      {/* Placeholder Notice */}
      <div style={{ marginTop: '48px', padding: '24px', backgroundColor: 'rgb(245 245 245)', border: '1px solid rgb(200 200 200)', borderRadius: '2px' }}>
        <p style={{ fontSize: '12px', color: 'rgb(100 100 100)', margin: 0 }}>
          💡 <strong>Placeholder content:</strong> Replace the research items above with your actual publications. Each item should include the title, conference/journal name, publication date, and a link to the paper.
        </p>
      </div>
    </div>
  );
}

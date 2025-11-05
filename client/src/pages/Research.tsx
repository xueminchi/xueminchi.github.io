const researchItems = [
  {
    id: 1,
    title: "Research Paper Title 1",
    conference: "Conference Name",
    date: "2024",
    description: "Brief description of your research work and findings.",
    link: "#",
    color: "cyan"
  },
  {
    id: 2,
    title: "Research Paper Title 2",
    conference: "Journal Name",
    date: "2024",
    description: "Brief description of your research work and findings.",
    link: "#",
    color: "purple"
  },
  {
    id: 3,
    title: "Research Paper Title 3",
    conference: "Conference Name",
    date: "2023",
    description: "Brief description of your research work and findings.",
    link: "#",
    color: "green"
  },
  {
    id: 4,
    title: "Research Paper Title 4",
    conference: "Journal Name",
    date: "2023",
    description: "Brief description of your research work and findings.",
    link: "#",
    color: "yellow"
  },
];

const colorMap = {
  cyan: { border: 'rgb(34 211 238)', bg: 'rgba(34 211 238 / 0.05)' },
  purple: { border: 'rgb(168 85 247)', bg: 'rgba(168 85 247 / 0.05)' },
  green: { border: 'rgb(34 197 94)', bg: 'rgba(34 197 94 / 0.05)' },
  yellow: { border: 'rgb(250 204 21)', bg: 'rgba(250 204 21 / 0.05)' },
  pink: { border: 'rgb(236 72 153)', bg: 'rgba(236 72 153 / 0.05)' },
  blue: { border: 'rgb(59 130 246)', bg: 'rgba(59 130 246 / 0.05)' },
};

const markerMap = {
  cyan: 'rgb(34 211 238)',
  purple: 'rgb(168 85 247)',
  green: 'rgb(34 197 94)',
  yellow: 'rgb(250 204 21)',
  pink: 'rgb(236 72 153)',
  blue: 'rgb(59 130 246)',
};

export default function Research() {
  return (
    <div className="container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '16px' }}>Research</h1>
        <p style={{ fontSize: '14px', color: 'rgb(100 100 100)', maxWidth: '600px' }}>
          Publications and research projects on robotics manipulation planning and generative models.
        </p>
      </div>

      {/* Research Timeline */}
      <div>
        {researchItems.map((item) => {
          const colors = colorMap[item.color as keyof typeof colorMap];
          const markerColor = markerMap[item.color as keyof typeof markerMap];
          
          return (
            <div key={item.id} style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              {/* Timeline marker */}
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: markerColor, marginTop: '4px', flexShrink: 0 }}></div>
              
              {/* Content */}
              <a 
                href={item.link}
                style={{ 
                  flex: 1,
                  border: `2px solid ${colors.border}`,
                  backgroundColor: colors.bg,
                  padding: '16px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  color: 'rgb(0 0 0)',
                  transition: 'all 0.2s',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '400', margin: 0, flex: 1 }}>{item.title}</h3>
                  <span style={{ fontSize: '12px', color: 'rgb(100 100 100)', marginLeft: '16px', flexShrink: 0 }}>{item.date}</span>
                </div>
                <p style={{ fontSize: '12px', color: 'rgb(100 100 100)', margin: '4px 0' }}>{item.conference}</p>
                <p style={{ fontSize: '12px', margin: '4px 0' }}>{item.description}</p>
              </a>
            </div>
          );
        })}
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

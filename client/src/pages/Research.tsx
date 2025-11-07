// 设置你想要高亮的作者名字（通常是你自己的名字）
const HIGHLIGHT_AUTHOR = "Xuemin Chi";

const researchItems = [
  {
    id: 1,
    title: "Research Paper Title 1",
    authors: ["Xuemin Chi", "Author 2", "Author 3"],  // 添加你的作者列表
    conference: "Conference Name",
    date: "2024",
    description: "Brief description of your research work and findings.",
    link: "#"
  },
  {
    id: 2,
    title: "Research Paper Title 2",
    authors: ["Author 1", "Xuemin Chi", "Author 3", "Author 4"],  // 你的名字可以在任何位置
    conference: "Journal Name",
    date: "2024",
    description: "Brief description of your research work and findings.",
    link: "#"
  },
  {
    id: 3,
    title: "Research Paper Title 3",
    authors: ["Xuemin Chi", "Collaborator"],
    conference: "Conference Name",
    date: "2023",
    description: "Brief description of your research work and findings.",
    link: "#"
  },
  {
    id: 4,
    title: "Research Paper Title 4",
    authors: ["Xuemin Chi"],  // 单独作者
    conference: "Journal Name",
    date: "2023",
    description: "Brief description of your research work and findings.",
    link: "#"
  },
];

// 作者列表渲染组件 - 高亮指定作者
function AuthorList({ authors }: { authors: string[] }) {
  return (
    <span style={{ fontSize: '12px', color: 'rgb(100 100 100)' }}>
      {authors.map((author, index) => (
        <span key={index}>
          {author === HIGHLIGHT_AUTHOR ? (
            <strong style={{ fontWeight: '600', color: 'rgb(0 0 0)' }}>{author}</strong>
          ) : (
            <span>{author}</span>
          )}
          {index < authors.length - 1 && ', '}
        </span>
      ))}
    </span>
  );
}

export default function Research() {
  return (
    <div className="container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '400', marginBottom: '16px' }}>Research</h1>
        <p style={{ fontSize: '14px', color: 'rgb(100 100 100)', maxWidth: '600px' }}>
          Publications and research projects on robotics manipulation planning and generative models.
        </p>
      </div>

      {/* Research List */}
      <div>
        {researchItems.map((item, index) => (
          <div key={item.id} style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: index < researchItems.length - 1 ? '1px solid rgb(200 200 200)' : 'none' }}>
            <a 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
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
              
              {/* Authors */}
              <div style={{ marginBottom: '4px' }}>
                <AuthorList authors={item.authors} />
              </div>
              
              {/* Conference */}
              <p style={{ fontSize: '12px', color: 'rgb(100 100 100)', margin: '4px 0' }}>{item.conference}</p>
              
              {/* Description */}
              <p style={{ fontSize: '12px', margin: '4px 0', lineHeight: '1.6' }}>{item.description}</p>
            </a>
          </div>
        ))}
      </div>

      {/* Placeholder Notice */}
      <div style={{ marginTop: '48px', padding: '24px', backgroundColor: 'rgb(245 245 245)', border: '1px solid rgb(200 200 200)', borderRadius: '2px' }}>
        <p style={{ fontSize: '12px', color: 'rgb(100 100 100)', margin: 0, lineHeight: '1.6' }}>
          💡 <strong>How to customize:</strong><br/>
          1. Edit the <code>authors</code> array for each research item (line 5-40)<br/>
          2. Change <code>HIGHLIGHT_AUTHOR</code> at the top to your name (line 2)<br/>
          3. Your name will be <strong>bold and darker</strong> in the author list
        </p>
      </div>
    </div>
  );
}

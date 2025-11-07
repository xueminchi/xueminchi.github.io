// 设置你想要高亮的作者名字（通常是你自己的名字）
const HIGHLIGHT_AUTHOR = "Xuemin Chi";

const researchItems = [
  {
    id: 1,
    title: "Efficient and Real-Time Manipulation Planning for Robotics Using Projection-Based Optimization",
    authors: ["Xuemin Chi", "Author 2", "Author 3"],  // TODO: 添加真实的作者列表
    conference: "IROS",
    date: "2025",
    description: "Bridge learning and optimization through projections for efficient manipulation planning.",
    link: "https://arxiv.org/pdf/2506.14865"
  },
  {
    id: 2,
    title: "FSDP: Fast and Safe Data-Driven Overtaking Trajectory Planning for Head-to-Head Autonomous Racing Competitions",
    authors: ["Xuemin Chi", "Co-author 1", "Co-author 2"],  // TODO: 添加真实的作者列表
    conference: "IROS",
    date: "2025",
    description: "Learn opponent behavior and plan overtaking trajectories in real-time for autonomous racing.",
    link: "https://arxiv.org/pdf/2503.06075"
  },
  {
    id: 3,
    title: "Dynamic collision avoidance using velocity obstacle-based control barrier functions",
    authors: ["Xuemin Chi", "Collaborator"],  // TODO: 添加真实的作者列表
    conference: "IEEE Transactions on Control Systems Technology",
    date: "2025",
    description: "Dynamic collision avoidance using velocity obstacle-based control barrier functions.",
    link: "https://arxiv.org/pdf/2503.00606"
  },
  {
    id: 4,
    title: "Safe dynamic motion generation in configuration space using differentiable distance fields",
    authors: ["Xuemin Chi"],  // TODO: 添加真实的作者列表
    conference: "arXiv",
    date: "2025",
    description: "Learning-based differentiable distance fields for safe dynamic motion generation in configuration space.",
    link: "https://arxiv.org/pdf/2412.16456"
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
          💡 <strong>How to add authors:</strong><br/>
          1. For each paper, replace the <code>authors</code> array with the real author list<br/>
          2. Your name (set in <code>HIGHLIGHT_AUTHOR</code> at line 2) will be automatically <strong>bold and darker</strong><br/>
          3. Example: <code>authors: ["Xuemin Chi", "John Doe", "Jane Smith"]</code>
        </p>
      </div>
    </div>
  );
}

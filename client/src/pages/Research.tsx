// 设置你想要高亮的作者名字（通常是你自己的名字）
const HIGHLIGHT_AUTHOR = "Xuemin Chi";

const researchItems = [
  {
    id: 1,
    title: "Efficient and Real-Time Manipulation Planning for Robotics Using Projection-Based Optimization",
    authors: ["Xuemin Chi", "Author 2", "Author 3"],  // TODO: 添加真实的作者列表
    conference: "IROS",
    conferenceUrl: "https://iros2025.org/",  // TODO: 添加会议官网链接
    date: "2025",
    description: "Bridge learning and optimization through projections for efficient manipulation planning.",
    pdfUrl: "https://arxiv.org/pdf/2506.14865"  // PDF下载链接
  },
  {
    id: 2,
    title: "FSDP: Fast and Safe Data-Driven Overtaking Trajectory Planning for Head-to-Head Autonomous Racing Competitions",
    authors: ["Xuemin Chi", "Co-author 1", "Co-author 2"],  // TODO: 添加真实的作者列表
    conference: "IROS",
    conferenceUrl: "https://iros2025.org/",  // TODO: 添加会议官网链接
    date: "2025",
    description: "Learn opponent behavior and plan overtaking trajectories in real-time for autonomous racing.",
    pdfUrl: "https://arxiv.org/pdf/2503.06075"
  },
  {
    id: 3,
    title: "Dynamic collision avoidance using velocity obstacle-based control barrier functions",
    authors: ["Xuemin Chi", "Collaborator"],  // TODO: 添加真实的作者列表
    conference: "IEEE Transactions on Control Systems Technology",
    conferenceUrl: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=87",  // TODO: 添加期刊链接
    date: "2025",
    description: "Dynamic collision avoidance using velocity obstacle-based control barrier functions.",
    pdfUrl: "https://arxiv.org/pdf/2503.00606"
  },
  {
    id: 4,
    title: "Safe dynamic motion generation in configuration space using differentiable distance fields",
    authors: ["Xuemin Chi"],  // TODO: 添加真实的作者列表
    conference: "arXiv",
    conferenceUrl: "https://arxiv.org/",  // TODO: 添加arXiv链接
    date: "2025",
    description: "Learning-based differentiable distance fields for safe dynamic motion generation in configuration space.",
    pdfUrl: "https://arxiv.org/pdf/2412.16456"
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
            <p style={{ fontSize: '12px', margin: '8px 0 12px 0', lineHeight: '1.6' }}>{item.description}</p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <a 
                href={item.conferenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  padding: '6px 12px', 
                  border: '1px solid rgb(0 0 0)', 
                  borderRadius: '2px', 
                  textDecoration: 'none', 
                  color: 'rgb(0 0 0)', 
                  fontSize: '11px', 
                  transition: 'all 0.2s',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(0 0 0)';
                  e.currentTarget.style.color = 'rgb(255 255 255)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'rgb(0 0 0)';
                }}
              >
                Conference
              </a>
              <a 
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  padding: '6px 12px', 
                  border: '1px solid rgb(0 0 0)', 
                  borderRadius: '2px', 
                  textDecoration: 'none', 
                  color: 'rgb(0 0 0)', 
                  fontSize: '11px', 
                  transition: 'all 0.2s',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(0 0 0)';
                  e.currentTarget.style.color = 'rgb(255 255 255)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'rgb(0 0 0)';
                }}
              >
                PDF
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder Notice */}
      <div style={{ marginTop: '48px', padding: '24px', backgroundColor: 'rgb(245 245 245)', border: '1px solid rgb(200 200 200)', borderRadius: '2px' }}>
        <p style={{ fontSize: '12px', color: 'rgb(100 100 100)', margin: 0, lineHeight: '1.6' }}>
          💡 <strong>How to customize:</strong><br/>
          1. Replace <code>authors</code> array with real author list for each paper<br/>
          2. Update <code>conferenceUrl</code> with the actual conference/journal website<br/>
          3. Update <code>pdfUrl</code> with the direct PDF download link<br/>
          4. Your name (set in <code>HIGHLIGHT_AUTHOR</code>) will be automatically <strong>bold and darker</strong>
        </p>
      </div>
    </div>
  );
}

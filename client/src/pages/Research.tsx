// 设置你想要高亮的作者名字（通常是你自己的名字）
const HIGHLIGHT_AUTHORS = ["Xuemin Chi", "Xuemin Chi*", "Jihao Huang*"];


// 会议/期刊颜色映射 - 可以自定义每个会议的颜色
const CONFERENCE_COLORS: Record<string, string> = {
  "IROS": "rgb(59 130 246)",  // 蓝色
  "CCDC": "rgb(59 130 246)",  // 蓝色
  "ICRA": "rgb(59 130 246)",  // 蓝色
  "RAL": "rgb(59 130 246)",  // 蓝色
  "IECON": "rgb(59 130 246)",  // 蓝色
  // "ICRA": "rgb(16 185 129)",  // 绿色
  "RSS": "rgb(249 115 22)",   // 橙色
  "CoRL": "rgb(168 85 247)",  // 紫色
  "NeurIPS": "rgb(236 72 153)", // 粉色
  "CVPR": "rgb(234 179 8)",   // 黄色
  "arXiv": "rgb(100 100 100)", // 灰色
  "IEEE Transactions on Control Systems Technology": "rgb(59 130 246)", // 蓝色
  "RSS Best Paper Finalist": "rgb(156, 35, 31)", // 红色
  // 添加更多会议/期刊及其颜色
  // 格式: "会议名称": "rgb(R G B)"
};

// 获取会议颜色，如果未定义则返回默认灰色
function getConferenceColor(conference: string): string {
  return CONFERENCE_COLORS[conference] || "rgb(100 100 100)";
}

const researchItems = [
  {
    id: 1,
    title: "Efficient and Real-Time Manipulation Planning for Robotics Using Projection-Based Optimization",
    authors: ["Xuemin Chi*", "Hakan Girgin*", "Tobias Löw", "Yiming Li", "Teng Xue", "Jihao Huang", "Cheng Hu", "Zhitao Liu", "Sylvain Calinon"],
    conference: "IROS",
    conferenceUrl: "https://sites.google.com/view/alspg-oc",  // TODO: 添加会议官网链接
    date: "2025",
    description: "Bridge learning and optimization through projections for efficient manipulation planning.",
    pdfUrl: "https://arxiv.org/pdf/2506.14865"  // PDF下载链接
  },
  {
    id: 2,
    title: "FSDP: Fast and Safe Data-Driven Overtaking Trajectory Planning for Head-to-Head Autonomous Racing Competitions",
    authors: ["Cheng Hu", "Jihao Huang", "Weiye Mao", "Yiming Fu", "Xuemin Chi", "Haotong Qin", "Nicolas Baumann", "Zhitao Liu", "Michele Magno"],
    conference: "IROS",
    conferenceUrl: "https://github.com/ZJU-DDRX/FSDP",  // TODO: 添加会议官网链接
    date: "2025",
    description: "Learn opponent behavior and plan overtaking trajectories in real-time for autonomous racing.",
    pdfUrl: "https://arxiv.org/pdf/2503.06075"
  },
  {
    id: 3,
    title: "Dynamic collision avoidance using velocity obstacle-based control barrier functions",
    authors: ["Jihao Huang", "Jun Zeng", "Xuemin Chi", "Koushil Sreenath", "Zhitao Liu", "Hongye Su"],
    conference: "IEEE Transactions on Control Systems Technology",
    conferenceUrl: "https://ieeexplore.ieee.org/document/10916817",  // TODO: 添加期刊链接
    date: "2025",
    description: "Dynamic collision avoidance using velocity obstacle-based control barrier functions.",
    pdfUrl: "https://arxiv.org/pdf/2503.00606"
  },
  {
    id: 4,
    title: "Safe dynamic motion generation in configuration space using differentiable distance fields",
    authors: ["Xuemin Chi*", "Jihao Huang*", "Yiming Li", "Bolun Dai", "Zhitao Liu", "Sylvain Calinon"],
    conference: "ICRA",
    conferenceUrl: "https://sites.google.com/view/sdfcdf-tvcbfs-qp",  // TODO: 添加arXiv链接
    date: "2025",
    description: "Learning-based differentiable distance fields for safe dynamic motion generation in configuration space.",
    pdfUrl: "https://arxiv.org/pdf/2412.16456"
  },
    {
    id: 5,
    title: "Projection-Based Optimization for Dynamic Obstacle Avoidance Using Velocity Obstacle",
    authors: ["Xuemin Chi*", "Jihao Huang*", "Jun Zeng", "Zhitao Liu", "Hongye Su"],
    conference: "ICRA",
    conferenceUrl: "https://sites.google.com/view/geopro-vo",  // TODO: 添加arXiv链接
    date: "2025",
    description: "Velocity Obstacle-based projections for multi-robot dynamic obstacle avoidance.",
    pdfUrl: "https://xueminchi.github.io/research"
  },
  {
    id: 6,
    title: "Configuration space distance fields for manipulation planning",
    authors: ["Yiming Li", "Xuemin Chi", "Amirreza Razmjoo", "Sylvain Calinon"],
    conference: "RSS Best Paper Finalist",
    conferenceUrl: "https://sites.google.com/view/cdfmp/home",  // TODO: 添加arXiv链接
    date: "2024",
    description: "Learning-based robot representation in configuration space for manipulation planning.",
    pdfUrl: "https://arxiv.org/pdf/2406.01137"
  },
  {
    id: 7,
    title: "Whole-body Dynamic Collision Avoidance with Time-varying Control Barrier Functions",
    authors: ["Jihao Huang", "Xuemin Chi", "Zhitao Liu", "Hongye Su"],
    conference: "CCDC",
    conferenceUrl: "https://sites.google.com/view/cdfmp/home",  // TODO: 添加arXiv链接
    date: "2024",
    description: "Distance field-based time-varying control barrier functions for whole-body dynamic collision avoidance.",
    pdfUrl: "https://arxiv.org/pdf/2406.01137"
  },
  {
    id: 8,
    title: "Fast Path Planning for Autonomous Vehicle Parking with Safety-Guarantee using Hamilton-Jacobi Reachability",
    authors: ["Xuemin Chi", "Jun Zeng", "Jihao Huang", "Zhitao Liu", "Hongye Su"],
    conference: "IEEE Transactions on Vehicle Technology",
    conferenceUrl: "https://www.youtube.com/watch?v=lafie7BW9oE",  // TODO: 添加arXiv链接
    date: "2024",
    description: "A hierarchical path planning framework for autonomous vehicle parking with safety guarantee.",
    pdfUrl: "https://arxiv.org/pdf/2310.15190"
  },
  {
    id: 9,
    title: "Velocity obstacle for polytopic collision avoidance for distributed multi-robot systems",
    authors: ["Jihao Huang", "Jun Zeng", "Xuemin Chi", "Koushil Sreenath", "Zhitao Liu", "Hongye Su"],
    conference: "RAL",
    conferenceUrl: "https://github.com/HybridRobotics/vo-polytope",  // TODO: 添加arXiv链接
    date: "2024",
    description: "First time use of velocity obstacle for polytopic collision avoidance in multi-robot systems.",
    pdfUrl: "https://arxiv.org/pdf/2304.07954"
  },
  {
    id: 10,
    title: "Geometric Projectors: Geometric Constraints based Optimization for Robot Behaviors",
    authors: ["Xuemin Chi", "Tobias Löw", "Yiming Li", "Zhitao Liu", "Sylvain Calinon"],
    conference: "arXiv",
    conferenceUrl: "https://sites.google.com/view/geopro-oc/geopro",  // TODO: 添加arXiv链接
    date: "2023",
    description: "First time use of geometric projectors for planning robot behaviors.",
    pdfUrl: "https://arxiv.org/pdf/2309.08802"
  },
  {
    id: 11,
    title: "Obstacle avoidance for unicycle-modelled mobile robots with time-varying control barrier functions",
    authors: ["Jihao Huang", "Zhitao Liu", "Jun Zeng", "Xuemin Chi", "Hongye Su"],
    conference: "IECON",
    conferenceUrl: "https://xueminchi.github.io/research",  // TODO: 添加arXiv链接
    date: "2023",
    description: "First time use of velocity obstacle for polytopic collision avoidance in multi-robot systems.",
    pdfUrl: "https://arxiv.org/pdf/2307.08227"
  },
  {
    id: 12,
    title: "Optimization-based Motion Planning for Autonomous Parking Considering Dynamic Obstacle: A Hierarchical Framework",
    authors: ["Xuemin Chi", "Zhitao Liu", "Jihao Huang", "Feng Hong", "Hongye Su"],
    conference: "CCDC",
    conferenceUrl: "https://xueminchi.github.io/research",  // TODO: 添加arXiv链接
    date: "2022",
    description: "Hierarchical optimization-based motion planning for autonomous parking with dynamic obstacle avoidance.",
    pdfUrl: "https://arxiv.org/pdf/2210.13112"
  },
];

// 作者列表渲染组件 - 高亮指定作者
function AuthorList({ authors }: { authors: string[] }) {
  return (
    <span style={{ fontSize: '12px', color: 'rgb(100 100 100)' }}>
      {authors.map((author, index) => {
        const isHighlighted = HIGHLIGHT_AUTHORS.includes(author);
        return (
          <span key={index}>
            {isHighlighted ? (
              <strong style={{ fontWeight: 600, color: 'rgb(0 0 0)' }}>{author}</strong>
            ) : (
              <span>{author}</span>
            )}
            {index < authors.length - 1 && ', '}
          </span>
        );
      })}
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
            <p style={{ 
              fontSize: '12px', 
              color: getConferenceColor(item.conference), 
              margin: '4px 0',
              fontWeight: '500'
            }}>{item.conference}</p>
            
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
                Website
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
      {/* <div style={{ marginTop: '48px', padding: '24px', backgroundColor: 'rgb(245 245 245)', border: '1px solid rgb(200 200 200)', borderRadius: '2px' }}>
        <p style={{ fontSize: '12px', color: 'rgb(100 100 100)', margin: 0, lineHeight: '1.6' }}>
          💡 <strong>How to customize:</strong><br/>
          1. Replace <code>authors</code> array with real author list for each paper<br/>
          2. Update <code>conferenceUrl</code> with the actual conference/journal website<br/>
          3. Update <code>pdfUrl</code> with the direct PDF download link<br/>
          4. Your name (set in <code>HIGHLIGHT_AUTHOR</code>) will be automatically <strong>bold and darker</strong>
        </p>
      </div> */}
    </div>
  );
}

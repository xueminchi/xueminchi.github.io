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

const colorClasses = {
  cyan: "research-card cyan",
  purple: "research-card purple",
  green: "research-card green",
  yellow: "research-card yellow",
  pink: "research-card pink",
  blue: "research-card blue",
};

export default function Research() {
  return (
    <div className="container py-16 md:py-24">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Research</h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Publications and research projects on robotics manipulation planning and generative models.
        </p>
      </div>

      {/* Research Timeline */}
      <div className="relative">
        {researchItems.map((item, index) => (
          <div key={item.id} className="flex gap-4 mb-6">
            {/* Timeline marker */}
            <div className={`tag-marker ${item.color} mt-1`}></div>
            
            {/* Content */}
            <a 
              href={item.link}
              className={colorClasses[item.color as keyof typeof colorClasses]}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold flex-1">{item.title}</h3>
                <span className="text-sm text-gray-500 ml-4 flex-shrink-0">{item.date}</span>
              </div>
              <p className="text-sm mb-2">{item.conference}</p>
              <p className="text-sm">{item.description}</p>
            </a>
          </div>
        ))}
      </div>

      {/* Placeholder Notice */}
      <div className="mt-12 p-6 bg-gray-50 border border-gray-300 rounded">
        <p className="text-sm text-gray-500">
          💡 <strong>Placeholder content:</strong> Replace the research items above with your actual publications. Each item should include the title, conference/journal name, publication date, and a link to the paper.
        </p>
      </div>
    </div>
  );
}

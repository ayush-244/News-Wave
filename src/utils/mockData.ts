// Mock news data for offline/demo mode
export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  category: string;
  author?: string;
}

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Revolutionary AI Breakthrough Changes Tech Industry Forever",
    description: "Scientists unveil groundbreaking artificial intelligence system that can understand context like never before.",
    content: "In a major development that could reshape the technology landscape, researchers have unveiled a new AI system with unprecedented contextual understanding. The system demonstrates remarkable abilities in natural language processing and reasoning.",
    url: "https://example.com/ai-breakthrough",
    urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { name: "Tech Today" },
    category: "technology",
    author: "Jane Smith"
  },
  {
    id: "2",
    title: "Championship Finals Set Record Viewership Numbers",
    description: "Historic sports event draws millions of viewers worldwide in an unforgettable match.",
    content: "The championship finals have concluded with record-breaking viewership numbers, as millions tuned in to watch the thrilling conclusion. The match lived up to its billing with dramatic moments throughout.",
    url: "https://example.com/championship",
    urlToImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: { name: "Sports Network" },
    category: "sports",
    author: "Mike Johnson"
  },
  {
    id: "3",
    title: "Global Markets Reach All-Time Highs Amid Recovery",
    description: "Stock markets worldwide celebrate strong economic indicators and investor confidence.",
    content: "Financial markets across the globe have reached new peaks as investors respond positively to economic data. Analysts attribute the surge to strong corporate earnings and optimistic growth forecasts.",
    url: "https://example.com/markets",
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: { name: "Business Daily" },
    category: "business",
    author: "Sarah Chen"
  },
  {
    id: "4",
    title: "Award-Winning Film Captivates Global Audiences",
    description: "New cinematic masterpiece receives critical acclaim and breaks box office records.",
    content: "The latest release from acclaimed director has taken the world by storm, combining stunning visuals with powerful storytelling. Critics and audiences alike have praised the film's innovative approach.",
    url: "https://example.com/film",
    urlToImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: { name: "Entertainment Weekly" },
    category: "entertainment",
    author: "David Martinez"
  },
  {
    id: "5",
    title: "Scientists Discover Potential Cure for Common Disease",
    description: "Medical breakthrough offers hope for millions affected by chronic condition.",
    content: "Researchers at leading universities have made a significant breakthrough in treating a widespread chronic condition. The new treatment approach shows promising results in early trials.",
    url: "https://example.com/medical",
    urlToImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80",
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: { name: "Medical Journal" },
    category: "health",
    author: "Dr. Emily White"
  },
  {
    id: "6",
    title: "Space Mission Returns with Unprecedented Discoveries",
    description: "Deep space exploration yields fascinating insights about our universe.",
    content: "A recent space mission has returned with data that challenges our understanding of the cosmos. Scientists are excited about the implications for future exploration and research.",
    url: "https://example.com/space",
    urlToImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: { name: "Science Daily" },
    category: "science",
    author: "Prof. Robert Lee"
  },
  {
    id: "7",
    title: "Tech Giants Announce Major Sustainability Initiative",
    description: "Leading companies commit to ambitious environmental goals.",
    content: "Major technology companies have joined forces to announce a comprehensive sustainability program. The initiative aims to achieve carbon neutrality within the next decade.",
    url: "https://example.com/sustainability",
    urlToImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80",
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    source: { name: "Tech Chronicle" },
    category: "technology",
    author: "Lisa Anderson"
  },
  {
    id: "8",
    title: "Olympic Athletes Prepare for Upcoming Games",
    description: "World's best competitors gear up for highly anticipated sporting event.",
    content: "Athletes from around the world are in final preparations for the upcoming games. Training facilities are bustling with activity as competitors fine-tune their skills.",
    url: "https://example.com/olympics",
    urlToImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
    publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    source: { name: "Olympic News" },
    category: "sports",
    author: "Tom Wilson"
  },
  {
    id: "9",
    title: "Cryptocurrency Market Sees Major Regulatory Changes",
    description: "New framework aims to bring clarity to digital asset landscape.",
    content: "Regulators have announced comprehensive guidelines for cryptocurrency trading and investment. The new framework is expected to provide much-needed clarity for investors and businesses.",
    url: "https://example.com/crypto",
    urlToImage: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80",
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    source: { name: "Finance Today" },
    category: "business",
    author: "Alex Kim"
  },
  {
    id: "10",
    title: "Streaming Service Announces Highly Anticipated Series",
    description: "Major platform reveals exciting new content lineup for subscribers.",
    content: "A leading streaming platform has unveiled its most ambitious series to date, featuring an all-star cast and cutting-edge production values. Pre-release buzz has been overwhelmingly positive.",
    url: "https://example.com/streaming",
    urlToImage: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80",
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    source: { name: "Entertainment Insider" },
    category: "entertainment",
    author: "Rachel Green"
  },
  {
    id: "11",
    title: "Climate Research Reveals Surprising Ocean Patterns",
    description: "New study sheds light on complex marine ecosystem dynamics.",
    content: "Marine scientists have published findings that reveal unexpected patterns in ocean currents and their impact on global climate. The research opens new avenues for environmental protection efforts.",
    url: "https://example.com/ocean",
    urlToImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    publishedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    source: { name: "Science Review" },
    category: "science",
    author: "Dr. Maria Santos"
  },
  {
    id: "12",
    title: "Mental Health Awareness Campaigns Gain Momentum",
    description: "Organizations worldwide unite to reduce stigma and improve support.",
    content: "A global initiative to promote mental health awareness has gained significant traction. Healthcare providers and advocates are working together to ensure better access to support services.",
    url: "https://example.com/mental-health",
    urlToImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    source: { name: "Health Monitor" },
    category: "health",
    author: "Dr. James Park"
  }
];

export const categories = [
  { slug: "technology", name: "Technology", icon: "💻" },
  { slug: "sports", name: "Sports", icon: "⚽" },
  { slug: "business", name: "Business", icon: "💼" },
  { slug: "entertainment", name: "Entertainment", icon: "🎬" },
  { slug: "science", name: "Science", icon: "🔬" },
  { slug: "health", name: "Health", icon: "❤️" }
];

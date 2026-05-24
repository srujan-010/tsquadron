// Client-side Database Layer for TSquadron Admin Dashboard
// Utilizes localStorage as a mock JSON repository, making it easy to swap out with API calls later.

const DEFAULT_BLOGS = [
  {
    id: 1,
    title: "Types of Visibility in Digital Marketing",
    category: "Digital Marketing",
    date: "May 28 2024",
    author: "TSquadron Expert",
    readTime: "5 min read",
    excerpt: "Digital marketing visibility is how many times and how easily a brand can be seen online across various digital channels.",
    content: "Brand visibility plays a vital role in customer acquisition and digital growth. Visual channels including organic Google search placements, interactive social media profiles, contextual email newsletters, and target paid bidding programs all combine to outline your total digital brand footprint.\n\nAt TSquadron, we engineer visibility systems that ensure your brand is seen immediately by local searchers in Warangal and global purchasers across major search engines. By combining high-authority search placements with creative storytelling banners, we turn casual page impressions into permanent commercial cash sales.",
    featured: true
  },
  {
    id: 2,
    title: "The Impact of Online Reputation Management on SEO",
    category: "ORM",
    date: "December 30 2023",
    author: "TSquadron Expert",
    readTime: "6 min read",
    excerpt: "A strong online reputation plays a major role in search engine optimization and customer trust.",
    content: "Google's quality rater guidelines prioritize Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T). When your company accumulates outstanding positive reviews, clean media write-ups, and stable entity mentions, search engine crawlers dynamically elevate your organic rank.\n\nTo lock in this trust, TSquadron builds programmatic ORM structures that suppress toxic search parameters, elevate customer star ratings, and compile structured review cycles across verified business dashboards.",
    featured: true
  },
  {
    id: 3,
    title: "The Impact of UI/UX Design on User Engagement",
    category: "UI/UX",
    date: "October 15 2023",
    author: "TSquadron Expert",
    readTime: "7 min read",
    excerpt: "UI/UX design significantly influences user engagement, usability, and digital experience quality.",
    content: "A product's user interface is the bridge connecting target audiences with raw backend capabilities. Creating clean accessibility pipelines, unified typographic grids, and delightful micro-interactions ensures lower friction during operational customer checkouts. With modern prototyping layouts, we structure beautiful interactive experiences.\n\nAt TSquadron, we connect aesthetic perfection with practical conversion psychology. Developing beautiful web components, customizable customer forms, and intuitive search patterns guides prospects smoothly down the sales funnel.",
    featured: true
  },
  {
    id: 4,
    title: "The Future of Email Marketing",
    category: "Email Marketing",
    date: "December 28 2023",
    author: "TSquadron Expert",
    readTime: "4 min read",
    excerpt: "Explore next-generation trends in automated email marketing workflows, personalization hooks, and behavioral trigger scaling.",
    content: "Sending identical blast emails to your entire list is a declining strategy. The future of email marketing lies in hyper-segmented automation based on active customer behavior.\n\nWe structure automated trigger workflows that target subscribers based on scroll depth, link clicks, and cart interactions—maximizing engagement and securing high conversion rates.",
    featured: false
  },
  {
    id: 5,
    title: "Top 10 Link Building Strategies to Rank Higher",
    category: "SEO",
    date: "December 27 2023",
    author: "TSquadron Expert",
    readTime: "7 min read",
    excerpt: "Discover the best white-hat link building techniques to increase domain authority and rank at the top of Google search overviews.",
    content: "Backlinks remain a primary search ranking pillar. Securing high-quality editorial mentions requires systematic outreach, dense resource building, and digital PR.\n\nTSquadron's advanced team publishes highly shareable data dashboards, audits competitors, and designs link campaigns that consistently rank Warangal companies at the top of search rankings.",
    featured: false
  },
  {
    id: 6,
    title: "The Future of Social Media Marketing",
    category: "Social Media Marketing",
    date: "December 26 2023",
    author: "TSquadron Expert",
    readTime: "9 min read",
    excerpt: "Explore how AI, video content, AR experiences, social commerce, and influencer collaborations are transforming the future of social media marketing.",
    content: "In the fast-evolving landscape of digital marketing, social media has emerged as a powerful force reshaping how businesses connect with their audiences. Leading the charge in the future of social media means unlocking massive audience engagement levels, initiating comprehensive digital transformation, engineering robust modern marketing strategies, and dynamically analyzing changing consumer behavior patterns.",
    featured: false
  },
  {
    id: 7,
    title: "The Role of Design Systems in Web Development",
    category: "Web Development",
    date: "December 23 2023",
    author: "TSquadron Expert",
    readTime: "8 min read",
    excerpt: "Explore how design systems improve consistency, scalability, collaboration, accessibility, and development efficiency in modern web applications.",
    content: "In the ever-evolving landscape of web development, design systems have become essential for ensuring consistency, efficiency, and scalability in digital experiences. Structuring premium workflows, publishing cohesive web solutions, building standardized UI kits, and hiring certified web design companies are the foundational pillars required to secure top-tier organic exposure in competitive digital industries.",
    featured: false
  },
  {
    id: 8,
    title: "The Fundamentals of UI/UX Design",
    category: "UI/UX",
    date: "December 22 2023",
    author: "TSquadron Expert",
    readTime: "10 min read",
    excerpt: "Explore the core principles of UI/UX design including usability, accessibility, responsive design, visual hierarchy, user research, and interaction design.",
    content: "In today’s evolving digital ecosystem, UI and UX design play a critical role in shaping engaging and memorable digital experiences. Unlocking user expectations means developing high-performing, tailored systems. Modern digital products demand clean strategic design rather than simple aesthetic wrappers to maximize brand online presence and trigger sustained user engagement.",
    featured: false
  },
  {
    id: 9,
    title: "The Role of Social Media in Online Reputation Management",
    category: "ORM",
    date: "December 21 2023",
    author: "TSquadron Expert",
    readTime: "10 min read",
    excerpt: "Explore how social media influences online reputation management, customer trust, brand transparency, crisis management, and long-term digital credibility.",
    content: "In today’s digital age, where information spreads instantly, online reputation management has become essential for businesses and individuals. Unlocking social media influence ensures robust positive image management across channels. Counteracting brand reputation risks, mitigating user reviews, and neutralizing false misinformation are key requirements to secure long-term digital credibility and shape positive online perception.",
    featured: false
  },
  {
    id: 10,
    title: "The Role of AI in Email Marketing",
    category: "Email Marketing",
    date: "December 20 2023",
    author: "TSquadron Expert",
    readTime: "10 min read",
    excerpt: "Explore how artificial intelligence is transforming email marketing through automation, personalization, predictive analytics, segmentation, and real-time optimization.",
    content: "In the fast-paced world of digital marketing, staying ahead requires innovative technologies, and Artificial Intelligence has become a powerful force transforming email marketing strategies. Harnessing AI innovation drives significant digital marketing evolution. Providing systematic campaign optimization, deepening customer engagement, and automating personalized communication are critical foundations needed to maximize conversions and elevate long-term customer relationships.",
    featured: false
  }
];

// No default mock leads, will initialize to empty array

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: "Karan Johar",
    company: "KJ Digital Labs",
    rating: 5,
    text: "TSquadron transformed our search engine presence entirely. Our organic traffic in Warangal grew by 300% in under six months.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    featured: true,
    approved: true
  },
  {
    id: 2,
    name: "Priyanka Sen",
    company: "Stellar Designs",
    rating: 5,
    text: "The UI/UX development team at TSquadron designed our website with maximum visual aesthetics. Highly recommended!",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    featured: true,
    approved: true
  },
  {
    id: 3,
    name: "Abhinav Bindra",
    company: "Gold Medals Academy",
    rating: 4,
    text: "Excellent PPC campaigns. Our cost per lead dropped by 45% and conversion ratios scaled dramatically.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    featured: true,
    approved: true
  },
  {
    id: 4,
    name: "Karthik Yadav Namasani",
    company: "a year ago",
    rating: 5,
    text: "Tsquadron Digital Solutions offers a great digital marketing course in Warangal. The modules are simple to understand, and they give practical projects to help you learn better. The team is very supportive and helps you build useful skills for your career. I highly recommend it!",
    photo: "",
    featured: true,
    approved: true
  },
  {
    id: 5,
    name: "Kruthi Tuluva",
    company: "a year ago",
    rating: 5,
    text: "Tsquadron Digital Solutions is one of the best place to learn and enhance your digital marketing skills and they provide us practical hands on training and I highly recommend Tsquadron Digital Solutions for digital marketing training institute in Warangal",
    photo: "",
    featured: true,
    approved: true
  },
  {
    id: 6,
    name: "Shaga Jayaprakash",
    company: "a year ago",
    rating: 5,
    text: "Arvind sir Way of teaching and explanation is perfect to understand and practically i learned alot in digital marketing course with the help of tsquadron digital solutions thank you tsquadron and best digital marketing training institute in warangal",
    photo: "",
    featured: true,
    approved: true
  },
  {
    id: 7,
    name: "Nikhil Chary",
    company: "a year ago",
    rating: 5,
    text: "I never thought that digital marketing could be this easy to understand. Tsquadron digital marketing course made everything clear, from SEO to online advertising. I now feel confident on taking any job that related to digital marketing. Thank's to tsquadron digital solutions and special thanks to Arvind sir.",
    photo: "",
    featured: true,
    approved: true
  },
  {
    id: 8,
    name: "Harshitha chandra Thummala",
    company: "a year ago",
    rating: 5,
    text: "Tsquadron is one of the best digital marketing training academy in warangal.The way Arvind sir explains is eaiser to understand.Thankyou, Tsquadron digital soutions.",
    photo: "",
    featured: false,
    approved: true
  },
  {
    id: 9,
    name: "Prashu",
    company: "2 years ago",
    rating: 5,
    text: "One of the best digital marketing training centre trainer was very friendly and lot of subject experience I personally feel like a brother for my career guidence in every class they asked questions about past classes ,he prepare candidate as a pro it's my luck I got better teacher",
    photo: "",
    featured: false,
    approved: true
  },
  {
    id: 10,
    name: "vamshidhar jegula",
    company: "2 years ago",
    rating: 5,
    text: "Good Digital marketing academy in Warangal. Tsquadron provide me basic classes to advance with live projects and internship certification",
    photo: "",
    featured: false,
    approved: true
  },
  {
    id: 11,
    name: "Kashaboina Ramakrishna",
    company: "2 years ago",
    rating: 5,
    text: "They provide good Digital marketing classes as a trainee i got cleared all the doubts from my trainer. Right now Im working As junior Digital Marketing analyst at Qtrix. Thank you Tsquadron.",
    photo: "",
    featured: true,
    approved: true
  },
  {
    id: 12,
    name: "sai nath",
    company: "2 years ago",
    rating: 5,
    text: "I learned a lot of digital marketing modules from this Institute. One of the best digital marketing training academy in warangal",
    photo: "",
    featured: false,
    approved: true
  },
  {
    id: 13,
    name: "Pranay Kumar",
    company: "a year ago",
    rating: 5,
    text: "Good Institute with practical learning. On live projects best digital marketing Institute in warangal thank you! Tsquadron",
    photo: "",
    featured: false,
    approved: true
  },
  {
    id: 14,
    name: "Anilkumar Kodipaka",
    company: "Local Guide · a year ago",
    rating: 5,
    text: "best place to learn the digital marketing course in warangal and I have improved my technical skills here thank you!",
    photo: "",
    featured: false,
    approved: true
  },
  {
    id: 15,
    name: "Mounika Akula",
    company: "2 years ago",
    rating: 5,
    text: "Best digital marketing training institute in warangal. I have got certification and placement",
    photo: "",
    featured: true,
    approved: true
  },
  {
    id: 16,
    name: "Bejugam Sriharsha",
    company: "a year ago",
    rating: 5,
    text: "Great place to learn and get certified digital marketing course in warangal with technical skills",
    photo: "",
    featured: false,
    approved: true
  },
  {
    id: 17,
    name: "Krishna Telukalapally",
    company: "a year ago",
    rating: 5,
    text: "Good and supporting trainer for digital marketing. I have really thankful to tsquadron digital solutions",
    photo: "",
    featured: false,
    approved: true
  },
  {
    id: 18,
    name: "velagandula srilekhamittal",
    company: "a year ago",
    rating: 5,
    text: "I am so glad to thank Tsquadron because i have learned basic to advanced digital marketing skills and on hands experience",
    photo: "",
    featured: true,
    approved: true
  },
  {
    id: 19,
    name: "pranay veer",
    company: "a year ago",
    rating: 5,
    text: "Thank you arvind sir and really great explanation and teaching methods and i learned many digital marketing techniques from you sir.",
    photo: "",
    featured: false,
    approved: true
  },
  {
    id: 20,
    name: "Bharath krishna",
    company: "Local Guide · a week ago",
    rating: 5,
    text: "Best digital Marketing services in Warangal, warangal.",
    photo: "",
    featured: true,
    approved: true
  },
  {
    id: 21,
    name: "Hacker",
    company: "2 years ago",
    rating: 5,
    text: "Best digital marketing training in Warangal",
    photo: "",
    featured: false,
    approved: true
  }
];

const DEFAULT_SERVICES = [
  {
    id: "seo",
    title: "Search Engine Optimization",
    tagline: "Rank Higher, Drive Organic Traffic",
    desc: "Scale your organic search rankings and connect with commercial customers actively seeking your products and services online.",
    cta: "Request Free SEO Audit",
    faqs: [
      { q: "How long does it take to rank on Google?", a: "Standard SEO results take 3 to 6 months to mature depending on competition." },
      { q: "Do you provide local SEO targeting Warangal?", a: "Yes! We specialize in local maps and city-specific Google searches." }
    ]
  },
  {
    id: "smm",
    title: "Social Media Marketing",
    tagline: "Engage Audiences, Build Brand Value",
    desc: "Create vibrant, brand-aligned visual assets, captions, and short reels across Instagram, Facebook, and LinkedIn.",
    cta: "Get SMM Campaign Strategy",
    faqs: [
      { q: "Which social network is best for business?", a: "Instagram is excellent for visual storytelling, while LinkedIn is optimal for B2B leads." }
    ]
  },
  {
    id: "ppc",
    title: "PPC Services",
    tagline: "Maximize ROI, Secure Conversions",
    desc: "Run hyper-targeted Google search ads and remarketing campaigns optimized to generate immediate phone calls, leads, and sales.",
    cta: "Start PPC Bidding",
    faqs: [
      { q: "How do you manage ad spend?", a: "We monitor performance daily and shift budgets dynamically into top-converting ads." }
    ]
  }
];

const DEFAULT_SETTINGS = {
  companyName: "TSquadron Digital Solutions",
  logoText: "TSquadron",
  contactEmail: "info@tsquadron.com",
  contactPhone: "+91 98765 43210",
  googlePlaceId: "",
  googleApiKey: "",
  socialLinks: {
    facebook: "https://facebook.com/tsquadron",
    instagram: "https://instagram.com/tsquadron",
    linkedin: "https://linkedin.com/company/tsquadron",
    twitter: "https://twitter.com/tsquadron"
  },
  seoDefaults: {
    title: "TSquadron Digital Solutions | Best Digital Agency in Warangal",
    description: "TSquadron is a leading digital marketing agency in Warangal providing premium SEO, SMM, PPC, UI/UX, and web development services."
  },
  addresses: [
    {
      title: "Warangal Branch Office",
      line1: "2nd Floor, V-Square Plaza",
      line2: "Naimnagar Main Road, Hanamkonda",
      state: "Telangana 506001"
    }
  ]
};

const DEFAULT_MEDIA = [
  { id: 1, name: "SEO Graph Illustration", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400", size: "142 KB" },
  { id: 2, name: "UI Design Mockup", url: "https://images.unsplash.com/photo-1541462608141-ad4979e408c9?w=400", size: "284 KB" },
  { id: 3, name: "Team Synergy", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400", size: "310 KB" }
];

// Helper to initialize and retrieve stores
const getStore = (key, fallback) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  return JSON.parse(data);
};

const setStore = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const db = {
  // LEADS
  getLeads: () => getStore("tsquadron_leads", []),
  saveLead: (lead) => {
    const leads = db.getLeads();
    const newLead = {
      id: Date.now(),
      status: "New",
      createdAt: new Date().toISOString(),
      date: new Date().toISOString(), // Fallback date representation
      ...lead
    };
    leads.unshift(newLead);
    setStore("tsquadron_leads", leads);
    return newLead;
  },
  updateLeadStatus: (id, status) => {
    const leads = db.getLeads();
    const index = leads.findIndex(l => l.id === Number(id));
    if (index !== -1) {
      leads[index].status = status;
      setStore("tsquadron_leads", leads);
    }
    return leads;
  },
  deleteLead: (id) => {
    const leads = db.getLeads();
    const filtered = leads.filter(l => l.id !== Number(id));
    setStore("tsquadron_leads", filtered);
    return filtered;
  },

  // BLOGS
  getBlogs: () => {
    const blogs = getStore("tsquadron_blogs", DEFAULT_BLOGS);
    // Automatically restore any missing default blog items to clean stale local caches
    let updated = false;
    DEFAULT_BLOGS.forEach(defBlog => {
      if (!blogs.some(b => b.id === defBlog.id)) {
        blogs.push(defBlog);
        updated = true;
      }
    });
    if (updated) {
      blogs.sort((a, b) => a.id - b.id);
      setStore("tsquadron_blogs", blogs);
    }
    return blogs;
  },
  saveBlog: (blog) => {
    const blogs = db.getBlogs();
    if (blog.id) {
      const idx = blogs.findIndex(b => b.id === Number(blog.id));
      if (idx !== -1) {
        blogs[idx] = { ...blogs[idx], ...blog, date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) };
      }
    } else {
      const newBlog = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        author: "TSquadron Expert",
        ...blog
      };
      blogs.unshift(newBlog);
    }
    setStore("tsquadron_blogs", blogs);
    return blogs;
  },
  deleteBlog: (id) => {
    const blogs = db.getBlogs();
    const filtered = blogs.filter(b => b.id !== Number(id));
    setStore("tsquadron_blogs", filtered);
    return filtered;
  },

  // TESTIMONIALS
  getTestimonials: () => {
    const testimonials = getStore("tsquadron_testimonials", DEFAULT_TESTIMONIALS);
    let updated = false;
    DEFAULT_TESTIMONIALS.forEach(defTestimonial => {
      if (!testimonials.some(t => t.id === defTestimonial.id)) {
        testimonials.push(defTestimonial);
        updated = true;
      }
    });
    if (updated) {
      testimonials.sort((a, b) => a.id - b.id);
      setStore("tsquadron_testimonials", testimonials);
    }
    return testimonials;
  },
  saveTestimonial: (t) => {
    const testimonials = db.getTestimonials();
    if (t.id) {
      const idx = testimonials.findIndex(x => x.id === Number(t.id));
      if (idx !== -1) {
        testimonials[idx] = { ...testimonials[idx], ...t };
      }
    } else {
      const newTestimonial = {
        id: Date.now(),
        approved: true,
        photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
        ...t
      };
      testimonials.push(newTestimonial);
    }
    setStore("tsquadron_testimonials", testimonials);
    return testimonials;
  },
  deleteTestimonial: (id) => {
    const testimonials = db.getTestimonials();
    const filtered = testimonials.filter(x => x.id !== Number(id));
    setStore("tsquadron_testimonials", filtered);
    return filtered;
  },

  // SERVICES
  getServices: () => getStore("tsquadron_services", DEFAULT_SERVICES),
  saveService: (service) => {
    const services = db.getServices();
    const idx = services.findIndex(s => s.id === service.id);
    if (idx !== -1) {
      services[idx] = { ...services[idx], ...service };
      setStore("tsquadron_services", services);
    }
    return services;
  },

  // SETTINGS
  getSettings: () => getStore("tsquadron_settings", DEFAULT_SETTINGS),
  saveSettings: (settings) => {
    setStore("tsquadron_settings", settings);
    return settings;
  },

  // MEDIA
  getMedia: () => getStore("tsquadron_media", DEFAULT_MEDIA),
  addMedia: (mediaItem) => {
    const media = db.getMedia();
    const newItem = {
      id: Date.now(),
      ...mediaItem
    };
    media.unshift(newItem);
    setStore("tsquadron_media", media);
    return newItem;
  },
  deleteMedia: (id) => {
    const media = db.getMedia();
    const filtered = media.filter(m => m.id !== Number(id));
    setStore("tsquadron_media", filtered);
    return filtered;
  },

  // VIRTUAL FILE-BASED SEO STORE
  getSeoFile: (filePath, defaultData) => {
    return getStore(`tsquadron_seo_file_${filePath}`, defaultData || {});
  },
  saveSeoFile: (filePath, data) => {
    setStore(`tsquadron_seo_file_${filePath}`, data);
    // Dispatch custom event to instantly trigger re-renders in SEOHelmet without refresh
    window.dispatchEvent(new Event('seo-updated'));
    return data;
  }
};

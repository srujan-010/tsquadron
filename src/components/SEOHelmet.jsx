import React from 'react'
import { Helmet } from 'react-helmet-async'
import { db } from '../lib/db'

// Fallback dictionary for initial out-of-the-box configuration before user edit
const DEFAULT_PAGE_SEO = {
  'home': {
    title: 'TSquadron | Performance Marketing & Digital Growth Agency',
    description: 'TSquadron is a leading digital marketing agency providing premium SEO, SMM, PPC, UI/UX, and web development services.',
    keywords: 'digital marketing agency, performance marketing, seo agency, warangal',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  'about-us': {
    title: 'About TSquadron | Premium Digital Marketing Company',
    description: 'Learn about TSquadron, our elite squad of performance marketers, technical SEO experts, and conversion-focused web developers.',
    keywords: 'digital marketing company, about us, marketing experts, warangal',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  'contact': {
    title: 'Contact TSquadron | Ignite Your Growth Platform',
    description: 'Book your free SEO audit and campaign strategy session. Get in touch with our digital specialists today.',
    keywords: 'contact agency, free seo audit, hire marketing agency, warangal',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  'blog': {
    title: 'Digital Marketing Insights & SEO Blog | TSquadron',
    description: 'Stay ahead with the latest industry updates, technical search guides, conversion design trends, and email automation strategies.',
    keywords: 'marketing insights, seo blog, advertising tips, ui ux case studies',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  'services': {
    title: 'High-Scale Growth Marketing Services | TSquadron',
    description: 'Explore our ROI-centric marketing services including Search Engine Optimization, Paid Ads (PPC), Social Media Marketing, and Headless Web Design.',
    keywords: 'marketing capabilities, ppc services, smm campaigns, headless web design',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  'digital-marketing-training-in-warangal': {
    title: 'Digital Marketing Training in Warangal | SEO, PPC & Social Media Course',
    description: 'Join TSquadron’s Digital Marketing Training in Warangal and learn SEO, Google Ads, Social Media Marketing, AI Tools, and Branding with practical live projects and placement support.',
    keywords: 'digital marketing training warangal, SEO course warangal, PPC training, social media marketing institute warangal, digital marketing classes',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  'privacy-policy': {
    title: 'Privacy Policy | TSquadron',
    description: 'Read TSquadron’s Privacy Policy to understand how we collect, use, and protect your information.',
    keywords: 'privacy policy tsquadron, digital marketing privacy policy, data protection, user privacy',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  // Services
  'digital-marketing-agency-hanamkonda': {
    title: 'Digital Marketing Agency in Warangal | TSquadron',
    description: 'Accelerate your commercial metrics with Warangal\'s premier 360° growth marketing partner.',
    keywords: 'digital agency warangal, marketing firm, online growth, local marketing',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  'seo-company-in-hanamkonda': {
    title: 'Best SEO Company in Warangal | TSquadron',
    description: 'Dominate organic search results and command top Google ranks with our custom high-authority SEO strategies.',
    keywords: 'seo company warangal, search engine optimization, rank on google, local seo',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  'social-media-marketing': {
    title: 'Social Media Marketing Company in Warangal | TSquadron',
    description: 'Build massive audience value and trigger hot customer conversions across Instagram, Facebook, and LinkedIn.',
    keywords: 'social media marketing, smm warangal, instagram growth, brand outreach',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  'ppc-services-in-hanamkonda': {
    title: 'Top PPC Services in Warangal | TSquadron',
    description: 'Ignite instant customer inbound calls and demo sales. Run high-yield Google search, Meta, and LinkedIn campaign ads.',
    keywords: 'ppc services warangal, google ads management, paid advertising, lead generation',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  'email-marketing-company-hanamkonda': {
    title: 'Email Marketing Services in Warangal | TSquadron',
    description: 'Nurture subscribers and unlock recurring client revenues. Build high-performing automated email flows.',
    keywords: 'email marketing warangal, lead nurturing, email automation, newsletter design',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  'online-reputation-management-services-hanumakonda': {
    title: 'Online Reputation Management Services in Warangal | TSquadron',
    description: 'Erase search engine toxicity and command trust. Deploy certified brand sentiment amplification frameworks.',
    keywords: 'orm services warangal, reputation management, brand trust, review removal',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  'web-designing-development-company-hanumakonda': {
    title: 'Best Web Designing Company in Warangal | TSquadron',
    description: 'Deploy headless visual experiences running at light speed. Sleek grids, robust conversions, and secure architectures.',
    keywords: 'web design warangal, web development company, fast websites, react development',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  },
  'ui-ux-designing-company-hanamkonda': {
    title: 'UI/UX Designing Company in Warangal | TSquadron',
    description: 'Frictionless client interfaces and conversion layouts that secure visual excellence and retention.',
    keywords: 'ui ux design warangal, interface designer, conversion optimization, wireframing',
    robotsIndex: 'index',
    robotsFollow: 'follow'
  }
}

export default function SEOHelmet({ activePage }) {
  // Add a dummy state to force re-render when SEO settings are saved
  const [updateTick, setUpdateTick] = React.useState(0)

  React.useEffect(() => {
    const handleSeoUpdate = () => setUpdateTick(t => t + 1)
    window.addEventListener('seo-updated', handleSeoUpdate)
    return () => window.removeEventListener('seo-updated', handleSeoUpdate)
  }, [])

  // 1. Fetch Global defaults
  const globalSeo = db.getSeoFile('global.json', {
    siteTitle: 'TSquadron | Performance Marketing & Digital Growth Agency',
    defaultMetaDescription: 'TSquadron is a premium performance digital agency in Warangal. We engineer aggressive, analytics-guided SEO, SMM, PPC, and UI/UX campaigns.',
    defaultKeywords: 'digital marketing, seo, ppc, social media marketing, reputation management, web design, ui ux design',
    defaultOgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    favicon: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80',
    brandName: 'TSquadron',
    twitterHandle: '@tsquadron',
    defaultRobotsRule: 'index, follow',
    googleSearchConsole: '',
    googleAnalyticsId: '',
    facebookPixelId: ''
  })

  // 2. Resolve virtual filepath path
  const getSeoPath = (page) => {
    if (!page) return 'pages/home.json'
    switch (page) {
      case 'home': return 'pages/home.json'
      case 'about-us':
      case 'about': return 'pages/about.json'
      case 'contact': return 'pages/contact.json'
      case 'blog': return 'pages/blog.json'
      case 'services': return 'pages/services.json'
      case 'digital-marketing-training-in-warangal': return 'pages/digital-marketing-training-in-warangal.json'
      
      // Services mapping
      case 'digital-marketing-agency-hanamkonda': return 'services/digital-marketing.json'
      case 'seo-company-in-hanamkonda': return 'services/seo.json'
      case 'social-media-marketing': return 'services/social-media.json'
      case 'ppc-services-in-hanamkonda': return 'services/ppc.json'
      case 'email-marketing-company-hanamkonda': return 'services/email-marketing.json'
      case 'online-reputation-management-services-hanumakonda': return 'services/orm.json'
      case 'web-designing-development-company-hanumakonda': return 'services/web-design.json'
      case 'ui-ux-designing-company-hanamkonda': return 'services/ui-ux.json'
      
      // Blogs mapping
      case 'blog-details-visibility': return 'blogs/types-of-visibility-in-digital-marketing.json'
      case 'blog-details-reputation': return 'blogs/impact-of-online-reputation-management-on-seo.json'
      case 'blog-details-uiux': return 'blogs/impact-of-ui-ux-design-on-user-engagement.json'
      case 'blog-details-email': return 'blogs/future-of-email-marketing.json'
      case 'blog-details-link': return 'blogs/top-10-link-building-strategies.json'
      case 'blog-details-social': return 'blogs/future-of-social-media-marketing.json'
      case 'blog-details-system': return 'blogs/role-of-design-systems-in-web-development.json'
      case 'blog-details-fundamentals': return 'blogs/fundamentals-of-ui-ux-design.json'
      case 'blog-details-reputation-social': return 'blogs/role-of-social-media-in-online-reputation-management.json'
      case 'blog-details-email-ai': return 'blogs/role-of-ai-in-email-marketing.json'
      
      default: return `pages/${page}.json`
    }
  }

  const pagePath = getSeoPath(activePage)
  
  // Get fallback standard default for this specific page if nothing custom is stored
  const pageFallback = DEFAULT_PAGE_SEO[activePage] || {
    title: globalSeo.siteTitle,
    description: globalSeo.defaultMetaDescription,
    keywords: globalSeo.defaultKeywords,
    robotsIndex: 'index',
    robotsFollow: 'follow'
  }

  // If this is a blog details path, fetch the actual blog post title for the fallback out-of-the-box feel!
  if (activePage.startsWith('blog-details-')) {
    const blogs = db.getBlogs();
    const blogIdMap = {
      'blog-details-visibility': 1,
      'blog-details-reputation': 2,
      'blog-details-uiux': 3,
      'blog-details-email': 4,
      'blog-details-link': 5,
      'blog-details-social': 6,
      'blog-details-system': 7,
      'blog-details-fundamentals': 8,
      'blog-details-reputation-social': 9,
      'blog-details-email-ai': 10
    }
    const blogId = blogIdMap[activePage];
    const matchBlog = blogs.find(b => b.id === blogId);
    if (matchBlog) {
      pageFallback.title = `${matchBlog.title} | TSquadron`;
      pageFallback.description = matchBlog.excerpt;
    }
  }

  const pageSeo = db.getSeoFile(pagePath, pageFallback)

  // 3. Combine Global parameters + Page overrides
  const siteName = globalSeo.brandName || 'TSquadron'
  const title = pageSeo.title || pageFallback.title || globalSeo.siteTitle
  const description = pageSeo.description || pageFallback.description || globalSeo.defaultMetaDescription
  const keywords = pageSeo.keywords || pageFallback.keywords || globalSeo.defaultKeywords
  
  const cleanActivePage = activePage === 'home' ? '' : activePage + '/'
  const canonicalUrl = pageSeo.canonicalUrl || `https://www.tsquadron.com/${cleanActivePage}`
  
  const robotsIndex = pageSeo.robotsIndex || pageFallback.robotsIndex || 'index'
  const robotsFollow = pageSeo.robotsFollow || pageFallback.robotsFollow || 'follow'
  const robotsRule = `${robotsIndex}, ${robotsFollow}`

  // Open Graph
  const ogTitle = pageSeo.ogTitle || title
  const ogDescription = pageSeo.ogDescription || description
  const ogImage = pageSeo.ogImage || globalSeo.defaultOgImage

  // Twitter
  const twitterTitle = pageSeo.twitterTitle || title
  const twitterDescription = pageSeo.twitterDescription || description
  const twitterImage = pageSeo.twitterImage || ogImage
  const twitterHandle = globalSeo.twitterHandle || '@tsquadron'

  // Schemas
  const schemaEnabled = pageSeo.schemaEnabled !== false
  const schemaMarkup = pageSeo.schema

  // Webmaster accounts
  const googleVerification = globalSeo.googleSearchConsole
  const gaId = globalSeo.googleAnalyticsId
  const fbPixelId = globalSeo.facebookPixelId

  return (
    <Helmet>
      {/* Primary HTML Meta Standards */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={robotsRule} />

      {/* Favicon Dynamic Link */}
      {globalSeo.favicon && (
        <link rel="icon" type="image/x-icon" href={globalSeo.favicon} />
      )}

      {/* Google Webmaster Search Console Verification Tag */}
      {googleVerification && (
        <meta name="google-site-verification" content={googleVerification} />
      )}

      {/* Open Graph Tags */}
      <meta property="og:type" content={activePage.startsWith('blog-details-') ? 'article' : 'website'} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Cards Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={twitterImage} />

      {/* Dynamic JSON-LD Structured Schema Injections */}
      {schemaEnabled && schemaMarkup && (
        <script type="application/ld+json">
          {schemaMarkup}
        </script>
      )}

      {/* Google Analytics Global Tag script integration */}
      {gaId && (
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      )}
      {gaId && (
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </script>
      )}

      {/* Facebook Pixel script integration */}
      {fbPixelId && (
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbPixelId}');
            fbq('track', 'PageView');
          `}
        </script>
      )}
    </Helmet>
  )
}

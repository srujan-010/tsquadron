import React from 'react'
import { Helmet } from 'react-helmet-async'
import { db } from '../lib/db'

// Fallback dictionary for initial out-of-the-box configuration before user edit
const DEFAULT_PAGE_SEO = {
  'home': {
    title: 'TSquadron | Performance Marketing & Digital Growth Agency',
    description: 'TSquadron is a leading digital marketing agency in Warangal. We engineer aggressive, analytics-guided SEO, SMM, PPC, and UI/UX campaigns.',
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
};

export default function SEOHelmet({ activePage }) {
  // Use React state directly for the global SEO settings to guarantee instant UI rendering of changes
  const [globalSeo, setGlobalSeo] = React.useState(() => {
    return db.getSeoFile('global.json', {
      siteTitle: 'TSquadron | Performance Marketing & Digital Growth Agency',
      defaultMetaDescription: 'TSquadron is a premium performance digital agency in Warangal. We engineer aggressive, analytics-guided SEO, SMM, PPC, and UI/UX campaigns.',
      defaultKeywords: 'digital marketing, seo, ppc, social media marketing, reputation management, web design, ui ux design',
      defaultOgImage: 'https://res.cloudinary.com/dixbhnqnf/image/upload/v1782553914/Chat-GPT-Image-May-21-2026-03-14-44-PM-removebg-preview_b7cqku.png',
      favicon: 'https://res.cloudinary.com/dixbhnqnf/image/upload/v1782553914/Chat-GPT-Image-May-21-2026-03-14-44-PM-removebg-preview_b7cqku.png',
      brandName: 'TSquadron',
      websiteName: 'TSquadron Digital Solutions',
      twitterHandle: '@tsquadron',
      defaultRobotsRule: 'index, follow',
      googleSearchConsole: '',
      bingWebmaster: '',
      googleAnalyticsId: '',
      googleTagManager: '',
      facebookPixelId: '',
      canonicalDomain: 'https://www.tsquadron.com',
      businessAddress: '2nd Floor, V-Square Plaza, Naimnagar Main Road, Hanamkonda',
      city: 'Warangal',
      state: 'Telangana',
      country: 'India',
      phoneNumber: '+91 98765 43210',
      whatsAppNumber: '+91 98765 43210',
      email: 'info@tsquadron.com',
      facebookLink: 'https://facebook.com/tsquadron',
      instagramLink: 'https://instagram.com/tsquadron',
      linkedinLink: 'https://linkedin.com/company/tsquadron',
      twitterLink: 'https://twitter.com/tsquadron'
    })
  })

  // Synchronize state when settings are updated in the admin panel
  React.useEffect(() => {
    const handleSeoUpdate = () => {
      const freshData = db.getSeoFile('global.json')
      if (freshData && Object.keys(freshData).length > 0) {
        setGlobalSeo(freshData)
      }
    }
    window.addEventListener('seo-updated', handleSeoUpdate)
    return () => window.removeEventListener('seo-updated', handleSeoUpdate)
  }, [])

  // Sync settings from backend server API (MongoDB JSON mock) in the background on route shifts
  React.useEffect(() => {
    const absoluteApiUrl = `${window.location.origin}/api/seo/global`
    fetch(absoluteApiUrl)
      .then(res => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then(serverData => {
        if (serverData && Object.keys(serverData).length > 0) {
          setGlobalSeo(serverData)
          db.saveSeoFile('global.json', serverData)
        }
      })
      .catch(err => console.log('SEOHelmet background database sync skipped', err));
  }, [activePage])

  // 2. Resolve virtual filepath path & dynamic page details
  let pagePath = 'pages/home.json'
  let isBlog = false
  let isService = false
  let isProduct = false
  let isCategory = false

  let matchedBlog = null
  let matchedProduct = null
  let matchedCategory = null

  const getSeoPath = (page) => {
    if (!page) return 'pages/home.json'
    if (page.startsWith('blog-details-')) {
      isBlog = true
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
      const blogId = blogIdMap[page]
      matchedBlog = db.getBlogs().find(b => b.id === blogId)
      return matchedBlog ? `blogs/${matchedBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.json` : `blogs/default.json`
    }
    
    if (page.startsWith('blog/')) {
      isBlog = true
      const slug = page.replace('blog/', '')
      matchedBlog = db.getBlogs().find(b => b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug)
      return matchedBlog ? `blogs/${slug}.json` : `blogs/${slug}.json`
    }

    if (page.startsWith('products/')) {
      isProduct = true
      const slug = page.replace('products/', '')
      matchedProduct = db.getProducts().find(p => p.slug === slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug)
      return matchedProduct ? `products/${slug}.json` : `products/${slug}.json`
    }

    if (page.startsWith('categories/')) {
      isCategory = true
      const slug = page.replace('categories/', '')
      matchedCategory = db.getCategories().find(c => c.slug === slug)
      return matchedCategory ? `categories/${slug}.json` : `categories/${slug}.json`
    }

    // Services Mapping
    const servicePages = [
      'digital-marketing-agency-hanamkonda',
      'seo-company-in-hanamkonda',
      'social-media-marketing',
      'ppc-services-in-hanamkonda',
      'email-marketing-company-hanamkonda',
      'online-reputation-management-services-hanumakonda',
      'web-designing-development-company-hanumakonda',
      'ui-ux-designing-company-hanamkonda'
    ]

    if (servicePages.includes(page)) {
      isService = true
      const slugMap = {
        'digital-marketing-agency-hanamkonda': 'digital-marketing',
        'seo-company-in-hanamkonda': 'seo',
        'social-media-marketing': 'social-media',
        'ppc-services-in-hanamkonda': 'ppc',
        'email-marketing-company-hanamkonda': 'email-marketing',
        'online-reputation-management-services-hanumakonda': 'orm',
        'web-designing-development-company-hanumakonda': 'web-design',
        'ui-ux-designing-company-hanamkonda': 'ui-ux'
      }
      return `services/${slugMap[page]}.json`
    }

    switch (page) {
      case 'home': return 'pages/home.json'
      case 'about-us':
      case 'about': return 'pages/about.json'
      case 'contact': return 'pages/contact.json'
      case 'blog': return 'pages/blog.json'
      case 'services': return 'pages/services.json'
      case 'digital-marketing-training-in-warangal': return 'pages/digital-marketing-training-in-warangal.json'
      case 'privacy-policy': return 'pages/privacy-policy.json'
      default: return `pages/${page}.json`
    }
  }

  pagePath = getSeoPath(activePage)
  
  // Get fallback standard default for this specific page if nothing custom is stored
  const rawFallback = DEFAULT_PAGE_SEO[activePage]
  const pageFallback = {
    title: (activePage === 'home' || !rawFallback?.title) ? globalSeo.siteTitle : rawFallback.title,
    description: (activePage === 'home' || !rawFallback?.description) ? globalSeo.defaultMetaDescription : rawFallback.description,
    keywords: (activePage === 'home' || !rawFallback?.keywords) ? globalSeo.defaultKeywords : rawFallback.keywords,
    robotsIndex: rawFallback?.robotsIndex || 'index',
    robotsFollow: rawFallback?.robotsFollow || 'follow'
  }

  // Populate dynamic product fallback if applicable
  if (isProduct && matchedProduct) {
    pageFallback.title = matchedProduct.seoTitle || `${matchedProduct.name} | TSquadron`
    pageFallback.description = matchedProduct.seoDescription || matchedProduct.description
    pageFallback.keywords = `${matchedProduct.primaryKeyword}, ${matchedProduct.secondaryKeywords}, products`
    pageFallback.robotsIndex = matchedProduct.robotsIndex || 'index'
    pageFallback.robotsFollow = matchedProduct.robotsFollow || 'follow'
  }

  // Populate dynamic category fallback if applicable
  if (isCategory && matchedCategory) {
    pageFallback.title = `${matchedCategory.name} Services Warangal | TSquadron`
    pageFallback.description = matchedCategory.description
    pageFallback.keywords = `${matchedCategory.focusKeyword}, ${matchedCategory.name}`
  }

  // Fetch from SEO file
  const pageSeo = db.getSeoFile(pagePath, pageFallback)

  // 3. Resolve metadata
  const siteName = globalSeo.brandName || 'TSquadron'
  let title = pageSeo.title || pageFallback.title || globalSeo.siteTitle
  let description = pageSeo.description || pageFallback.description || globalSeo.defaultMetaDescription
  let keywords = pageSeo.keywords || pageFallback.keywords || globalSeo.defaultKeywords

  if (activePage === 'home') {
    title = globalSeo.siteTitle || title
    description = globalSeo.defaultMetaDescription || description
    keywords = globalSeo.defaultKeywords || keywords
  }
  
  const cleanActivePage = activePage === 'home' ? '' : activePage + '/'
  const baseCanonical = globalSeo.canonicalDomain || 'https://www.tsquadron.com'
  const canonicalUrl = pageSeo.canonicalUrl || `${baseCanonical}/${cleanActivePage}`
  
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

  // Schemas Generation
  const schemas = []

  // Always append Organization & Local Business on Home/Contact
  const isHomeOrContact = activePage === 'home' || activePage === 'contact'
  if (isHomeOrContact || true) {
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${baseCanonical}/#organization`,
      'name': globalSeo.websiteName || 'TSquadron Digital Solutions',
      'url': baseCanonical,
      'logo': globalSeo.companyLogo || ogImage,
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': globalSeo.phoneNumber || '+91 98765 43210',
        'contactType': 'customer service',
        'email': globalSeo.email || 'info@tsquadron.com'
      },
      'sameAs': [
        globalSeo.facebookLink,
        globalSeo.instagramLink,
        globalSeo.linkedinLink,
        globalSeo.twitterLink
      ].filter(Boolean)
    }
    schemas.push(orgSchema)

    const localBusiness = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${baseCanonical}/#localbusiness`,
      'name': globalSeo.brandName || 'TSquadron',
      'image': globalSeo.companyLogo || ogImage,
      'url': baseCanonical,
      'telephone': globalSeo.phoneNumber || '+91 98765 43210',
      'email': globalSeo.email || 'info@tsquadron.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': globalSeo.businessAddress || '2nd Floor, V-Square Plaza, Naimnagar Main Road, Hanamkonda',
        'addressLocality': globalSeo.city || 'Warangal',
        'addressRegion': globalSeo.state || 'Telangana',
        'postalCode': '506001',
        'addressCountry': globalSeo.country || 'India'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': globalSeo.latitude || '18.0054',
        'longitude': globalSeo.longitude || '79.5638'
      },
      'priceRange': '$$',
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '09:00',
        'closes': '18:00'
      }
    }
    schemas.push(localBusiness)
  }

  // Website Schema
  if (activePage === 'home') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${baseCanonical}/#website`,
      'name': globalSeo.websiteName || 'TSquadron',
      'url': baseCanonical,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${baseCanonical}/blog?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    })
  }

  // Breadcrumb Schema
  if (activePage !== 'home') {
    const breadcrumbs = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': baseCanonical
        }
      ]
    }
    if (isBlog && matchedBlog) {
      breadcrumbs.itemListElement.push(
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Blog',
          'item': `${baseCanonical}/blog/`
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': matchedBlog.title,
          'item': canonicalUrl
        }
      )
    } else if (isProduct && matchedProduct) {
      breadcrumbs.itemListElement.push(
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Products',
          'item': `${baseCanonical}/products/`
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': matchedProduct.name,
          'item': canonicalUrl
        }
      )
    } else if (isCategory && matchedCategory) {
      breadcrumbs.itemListElement.push(
        {
          '@type': 'ListItem',
          'position': 2,
          'name': matchedCategory.name,
          'item': canonicalUrl
        }
      )
    } else {
      breadcrumbs.itemListElement.push({
        '@type': 'ListItem',
        'position': 2,
        'name': title.split('|')[0].trim(),
        'item': canonicalUrl
      })
    }
    schemas.push(breadcrumbs)
  }

  // FAQ Schema
  if (pageSeo.faqs && pageSeo.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': pageSeo.faqs.map(f => ({
        '@type': 'Question',
        'name': f.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.a
        }
      }))
    })
  }

  // Article Schema / BlogPosting Schema
  if (isBlog && matchedBlog) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}#blogposting`,
      'headline': matchedBlog.title,
      'description': matchedBlog.excerpt,
      'image': ogImage,
      'datePublished': new Date(matchedBlog.date).toISOString() || new Date().toISOString(),
      'dateModified': new Date().toISOString(),
      'author': {
        '@type': 'Person',
        'name': pageSeo.author || matchedBlog.author || 'TSquadron Expert'
      },
      'publisher': {
        '@type': 'Organization',
        'name': globalSeo.brandName || 'TSquadron',
        'logo': {
          '@type': 'ImageObject',
          'url': globalSeo.companyLogo || ogImage
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonicalUrl
      }
    })
  }

  // Product Schema
  if (isProduct && matchedProduct) {
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': matchedProduct.name,
      'description': matchedProduct.description,
      'image': matchedProduct.images || [ogImage],
      'sku': matchedProduct.sku,
      'brand': {
        '@type': 'Brand',
        'name': matchedProduct.brand
      },
      'offers': {
        '@type': 'Offer',
        'url': canonicalUrl,
        'priceCurrency': matchedProduct.currency || 'INR',
        'price': matchedProduct.price,
        'availability': `https://schema.org/${matchedProduct.availability || 'InStock'}`
      }
    }
    if (matchedProduct.ratingValue) {
      productSchema.aggregateRating = {
        '@type': 'AggregateRating',
        'ratingValue': matchedProduct.ratingValue,
        'reviewCount': matchedProduct.reviewCount || 1
      }
    }
    if (matchedProduct.reviews && matchedProduct.reviews.length > 0) {
      productSchema.review = matchedProduct.reviews.map(r => ({
        '@type': 'Review',
        'author': { '@type': 'Person', 'name': r.author },
        'reviewRating': { '@type': 'Rating', 'ratingValue': r.rating },
        'datePublished': r.date,
        'reviewBody': r.body
      }))
    }
    schemas.push(productSchema)
  }

  // Service Schema
  if (isService) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': title.split('|')[0].trim(),
      'provider': {
        '@type': 'LocalBusiness',
        'name': globalSeo.brandName || 'TSquadron'
      },
      'description': description,
      'areaServed': globalSeo.city || 'Warangal'
    })
  }

  // Allow custom overrides to schema from pages settings
  if (pageSeo.schemaEnabled !== false && pageSeo.schema) {
    try {
      const parsed = JSON.parse(pageSeo.schema)
      schemas.push(parsed)
    } catch (e) {
      console.error('Failed to parse custom user schema', e)
    }
  }

  const manifestObj = {
    name: globalSeo.websiteName || 'TSquadron',
    short_name: globalSeo.brandName || 'TSquadron',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: globalSeo.favicon || '/logo.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: globalSeo.favicon || '/logo.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
  const manifestDataUri = `data:application/manifest+json,${encodeURIComponent(JSON.stringify(manifestObj))}`

  return (
    <Helmet>
      {/* Primary HTML Meta Standards */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={robotsRule} />
      <meta name="author" content={siteName} />
      <meta name="application-name" content={siteName} />
      <meta name="theme-color" content="#ffffff" />

      {/* Static Favicons resolved from index.html */}

      {/* Apple Mobile Web App Details */}
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Google Webmaster Verification */}
      {globalSeo.googleSearchConsole && (
        <meta name="google-site-verification" content={globalSeo.googleSearchConsole} />
      )}

      {/* Bing Webmaster Verification */}
      {globalSeo.bingWebmaster && (
        <meta name="msvalidate.01" content={globalSeo.bingWebmaster} />
      )}

      {/* Open Graph Tags */}
      <meta property="og:type" content={isBlog ? 'article' : 'website'} />
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

      {/* Google Tag Manager Container Script (Header) */}
      {globalSeo.googleTagManager && (
        <script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${globalSeo.googleTagManager}');
          `}
        </script>
      )}

      {/* Google Analytics GA4 config script */}
      {globalSeo.googleAnalyticsId && (
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${globalSeo.googleAnalyticsId}`} />
      )}
      {globalSeo.googleAnalyticsId && (
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${globalSeo.googleAnalyticsId}');
          `}
        </script>
      )}

      {/* Facebook Pixel script integration */}
      {globalSeo.facebookPixelId && (
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
            fbq('init', '${globalSeo.facebookPixelId}');
            fbq('track', 'PageView');
          `}
        </script>
      )}

      {/* Dynamic JSON-LD Structured Schema Injections */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}


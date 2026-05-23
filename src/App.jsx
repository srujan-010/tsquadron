import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import Home from './pages/Home'
import Services from './pages/Services'
import Blog from './pages/Blog'
import About from './pages/About'
import Contact from './pages/Contact'
import DigitalMarketing from './pages/DigitalMarketing'
import SearchEngineOptimization from './pages/SearchEngineOptimization'
import SocialMediaMarketing from './pages/SocialMediaMarketing'
import PpcServices from './pages/PpcServices'
import EmailMarketing from './pages/EmailMarketing'
import OnlineReputationManagement from './pages/OnlineReputationManagement'
import WebDesigning from './pages/WebDesigning'
import UiUxDesigning from './pages/UiUxDesigning'
import BlogDetailsVisibility from './pages/BlogDetailsVisibility'
import BlogDetailsReputation from './pages/BlogDetailsReputation'
import BlogDetailsUiUx from './pages/BlogDetailsUiUx'
import BlogDetailsEmail from './pages/BlogDetailsEmail'
import BlogDetailsLink from './pages/BlogDetailsLink'
import BlogDetailsSocial from './pages/BlogDetailsSocial'
import BlogDetailsSystem from './pages/BlogDetailsSystem'
import BlogDetailsFundamentals from './pages/BlogDetailsFundamentals'
import BlogDetailsReputationSocial from './pages/BlogDetailsReputationSocial'
import BlogDetailsEmailAi from './pages/BlogDetailsEmailAi'
import DigitalMarketingTraining from './pages/DigitalMarketingTraining'
import PrivacyPolicy from './pages/TsLegalHub.jsx'

// Admin Views
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLeads from './pages/admin/AdminLeads'
import AdminBlogs from './pages/admin/AdminBlogs'
import AdminServices from './pages/admin/AdminServices'
import AdminTestimonials from './pages/admin/AdminTestimonials'
import AdminMedia from './pages/admin/AdminMedia'
import AdminSettings from './pages/admin/AdminSettings'
import AdminAppointments from './pages/admin/AdminAppointments'
import Chatbot from './components/Chatbot/Chatbot'

// SEO Components and Virtual Crawlers Interceptors
import { HelmetProvider } from 'react-helmet-async'
import SEOHelmet from './components/SEOHelmet'
import VirtualSitemap from './components/VirtualSitemap'
import VirtualRobots from './components/VirtualRobots'

// SEO Suite Admin Pages
import AdminSeoGlobal from './pages/admin/AdminSeoGlobal.jsx'
import AdminSeoPages from './pages/admin/AdminSeoPages.jsx'
import AdminSeoBlogs from './pages/admin/AdminSeoBlogs.jsx'
import AdminSeoTechnical from './pages/admin/AdminSeoTechnical.jsx'
import AdminSeoSitemap from './pages/admin/AdminSeoSitemap.jsx'
import AdminSeoSchema from './pages/admin/AdminSeoSchema.jsx'

export default function App() {
  const getInitialPage = () => {
    const path = window.location.pathname
    if (path === '/sitemap.xml' || path === '/sitemap.xml/') {
      return 'sitemap.xml'
    }
    if (path === '/robots.txt' || path === '/robots.txt/') {
      return 'robots.txt'
    }
    if (path.startsWith('/admin')) {
      const cleanAdminPath = path.replace(/\/$/, '')
      return cleanAdminPath.substring(1) || 'admin'
    }
    if (path === '/digital-marketing-training-in-warangal/' || path === '/digital-marketing-training-in-warangal') {
      return 'digital-marketing-training-in-warangal'
    }
    if (path === '/privacy-policy/' || path === '/privacy-policy') {
      return 'privacy-policy'
    }
    if (path === '/digital-marketing-agency-hanamkonda/' || path === '/digital-marketing-agency-hanamkonda') {
      return 'digital-marketing-agency-hanamkonda'
    }
    if (path === '/seo-company-in-hanamkonda/' || path === '/seo-company-in-hanamkonda') {
      return 'seo-company-in-hanamkonda'
    }
    if (path === '/social-media-marketing/' || path === '/social-media-marketing' || path === '/services/social-media-marketing/' || path === '/services/social-media-marketing') {
      return 'social-media-marketing'
    }
    if (path === '/ppc-services-in-hanamkonda/' || path === '/ppc-services-in-hanamkonda' || path === '/services/pay-per-click/' || path === '/services/pay-per-click') {
      return 'ppc-services-in-hanamkonda'
    }
    if (path === '/email-marketing-company-hanamkonda/' || path === '/email-marketing-company-hanamkonda' || path === '/services/email-marketing-company-hanamkonda/' || path === '/services/email-marketing-company-hanamkonda') {
      return 'email-marketing-company-hanamkonda'
    }
    if (path === '/online-reputation-management-services-hanumakonda/' || path === '/online-reputation-management-services-hanumakonda' || path === '/services/online-reputation-management/' || path === '/services/online-reputation-management') {
      return 'online-reputation-management-services-hanumakonda'
    }
    if (path === '/web-designing-development-company-hanumakonda/' || path === '/web-designing-development-company-hanumakonda' || path === '/services/web-designing-company-hyderabad/' || path === '/services/web-designing-company-hyderabad' || path === '/services/web-designing-company-hanamkonda/' || path === '/services/web-designing-company-hanamkonda') {
      return 'web-designing-development-company-hanumakonda'
    }
    if (path === '/ui-ux-designing-company-hanamkonda/' || path === '/ui-ux-designing-company-hanamkonda' || path === '/ui-ux-designing-company-hyderabad/' || path === '/ui-ux-designing-company-hyderabad' || path === '/services/ui-ux-designing/' || path === '/services/ui-ux-designing') {
      return 'ui-ux-designing-company-hanamkonda'
    }
    if (path === '/blog/types-of-visibility-in-digital-marketing/' || path === '/blog/types-of-visibility-in-digital-marketing') {
      return 'blog-details-visibility'
    }
    if (path === '/blog/impact-of-online-reputation-management-on-seo/' || path === '/blog/impact-of-online-reputation-management-on-seo') {
      return 'blog-details-reputation'
    }
    if (path === '/blog/impact-of-ui-ux-design-on-user-engagement/' || path === '/blog/impact-of-ui-ux-design-on-user-engagement') {
      return 'blog-details-uiux'
    }
    if (path === '/blog/future-of-email-marketing/' || path === '/blog/future-of-email-marketing') {
      return 'blog-details-email'
    }
    if (path === '/blog/top-10-link-building-strategies/' || path === '/blog/top-10-link-building-strategies') {
      return 'blog-details-link'
    }
    if (path === '/blog/future-of-social-media-marketing/' || path === '/blog/future-of-social-media-marketing') {
      return 'blog-details-social'
    }
    if (path === '/blog/role-of-design-systems-in-web-development/' || path === '/blog/role-of-design-systems-in-web-development') {
      return 'blog-details-system'
    }
    if (path === '/blog/fundamentals-of-ui-ux-design/' || path === '/blog/fundamentals-of-ui-ux-design') {
      return 'blog-details-fundamentals'
    }
    if (path === '/blog/role-of-social-media-in-online-reputation-management/' || path === '/blog/role-of-social-media-in-online-reputation-management') {
      return 'blog-details-reputation-social'
    }
    if (path === '/blog/role-of-ai-in-email-marketing/' || path === '/blog/role-of-ai-in-email-marketing') {
      return 'blog-details-email-ai'
    }
    if (path === '/about-us/' || path === '/about-us' || path === '/about/' || path === '/about') {
      return 'about-us'
    }
    const cleanPath = path.replace(/^\/|\/$/g, '')
    return cleanPath || 'home'
  }

  const [activePage, setActivePage] = useState(getInitialPage)
  const [selectedServiceId, setSelectedServiceId] = useState(null)

  useEffect(() => {
    let path = '/'
    if (activePage === 'digital-marketing-training-in-warangal') {
      path = '/digital-marketing-training-in-warangal/'
    } else if (activePage === 'privacy-policy') {
      path = '/privacy-policy/'
    } else if (activePage === 'digital-marketing-agency-hanamkonda') {
      path = '/digital-marketing-agency-hanamkonda/'
    } else if (activePage === 'seo-company-in-hanamkonda') {
      path = '/seo-company-in-hanamkonda/'
    } else if (activePage === 'social-media-marketing') {
      path = '/social-media-marketing/'
    } else if (activePage === 'ppc-services-in-hanamkonda') {
      path = '/ppc-services-in-hanamkonda/'
    } else if (activePage === 'email-marketing-company-hanamkonda') {
      path = '/email-marketing-company-hanamkonda/'
    } else if (activePage === 'online-reputation-management-services-hanumakonda') {
      path = '/online-reputation-management-services-hanumakonda/'
    } else if (activePage === 'web-designing-development-company-hanumakonda') {
      path = '/web-designing-development-company-hanumakonda/'
    } else if (activePage === 'ui-ux-designing-company-hanamkonda') {
      path = '/ui-ux-designing-company-hanamkonda/'
    } else if (activePage === 'blog-details-visibility') {
      path = '/blog/types-of-visibility-in-digital-marketing/'
    } else if (activePage === 'blog-details-reputation') {
      path = '/blog/impact-of-online-reputation-management-on-seo/'
    } else if (activePage === 'blog-details-uiux') {
      path = '/blog/impact-of-ui-ux-design-on-user-engagement/'
    } else if (activePage === 'blog-details-email') {
      path = '/blog/future-of-email-marketing/'
    } else if (activePage === 'blog-details-link') {
      path = '/blog/top-10-link-building-strategies/'
    } else if (activePage === 'blog-details-social') {
      path = '/blog/future-of-social-media-marketing/'
    } else if (activePage === 'blog-details-system') {
      path = '/blog/role-of-design-systems-in-web-development/'
    } else if (activePage === 'blog-details-fundamentals') {
      path = '/blog/fundamentals-of-ui-ux-design/'
    } else if (activePage === 'blog-details-reputation-social') {
      path = '/blog/role-of-social-media-in-online-reputation-management/'
    } else if (activePage === 'blog-details-email-ai') {
      path = '/blog/role-of-ai-in-email-marketing/'
    } else if (activePage === 'about' || activePage === 'about-us') {
      path = '/about-us/'
    } else if (activePage !== 'home') {
      path = `/${activePage}/`
    }
    
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path)
    }
  }, [activePage])

  useEffect(() => {
    // Reset scroll to top on page transition
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [activePage])

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      if (path === '/digital-marketing-training-in-warangal/' || path === '/digital-marketing-training-in-warangal') {
        setActivePage('digital-marketing-training-in-warangal')
      } else if (path === '/privacy-policy/' || path === '/privacy-policy') {
        setActivePage('privacy-policy')
      } else if (path === '/digital-marketing-agency-hanamkonda/' || path === '/digital-marketing-agency-hanamkonda') {
        setActivePage('digital-marketing-agency-hanamkonda')
      } else if (path === '/seo-company-in-hanamkonda/' || path === '/seo-company-in-hanamkonda') {
        setActivePage('seo-company-in-hanamkonda')
      } else if (path === '/social-media-marketing/' || path === '/social-media-marketing' || path === '/services/social-media-marketing/' || path === '/services/social-media-marketing') {
        setActivePage('social-media-marketing')
      } else if (path === '/ppc-services-in-hanamkonda/' || path === '/ppc-services-in-hanamkonda' || path === '/services/pay-per-click/' || path === '/services/pay-per-click') {
        setActivePage('ppc-services-in-hanamkonda')
      } else if (path === '/email-marketing-company-hanamkonda/' || path === '/email-marketing-company-hanamkonda' || path === '/services/email-marketing-company-hanamkonda/' || path === '/services/email-marketing-company-hanamkonda') {
        setActivePage('email-marketing-company-hanamkonda')
      } else if (path === '/online-reputation-management-services-hanumakonda/' || path === '/online-reputation-management-services-hanumakonda' || path === '/services/online-reputation-management/' || path === '/services/online-reputation-management') {
        setActivePage('online-reputation-management-services-hanumakonda')
      } else if (path === '/web-designing-development-company-hanumakonda/' || path === '/web-designing-development-company-hanumakonda' || path === '/services/web-designing-company-hyderabad/' || path === '/services/web-designing-company-hyderabad' || path === '/services/web-designing-company-hanamkonda/' || path === '/services/web-designing-company-hanamkonda') {
        setActivePage('web-designing-development-company-hanumakonda')
      } else if (path === '/ui-ux-designing-company-hanamkonda/' || path === '/ui-ux-designing-company-hanamkonda' || path === '/ui-ux-designing-company-hyderabad/' || path === '/ui-ux-designing-company-hyderabad' || path === '/services/ui-ux-designing/' || path === '/services/ui-ux-designing') {
        setActivePage('ui-ux-designing-company-hanamkonda')
      } else if (path === '/blog/types-of-visibility-in-digital-marketing/' || path === '/blog/types-of-visibility-in-digital-marketing') {
        setActivePage('blog-details-visibility')
      } else if (path === '/blog/impact-of-online-reputation-management-on-seo/' || path === '/blog/impact-of-online-reputation-management-on-seo') {
        setActivePage('blog-details-reputation')
      } else if (path === '/blog/impact-of-ui-ux-design-on-user-engagement/' || path === '/blog/impact-of-ui-ux-design-on-user-engagement') {
        setActivePage('blog-details-uiux')
      } else if (path === '/blog/future-of-email-marketing/' || path === '/blog/future-of-email-marketing') {
        setActivePage('blog-details-email')
      } else if (path === '/blog/top-10-link-building-strategies/' || path === '/blog/top-10-link-building-strategies') {
        setActivePage('blog-details-link')
      } else if (path === '/blog/future-of-social-media-marketing/' || path === '/blog/future-of-social-media-marketing') {
        setActivePage('blog-details-social')
      } else if (path === '/blog/role-of-design-systems-in-web-development/' || path === '/blog/role-of-design-systems-in-web-development') {
        setActivePage('blog-details-system')
      } else if (path === '/blog/fundamentals-of-ui-ux-design/' || path === '/blog/fundamentals-of-ui-ux-design') {
        setActivePage('blog-details-fundamentals')
      } else if (path === '/blog/role-of-social-media-in-online-reputation-management/' || path === '/blog/role-of-social-media-in-online-reputation-management') {
        setActivePage('blog-details-reputation-social')
      } else if (path === '/blog/role-of-ai-in-email-marketing/' || path === '/blog/role-of-ai-in-email-marketing') {
        setActivePage('blog-details-email-ai')
      } else if (path === '/about-us/' || path === '/about-us' || path === '/about/' || path === '/about') {
        setActivePage('about-us')
      } else {
        const cleanPath = path.replace(/^\/|\/$/g, '')
        setActivePage(cleanPath || 'home')
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const renderPage = () => {
    if (activePage === 'sitemap.xml') {
      return <VirtualSitemap />
    }
    if (activePage === 'robots.txt') {
      return <VirtualRobots />
    }

    if (activePage.startsWith('admin')) {
      const isAuthenticated = sessionStorage.getItem('tsquadron_admin_authenticated') === 'true'
      
      // Force unauthenticated users to login
      if (!isAuthenticated && activePage !== 'admin' && activePage !== 'admin/login') {
        return <AdminLogin setActivePage={setActivePage} />
      }

      switch (activePage) {
        case 'admin':
        case 'admin/login':
          if (isAuthenticated) {
             return <AdminLayout activeTab="dashboard" setActivePage={setActivePage}><AdminDashboard /></AdminLayout>
          }
          return <AdminLogin setActivePage={setActivePage} />
        case 'admin/dashboard':
          return <AdminLayout activeTab="dashboard" setActivePage={setActivePage}><AdminDashboard /></AdminLayout>
        case 'admin/leads':
          return <AdminLayout activeTab="leads" setActivePage={setActivePage}><AdminLeads /></AdminLayout>
        case 'admin/blogs':
          return <AdminLayout activeTab="blogs" setActivePage={setActivePage}><AdminBlogs /></AdminLayout>
        case 'admin/services':
          return <AdminLayout activeTab="services" setActivePage={setActivePage}><AdminServices /></AdminLayout>
        case 'admin/testimonials':
          return <AdminLayout activeTab="testimonials" setActivePage={setActivePage}><AdminTestimonials /></AdminLayout>
        case 'admin/media':
          return <AdminLayout activeTab="media" setActivePage={setActivePage}><AdminMedia /></AdminLayout>
        case 'admin/settings':
          return <AdminLayout activeTab="settings" setActivePage={setActivePage}><AdminSettings /></AdminLayout>
        case 'admin/appointments':
          return <AdminLayout activeTab="appointments" setActivePage={setActivePage}><AdminAppointments /></AdminLayout>
        case 'admin/seo-global':
          return <AdminLayout activeTab="seo-global" setActivePage={setActivePage}><AdminSeoGlobal /></AdminLayout>
        case 'admin/seo-pages':
          return <AdminLayout activeTab="seo-pages" setActivePage={setActivePage}><AdminSeoPages /></AdminLayout>
        case 'admin/seo-blogs':
          return <AdminLayout activeTab="seo-blogs" setActivePage={setActivePage}><AdminSeoBlogs /></AdminLayout>
        case 'admin/seo-technical':
          return <AdminLayout activeTab="seo-technical" setActivePage={setActivePage}><AdminSeoTechnical /></AdminLayout>
        case 'admin/seo-sitemap':
          return <AdminLayout activeTab="seo-sitemap" setActivePage={setActivePage}><AdminSeoSitemap /></AdminLayout>
        case 'admin/seo-schema':
          return <AdminLayout activeTab="seo-schema" setActivePage={setActivePage}><AdminSeoSchema /></AdminLayout>
        default:
          return <AdminLayout activeTab="dashboard" setActivePage={setActivePage}><AdminDashboard /></AdminLayout>
      }
    }

    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />
      case 'digital-marketing-training-in-warangal':
        return <DigitalMarketingTraining setActivePage={setActivePage} />
      case 'privacy-policy':
        return <PrivacyPolicy setActivePage={setActivePage} />
      case 'services':
        return <Services setActivePage={setActivePage} selectedServiceId={selectedServiceId} setSelectedServiceId={setSelectedServiceId} />
      case 'digital-marketing-agency-hanamkonda':
        return <DigitalMarketing setActivePage={setActivePage} />
      case 'seo-company-in-hanamkonda':
        return <SearchEngineOptimization setActivePage={setActivePage} />
      case 'social-media-marketing':
        return <SocialMediaMarketing setActivePage={setActivePage} />
      case 'ppc-services-in-hanamkonda':
        return <PpcServices setActivePage={setActivePage} />
      case 'email-marketing-company-hanamkonda':
        return <EmailMarketing setActivePage={setActivePage} />
      case 'online-reputation-management-services-hanumakonda':
        return <OnlineReputationManagement setActivePage={setActivePage} />
      case 'web-designing-development-company-hanumakonda':
        return <WebDesigning setActivePage={setActivePage} />
      case 'ui-ux-designing-company-hanamkonda':
        return <UiUxDesigning setActivePage={setActivePage} />
      case 'blog-details-visibility':
        return <BlogDetailsVisibility setActivePage={setActivePage} />
      case 'blog-details-reputation':
        return <BlogDetailsReputation setActivePage={setActivePage} />
      case 'blog-details-uiux':
        return <BlogDetailsUiUx setActivePage={setActivePage} />
      case 'blog-details-email':
        return <BlogDetailsEmail setActivePage={setActivePage} />
      case 'blog-details-link':
        return <BlogDetailsLink setActivePage={setActivePage} />
      case 'blog-details-social':
        return <BlogDetailsSocial setActivePage={setActivePage} />
      case 'blog-details-system':
        return <BlogDetailsSystem setActivePage={setActivePage} />
      case 'blog-details-fundamentals':
        return <BlogDetailsFundamentals setActivePage={setActivePage} />
      case 'blog-details-reputation-social':
        return <BlogDetailsReputationSocial setActivePage={setActivePage} />
      case 'blog-details-email-ai':
        return <BlogDetailsEmailAi setActivePage={setActivePage} />
      case 'blog':
        return <Blog setActivePage={setActivePage} />
      case 'about-us':
      case 'about':
        return <About setActivePage={setActivePage} />
      case 'contact':
        return <Contact setActivePage={setActivePage} />
      default:
        return <Home setActivePage={setActivePage} />
    }
  }

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 15
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  const isAdminRoute = activePage.startsWith('admin')

  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen bg-white">
        <SEOHelmet activePage={activePage} />
        {/* Dynamic drifting glow ambient overlay backgrounds */}
        {!isAdminRoute && (
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-violet/[0.03] rounded-full blur-[160px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-cyan/[0.03] rounded-full blur-[160px]" />
          </div>
        )}

        {!isAdminRoute && (
          <Navbar activePage={activePage} setActivePage={setActivePage} setSelectedServiceId={setSelectedServiceId} />
        )}

        {/* Main interactive screen frame */}
        <main className="flex-grow relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {!isAdminRoute && (
          <Footer setActivePage={setActivePage} />
        )}
        {!isAdminRoute && (
          <>
            <BackToTop />
            <Chatbot />
          </>
        )}
      </div>
    </HelmetProvider>
  )
}

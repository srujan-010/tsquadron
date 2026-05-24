import React, { useEffect } from 'react'

export default function PrivacyPolicy({ setActivePage }) {
  // Document Title update and scroll to top on mount
  useEffect(() => {
    document.title = 'Privacy Policy |    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-white text-left font-sans antialiased py-24 md:py-32">
      {/* Centered Content Container */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        
        {/* Simple Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-400 mb-6 uppercase tracking-wider">
          <button 
            onClick={() => {
              setActivePage('home')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="hover:text-slate-600 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-600">Privacy Policy</span>
        </nav>

        {/* 1. Privacy Policy Title */}
        <header className="border-b border-slate-100 pb-8 mb-10">
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#0F172A] tracking-tight mb-3">
            Privacy Policy
          </h1>
          {/* 2. Last Updated Date */}
          <p className="text-sm font-medium text-slate-500">
            Last Updated: May 21, 2026
          </p>
        </header>

        {/* Legal Policy Content */}
        <div className="space-y-8 text-base leading-relaxed text-[#475569]">
          
          {/* 3. Introduction */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0F172A]">1. Introduction</h2>
            <p>
              Welcome to <strong>TSquadron Digital Solutions</strong> ("TSquadron", "we", "us", or "our"). We are committed to protecting the privacy of our clients, students, training candidates, and website visitors. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you visit our website or use our services.
            </p>
            <p>
              By accessing our website or utilizing our professional digital marketing, search engine optimization (SEO), social media marketing (SMM), web design, or training services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* 4. Information We Collect */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0F172A]">2. Information We Collect</h2>
            <p>
              We collect information to provide better services to all our users. The types of personal information we collect include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Identity & Contact Details:</strong> Your full name, email address, telephone number, business details, or training course preferences when you submit a contact, consultation, or enrollment form.
              </li>
              <li>
                <strong>Technical & Usage Data:</strong> Your IP address, browser type, operating system, pages visited on our site, duration of visits, and referring URL coordinates.
              </li>
              <li>
                <strong>Communication Metadata:</strong> A record of any correspondence, messages, or inquiries you transmit to us directly via email, forms, or chat widgets.
              </li>
            </ul>
          </section>

          {/* 5. How We Use Information */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0F172A]">3. How We Use Information</h2>
            <p>
              TSquadron utilizes the collected data for various legitimate business purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Delivering, operating, maintaining, and protecting our website and client service platforms.</li>
              <li>Managing training applications, registrations, course modules, and student placement supports.</li>
              <li>Answering service inquiries, scheduling consulting sessions, and providing customer support.</li>
              <li>Sending newsletters, promotional communications, and relevant campaign updates.</li>
              <li>Analyzing and understanding site traffic metrics to optimize user experience and platform layout.</li>
              <li>Preventing unauthorized transactions, fraud, cyberthreats, or violations of our terms.</li>
            </ul>
          </section>

          {/* 6. Cookies Policy */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0F172A]">4. Cookies Policy</h2>
            <p>
              We use cookies and similar web tracking technologies to monitor activities on our website and hold certain user preferences. Cookies are small data files containing an anonymous unique identifier sent to your browser from a website and stored on your device.
            </p>
            <p>
              You can configure your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our website or single-page features may not function at optimum parameters.
            </p>
          </section>

          {/* 7. Third-Party Services */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0F172A]">5. Third-Party Services</h2>
            <p>
              We may employ third-party service providers (such as Google Analytics and Google Search Console) to monitor and analyze the usage of our website. These external companies collect anonymized usage details and follow their own respective privacy terms and frameworks.
            </p>
            <p>
              We do not share any directly identifiable personal contact credentials with these analytical service systems, and their data is processed strictly to improve our digital marketing outreach.
            </p>
          </section>

          {/* 8. Data Security */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0F172A]">6. Data Security</h2>
            <p>
              The security of your personal data is highly important to us. TSquadron deploys standard administrative, technical, and physical safeguards designed to protect the integrity of your information against unauthorized access, loss, destruction, alteration, or exposure.
            </p>
            <p>
              However, please note that no method of transmission over the internet, or method of electronic database storage, is completely 100% secure, and we cannot guarantee absolute absolute immunity from external cyber attacks.
            </p>
          </section>

          {/* 9. Sharing of Information */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0F172A]">7. Sharing of Information</h2>
            <p>
              TSquadron strictly does not sell, trade, rent, or lease your personal identification information to third-party marketing brokers or independent advertisers.
            </p>
            <p>
              We may share information only with trusted service partners, hosting providers, or academic affiliates who assist us in operating our website or executing our educational courses, under strict non-disclosure obligations. We may also disclose your information if required to do so by law or in response to valid legal requests by public authorities.
            </p>
          </section>

          {/* 10. User Rights */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0F172A]">8. User Rights</h2>
            <p>
              Depending on your local jurisdiction and data protection laws, you possess specific legal rights regarding your personal information. These rights include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to request access and receive a copy of your personal data stored in our records.</li>
              <li>The right to request immediate correction or updates to any inaccurate or incomplete details.</li>
              <li>The right to request the complete deletion of your personal records from our active databases.</li>
              <li>The right to restrict or object to the processing of your data for specific marketing sequences.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact our privacy representative directly at the details provided below.
            </p>
          </section>

          {/* 11. Email & Marketing Communication */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0F172A]">9. Email & Marketing Communication</h2>
            <p>
              If you opt-in to receive our publications, newsletters, or business audits, we may send you occasional update emails. You retain the absolute right to opt-out of these communications at any time.
            </p>
            <p>
              You can instantly unsubscribe by clicking the "Unsubscribe" anchor link located at the bottom of any marketing email we send you, or by contacting our team directly to request manual removal.
            </p>
          </section>

          {/* 12. Children’s Privacy */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0F172A]">10. Children’s Privacy</h2>
            <p>
              Our website and digital marketing consulting services are tailored for businesses, adult students, and professional trainees. We do not knowingly collect or request personal identifiable details from children under the age of 13.
            </p>
            <p>
              If we discover that a child under 13 has provided us with personal information, we will immediately delete such records from our hosting servers.
            </p>
          </section>

          {/* 13. External Links */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0F172A]">11. External Links</h2>
            <p>
              Our website may contain links to external sites that are not owned or operated by TSquadron. If you click on a third-party link, you will be redirected to that third party's site.
            </p>
            <p>
              We highly advise you to review the Privacy Policy of every site you visit. We hold no control over, and assume no responsibility for, the content, privacy guidelines, or practices of any external third-party sites or services.
            </p>
          </section>

          {/* 14. Policy Updates */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0F172A]">12. Policy Updates</h2>
            <p>
              We may update our Privacy Policy from time to time to align with legal compliance requirements or changes in our operational services.
            </p>
            <p>
              We will notify you of any changes by posting the updated Privacy Policy on this page and revising the "Last Updated" timestamp at the top of this document. We encourage you to review this page periodically to stay informed about how we protect your data.
            </p>
          </section>

          {/* 15. Contact Information */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-xl font-bold text-[#0F172A]">13. Contact Information</h2>
            <p>
              If you have any questions or clarifications regarding this Privacy Policy, your data rights, or our compliance practices, please contact us at:
            </p>
            <div className="bg-slate-50 rounded-2xl p-6 text-sm space-y-2 border border-slate-100 font-medium">
              <p className="font-bold text-[#0F172A] text-base">TSquadron Digital Solutions</p>
              <p>1st Floor, Green Square Plaza, opp Public Garden,</p>
              <p>Kishanpura, Hanamkonda, Warangal, Telangana 506001</p>
              <p className="pt-2">
                <strong>Email:</strong> <a href="mailto:info@tsquadron.com" className="text-indigo-600 hover:underline">info@tsquadron.com</a>
              </p>
              <p>
                <strong>Phone:</strong> <a href="tel:+919346989817" className="text-indigo-600 hover:underline">+91 9346989817</a>
              </p>
            </div>
          </section>

          {/* 16. Consent */}
          <section className="space-y-3 pt-4">
            <h2 className="text-xl font-bold text-[#0F172A]">14. Consent</h2>
            <p className="text-sm text-slate-500">
              By using our website, digital consultation portals, training modules, or marketing channels, you hereby consent to our corporate Privacy Policy and unconditionally agree to its terms.
            </p>
          </section>

        </div>

      </div>
    </div>
  )
}

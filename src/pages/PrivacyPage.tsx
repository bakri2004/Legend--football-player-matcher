import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';

export function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <SEOHead
        title="Privacy Policy – Legend"
        description="Privacy Policy for Legend Football Player Matcher."
      />

      <div className="border-b border-[#111111] pb-4 mb-6">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#111111] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs font-condensed uppercase tracking-wider text-[#555555] mt-2">
          Last updated: October 2026
        </p>
      </div>

      <div className="space-y-6 font-sans text-[#222222] leading-relaxed text-sm sm:text-base">
        {/* What we collect */}
        <div className="border border-[#111111] bg-[#FAF8F2] p-6 rounded-[2px] shadow-[3px_3px_0px_#111111]">
          <h2 className="font-serif text-2xl text-[#111111] mb-2">
            What we collect
          </h2>
          <p className="text-[#444444]">
            Legend has no accounts. Your quiz answers are used in your browser to find your match and are not stored by us. Our hosting provider may keep standard server logs, such as IP address and browser type, for security and reliability.
          </p>
        </div>

        {/* Contact */}
        <div className="border border-[#111111] bg-[#FAF8F2] p-6 rounded-[2px]">
          <h2 className="font-serif text-2xl text-[#111111] mb-2">
            Contact
          </h2>
          <p className="text-[#444444]">
            If you email us, we use your email address only to reply to you.
          </p>
        </div>

        {/* Ads and cookies */}
        <div className="border border-[#111111] bg-[#FAF8F2] p-6 rounded-[2px]">
          <h2 className="font-serif text-2xl text-[#111111] mb-2">
            Ads and cookies
          </h2>
          <p className="text-[#444444]">
            We may show ads in the future through Google AdSense. If we do, Google and its partners may use cookies to show ads based on your visits to this and other sites. You can learn how Google uses data at{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1F6F43] underline font-bold"
            >
              https://policies.google.com/technologies/ads
            </a>{' '}
            and manage your ad settings at{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1F6F43] underline font-bold"
            >
              https://adssettings.google.com
            </a>
            .
          </p>
        </div>

        {/* Changes */}
        <div className="border border-[#111111] bg-[#FAF8F2] p-6 rounded-[2px]">
          <h2 className="font-serif text-2xl text-[#111111] mb-2">
            Changes
          </h2>
          <p className="text-[#444444]">
            We may update this policy as the site changes, and the date above will change with it.
          </p>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-xs font-condensed uppercase tracking-wider text-[#111111] hover:underline"
          >
            ← Home
          </Link>
          <Link
            to="/contact"
            className="text-xs font-condensed uppercase tracking-wider text-[#1F6F43] hover:underline font-bold"
          >
            Contact us →
          </Link>
        </div>
      </div>
    </div>
  );
}

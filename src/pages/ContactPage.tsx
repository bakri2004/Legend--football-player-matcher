import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';

export function ContactPage() {
  const emailAddress = 'uppervalley249@gmail.com';
  const mailtoLink = `mailto:${emailAddress}?subject=Legend:%20correction%20or%20suggestion`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <SEOHead
        title="Contact – Legend"
        description="Contact Legend to suggest a player or submit a correction."
      />

      <div className="border-b border-[#111111] pb-4 mb-6">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#111111] tracking-tight">
          Contact
        </h1>
        <p className="text-sm sm:text-base text-[#444444] mt-2 font-sans leading-relaxed">
          Found a mistake in a player&apos;s details, or want to suggest a player? Email us and we&apos;ll take a look. Please include the player&apos;s name and, if you can, a link to a source.
        </p>
      </div>

      <div className="border border-[#111111] bg-[#FAF8F2] p-6 sm:p-8 rounded-[2px] shadow-[3px_3px_0px_#111111] space-y-5">
        <div>
          <span className="block text-xs font-condensed uppercase tracking-wider text-[#555555] font-bold mb-1">
            Email address
          </span>
          <span className="text-base sm:text-lg font-mono text-[#111111] font-semibold select-all">
            {emailAddress}
          </span>
        </div>

        <div>
          <a
            href={mailtoLink}
            className="inline-flex items-center gap-2 bg-[#1F6F43] hover:bg-[#165231] active:translate-y-0.5 text-[#FAF8F2] py-3 px-6 font-condensed uppercase tracking-wider font-bold text-sm rounded-[2px] border border-[#111111] shadow-[2px_2px_0px_#111111] transition-all cursor-pointer"
          >
            <span>Email us</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-[#111111]">
        <Link
          to="/"
          className="text-xs font-condensed uppercase tracking-wider text-[#111111] hover:underline"
        >
          ← Home
        </Link>
      </div>
    </div>
  );
}

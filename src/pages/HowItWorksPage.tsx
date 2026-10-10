import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';

export function HowItWorksPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <SEOHead
        title="How the Matcher Works – Legend"
        description="The 4-tier weighting matrix and tie-breaking methodology behind Legend player matching."
      />

      <div className="border-b border-[#111111] pb-4 mb-6">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#111111] tracking-tight">
          How the Matcher Works
        </h1>
        <p className="text-sm sm:text-base text-[#555555] mt-2 font-sans">
          A transparent 4-tier weighting matrix comparing your physical profile and playing style against verified football records.
        </p>
      </div>

      <article className="space-y-8 font-sans text-[#222222] leading-relaxed">
        {/* Tier 1: Scoring Weights */}
        <section className="border border-[#111111] bg-[#FAF8F2] p-6 rounded-[2px] shadow-[3px_3px_0px_#111111]">
          <h2 className="font-serif text-2xl text-[#111111] mb-3">
            1. The 100-Point Scoring Matrix
          </h2>
          <p className="text-sm text-[#444444] mb-4">
            Every query calculates compatibility across four independent parameters. Tactical role and playstyle carry the greatest importance:
          </p>

          <div className="space-y-3 font-condensed">
            <div className="flex items-center justify-between border-b border-[#D8D2C2] pb-2 text-sm">
              <span className="font-bold text-[#111111] uppercase">POSITION</span>
              <span className="font-bold text-[#1F6F43] text-base">40 POINTS MAX</span>
            </div>
            <p className="text-xs text-[#666666] -mt-1 font-sans">
              Exact role match grants 40 points. Tactically adjacent roles receive graduated partial scores.
            </p>

            <div className="flex items-center justify-between border-b border-[#D8D2C2] pb-2 text-sm pt-2">
              <span className="font-bold text-[#111111] uppercase">PLAYSTYLE</span>
              <span className="font-bold text-[#1F6F43] text-base">35 POINTS MAX</span>
            </div>
            <p className="text-xs text-[#666666] -mt-1 font-sans">
              Identical signature style awards 35 points. Complementary styles receive partial affinity.
            </p>

            <div className="flex items-center justify-between border-b border-[#D8D2C2] pb-2 text-sm pt-2">
              <span className="font-bold text-[#111111] uppercase">PREFERRED FOOT</span>
              <span className="font-bold text-[#1F6F43] text-base">15 POINTS MAX</span>
            </div>
            <p className="text-xs text-[#666666] -mt-1 font-sans">
              Matching preferred foot grants 15 points. Two-footed players match well with both left- and right-footed users.
            </p>

            <div className="flex items-center justify-between border-b border-[#D8D2C2] pb-2 text-sm pt-2">
              <span className="font-bold text-[#111111] uppercase">HEIGHT BRACKET</span>
              <span className="font-bold text-[#1F6F43] text-base">10 POINTS MAX</span>
            </div>
            <p className="text-xs text-[#666666] -mt-1 font-sans">
              Exact height bracket matches for 10 points; adjacent height brackets earn 5 points.
            </p>
          </div>
        </section>

        {/* Tier 2: Tie breaking */}
        <section className="border border-[#111111] bg-[#FAF8F2] p-6 rounded-[2px]">
          <h2 className="font-serif text-2xl text-[#111111] mb-2">
            2. Tie-Breaking Protocol
          </h2>
          <p className="text-sm text-[#444444] mb-3">
            In the event that two or more candidates achieve equal aggregate scores, ties are broken by historical prominence, followed by alphabetical order.
          </p>
        </section>

        {/* Tier 3: Strict Fact Policy */}
        <section className="border border-[#111111] bg-[#FAF8F2] p-6 rounded-[2px]">
          <h2 className="font-serif text-2xl text-[#111111] mb-2">
            3. Career Fact Verification Policy
          </h2>
          <p className="text-sm text-[#444444] mb-3">
            Every fact on our cards is verified against publicly available records: official tournament summaries, domestic league statistics, and international honours.
          </p>
        </section>

        <div className="pt-4 flex items-center justify-between">
          <Link
            to="/quiz"
            className="bg-[#1F6F43] hover:bg-[#165231] text-[#FAF8F2] font-condensed uppercase tracking-wider font-bold px-6 py-3 text-sm rounded-[2px] border border-[#111111] transition-colors"
          >
            Start the Quiz Now →
          </Link>
          <Link
            to="/"
            className="text-xs font-condensed uppercase tracking-wider text-[#111111] hover:underline"
          >
            Home
          </Link>
        </div>
      </article>
    </div>
  );
}

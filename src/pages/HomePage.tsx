import { Link } from 'react-router-dom';
import { LEAGUES } from '../data/players';
import { SEOHead } from '../components/SEOHead';
import { leagueToSlug } from '../utils/leagueHelper';

export function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
      <SEOHead
        title="Legend – Football Player Matcher | Which Icon Matches Your Game?"
        description="Answer 4 quick questions about your foot, height, position, and playstyle to get matched with your football legend on a collectible card."
      />

      {/* Hero Section */}
      <section className="border border-[#111111] bg-[#FAF8F2] p-6 sm:p-10 rounded-[2px] shadow-[4px_4px_0px_#111111]">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#111111] tracking-tight leading-[1.08] max-w-2xl mb-4">
          Which Football Legend Matches Your Game?
        </h1>

        <p className="text-base sm:text-lg text-[#333333] leading-relaxed max-w-2xl mb-6 font-sans">
          Answer four quick questions about your preferred foot, height, pitch position, and playstyle to discover which iconic footballer is closest to your game.
        </p>

        {/* Clean Leagues Row without trailing/dangling separators */}
        <div className="flex flex-wrap items-center gap-y-2 mb-8 text-xs font-condensed uppercase tracking-wider">
          <span className="text-[#555555] font-semibold mr-2">Leagues:</span>
          <div className="flex flex-wrap items-center">
            {LEAGUES.map((l, index) => (
              <span key={l.id} className="inline-flex items-center">
                {index > 0 && (
                  <span aria-hidden="true" className="mx-2 text-[#B0A997]">·</span>
                )}
                <Link
                  to={`/league/${leagueToSlug(l.id)}`}
                  className="text-[#111111] hover:text-[#1F6F43] hover:underline underline-offset-2 font-bold"
                >
                  {l.name}
                </Link>
              </span>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-3 bg-[#1F6F43] hover:bg-[#165231] active:translate-y-0.5 text-[#FAF8F2] py-4 px-8 font-condensed uppercase tracking-wider font-bold text-lg rounded-[2px] transition-all border border-[#111111] shadow-[2px_2px_0px_#111111]"
          >
            <span>Start Quiz</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

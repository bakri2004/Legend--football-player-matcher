import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LEAGUES } from '../data/players';
import { slugToLeague, leagueToSlug } from '../utils/leagueHelper';
import { SEOHead } from '../components/SEOHead';

const LEAGUE_INTROS: Record<string, string> = {
  'Premier League':
    "Formed in 1992, England's top flight is known for its fast tempo, physical intensity, and high-pressing football. Over the decades, it has been home to dynamic attackers, combative midfielders, and commanding defenders.",
  'La Liga':
    "Spain's premier division is renowned for technical quality, patient possession play, and tactical sophistication. Its historic clubs have long been a stage for creative playmakers, skilled dribblers, and composed finishers.",
  'Serie A':
    "Italy's top league has a rich tradition built on tactical discipline, defensive mastery, and strategic preparation. It has historically been a proving ground for legendary defenders, deep-lying playmakers, and clinical forwards.",
  'Bundesliga':
    "Germany's top flight is celebrated for direct attacking football, relentless pressing, and high defensive lines. Its playing culture values quick transitions, dynamic wing play, and physical endurance.",
  'Ligue 1':
    "France's top division is known for athleticism, tactical flexibility, and technical flair. It has continually developed and showcased explosive dribblers, versatile attackers, and energetic midfielders.",
};

export function LeaguePage() {
  const { league: leagueParam } = useParams<{ league: string }>();

  const leagueName = useMemo(() => {
    return slugToLeague(leagueParam || '');
  }, [leagueParam]);

  const leagueMeta = useMemo(() => {
    return LEAGUES.find((l) => l.id === leagueName);
  }, [leagueName]);

  if (!leagueName || !leagueMeta) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <SEOHead
          title="League Not Found – Legend"
          description="The requested league could not be found."
        />
        <div className="border-2 border-[#111111] bg-[#FAF8F2] p-8 rounded-[2px]">
          <h1 className="font-serif text-3xl text-[#111111] mb-3">League Not Found</h1>
          <p className="text-sm text-[#555555] mb-6">
            Please choose from Premier League, La Liga, Serie A, Bundesliga, or Ligue 1.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {LEAGUES.map((l) => (
              <Link
                key={l.id}
                to={`/league/${leagueToSlug(l.id)}`}
                className="bg-[#111111] text-[#FAF8F2] px-3 py-1.5 text-xs font-condensed uppercase tracking-wider rounded-[2px]"
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const introText =
    LEAGUE_INTROS[leagueName] ||
    "One of world football's premier domestic competitions, defined by rich tradition and distinct tactical style.";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <SEOHead
        title={`${leagueName} – Legend Player Matcher`}
        description={`Match your footballing traits against legends who played in ${leagueName}.`}
      />

      {/* Breadcrumb without player count */}
      <div className="border-b border-[#111111] pb-3 mb-6 text-xs font-condensed uppercase tracking-wider text-[#555555]">
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:text-[#111111]">Home</Link>
          <span>/</span>
          <span>Leagues</span>
          <span>/</span>
          <span className="text-[#111111] font-bold">{leagueName}</span>
        </div>
      </div>

      {/* League Header & Match Button Only */}
      <section className="border border-[#111111] bg-[#FAF8F2] p-6 sm:p-8 rounded-[2px] shadow-[3px_3px_0px_#111111]">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#111111] tracking-tight mb-4">
          {leagueName}
        </h1>

        <p className="text-base sm:text-lg text-[#333333] leading-relaxed font-sans mb-8">
          {introText}
        </p>

        <div>
          <Link
            to={`/quiz?league=${encodeURIComponent(leagueName)}`}
            className="inline-flex items-center gap-2 bg-[#1F6F43] hover:bg-[#165231] active:translate-y-0.5 text-[#FAF8F2] py-3.5 px-7 font-condensed uppercase tracking-wider font-bold text-base rounded-[2px] border border-[#111111] shadow-[2px_2px_0px_#111111] transition-all"
          >
            <span>Match within {leagueName}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

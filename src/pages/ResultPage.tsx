import { useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { PLAYERS, getHeightRange, Player } from '../data/players';
import { matchPlayer, MatchResult, QuizAnswers } from '../utils/matcher';
import { PlayerCard } from '../components/PlayerCard';
import { SEOHead } from '../components/SEOHead';
import { leagueToSlug } from '../utils/leagueHelper';

function getMatchExplanation(answers: QuizAnswers, player: Player): string {
  const matches: string[] = [];
  const differs: string[] = [];

  // 1. Position
  if (answers.position === player.position) {
    matches.push('position');
  } else {
    differs.push('position');
  }

  // 2. Playstyle
  if (answers.playstyle === player.playstyle) {
    matches.push('playstyle');
  } else {
    differs.push('playstyle');
  }

  // 3. Foot (matching foot or two-footed player)
  const footMatches =
    answers.foot === player.preferredFoot || player.preferredFoot === 'Both';
  if (footMatches) {
    matches.push('foot');
  } else {
    differs.push('foot');
  }

  // 4. Height
  const playerHeightRange = getHeightRange(player.heightCm);
  if (answers.height === playerHeightRange) {
    matches.push('height');
  } else {
    differs.push('height');
  }

  if (matches.length === 4) {
    return 'Matches all four of your answers.';
  }

  const formatList = (items: string[]) => {
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  if (matches.length > 0) {
    const matchPart = `Matches your ${formatList(matches)}.`;
    const diffVerb = differs.length === 1 ? 'differs' : 'differ';
    const diffPart = differs.length > 0 ? ` ${capitalize(formatList(differs))} ${diffVerb}.` : '';
    return `${matchPart}${diffPart}`;
  }

  return 'Closest overall profile in the database.';
}

export function ResultPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  const player = useMemo(() => {
    return PLAYERS.find((p) => p.slug === slug);
  }, [slug]);

  // Check state or sessionStorage
  const sessionResult = useMemo<MatchResult | null>(() => {
    const stateResult = (location.state as { result?: MatchResult })?.result;
    if (stateResult && stateResult.topMatch.slug === slug) {
      return stateResult;
    }

    try {
      const stored = sessionStorage.getItem('legend_last_result');
      if (stored) {
        const parsed: MatchResult = JSON.parse(stored);
        if (parsed.topMatch.slug === slug) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return null;
  }, [location.state, slug]);

  // Fallback for direct URL visits
  const fallbackResult = useMemo<MatchResult | null>(() => {
    if (!player) return null;
    return matchPlayer({
      foot: player.preferredFoot,
      height: getHeightRange(player.heightCm),
      position: player.position,
      playstyle: player.playstyle,
      leagueFilter: 'All',
    });
  }, [player]);

  if (!player) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <SEOHead
          title="Player Not Found – Legend"
          description="The requested football player was not found in our database."
        />
        <div className="border-2 border-[#111111] bg-[#FAF8F2] p-8 rounded-[2px] shadow-[4px_4px_0px_#111111]">
          <h1 className="font-serif text-3xl text-[#111111] mb-3">
            Player Not Found
          </h1>
          <p className="text-sm text-[#555555] mb-6">
            The player you requested does not exist in our database.
          </p>
          <Link
            to="/quiz"
            className="inline-block bg-[#1F6F43] text-[#FAF8F2] font-condensed uppercase tracking-wider font-bold px-6 py-3 text-sm rounded-[2px] border border-[#111111] hover:bg-[#165231]"
          >
            Take the Quiz →
          </Link>
        </div>
      </div>
    );
  }

  const effectiveResult = sessionResult || fallbackResult;
  const isDirectVisit = !sessionResult;

  // Runners up
  const otherMatches = effectiveResult?.runnersUp.filter((p) => p.slug !== player.slug) || [];
  const additionalFallback = PLAYERS.filter((p) => p.slug !== player.slug && p.position === player.position);
  const runnersUpList = [
    ...otherMatches,
    ...additionalFallback.filter((p) => !otherMatches.some((om) => om.slug === p.slug)),
  ].slice(0, 2);

  const fromOtherLeaguesFlags = sessionResult?.fromOtherLeaguesFlags || [false, false];

  const subtitleExplanation = sessionResult
    ? getMatchExplanation(sessionResult.answers, player)
    : `${player.name} (${player.nationality}) · ${player.position} · ${player.playstyle}`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SEOHead
        title={`${player.name} – Legend Player Matcher`}
        description={`Profile for ${player.name} (${player.position}, ${player.nationality}). ${player.shortBio}`}
      />

      {/* Top Breadcrumb */}
      <div className="border-b border-[#111111] pb-4 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs font-condensed uppercase tracking-wider">
        <div className="flex items-center gap-2 text-[#555555]">
          <Link to="/" className="hover:text-[#111111]">Home</Link>
          <span>/</span>
          <Link to="/quiz" className="hover:text-[#111111]">Quiz</Link>
          <span>/</span>
          <span className="text-[#111111] font-bold">{player.name}</span>
        </div>
      </div>

      {/* Headline & Explanation */}
      <div className="mb-6">
        <h1 className="font-serif text-3xl sm:text-5xl text-[#111111] tracking-tight">
          {isDirectVisit ? player.name : `Your closest match: ${player.name}`}
        </h1>
        <p className="text-sm sm:text-base text-[#444444] mt-1.5 max-w-2xl font-sans font-medium">
          {subtitleExplanation}
        </p>
      </div>

      {/* Main Grid: Collectible Card + Details Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: The Collectible Sticker Card */}
        <div className="lg:col-span-7">
          <PlayerCard player={player} />
        </div>

        {/* Right Column: Runners-Up & Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Take Quiz Action Card */}
          <div className="border border-[#111111] bg-[#FAF8F2] p-5 rounded-[2px] shadow-[3px_3px_0px_#111111]">
            <h3 className="font-serif text-xl text-[#111111] mb-2">
              Take the quiz
            </h3>
            <p className="text-xs text-[#555555] mb-4 font-sans leading-relaxed">
              Find which football legend matches your game in four quick questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                to="/quiz"
                className="bg-[#1F6F43] hover:bg-[#165231] text-[#FAF8F2] text-center px-4 py-2.5 font-condensed uppercase tracking-wider font-bold text-xs rounded-[2px] border border-[#111111] transition-colors"
              >
                Take the quiz
              </Link>
              {player.leagues && player.leagues.length > 0 ? (
                <Link
                  to={`/league/${leagueToSlug(player.leagues[0])}`}
                  className="bg-[#FAF8F2] hover:bg-[#EAE4D4] text-[#111111] text-center px-4 py-2.5 font-condensed uppercase tracking-wider font-bold text-xs rounded-[2px] border border-[#111111] transition-colors"
                >
                  More {player.leagues[0]} players →
                </Link>
              ) : (
                <Link
                  to="/players"
                  className="bg-[#FAF8F2] hover:bg-[#EAE4D4] text-[#111111] text-center px-4 py-2.5 font-condensed uppercase tracking-wider font-bold text-xs rounded-[2px] border border-[#111111] transition-colors"
                >
                  Browse all players →
                </Link>
              )}
            </div>
          </div>

          {/* Runners-Up Section */}
          <div className="border border-[#111111] bg-[#FAF8F2] p-5 rounded-[2px]">
            <div className="border-b border-[#111111] pb-2 mb-4 flex items-center justify-between">
              <div>
                <span className="font-condensed text-xs uppercase tracking-widest text-[#111111] font-bold block">
                  Runners-up
                </span>
                <span className="text-[11px] text-[#555555]">
                  Other players with a similar profile
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {runnersUpList.map((runner, index) => {
                const isFromOtherLeague = fromOtherLeaguesFlags[index];
                const runnerLeagueText =
                  runner.leagues && runner.leagues.length > 0
                    ? runner.leagues.join(' / ')
                    : 'Other';

                return (
                  <Link
                    key={runner.slug}
                    to={`/result/${runner.slug}`}
                    className="block border border-[#CCCCCC] hover:border-[#111111] hover:shadow-[2px_2px_0px_#111111] bg-[#FFFFFF] p-3 rounded-[2px] transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-condensed uppercase tracking-wider text-[#666666]">
                          <span className="font-bold text-[#1F6F43]">
                            {isFromOtherLeague ? 'Closest from other leagues' : `Runner-up #${index + 1}`}
                          </span>
                          <span>·</span>
                          <span>#{runner.shirtNumber}</span>
                          <span>·</span>
                          <span>{runnerLeagueText}</span>
                        </div>
                        <h4 className="font-serif text-lg text-[#111111] group-hover:text-[#1F6F43] transition-colors">
                          {runner.name}
                        </h4>
                        <p className="text-xs text-[#555555] font-condensed uppercase tracking-wider">
                          {runner.position} · {runner.playstyle} · {runner.preferredFoot} foot · {runner.heightCm} cm
                        </p>
                      </div>
                      <span className="text-sm text-[#111111] group-hover:translate-x-0.5 transition-transform">
                        →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

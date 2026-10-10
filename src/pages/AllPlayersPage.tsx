import { Link } from 'react-router-dom';
import { PLAYERS, LEAGUES, LeagueId } from '../data/players';
import { SEOHead } from '../components/SEOHead';

export function AllPlayersPage() {
  const otherPlayers = PLAYERS.filter((p) => p.leagues.length === 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SEOHead
        title="All Players – Legend Football Player Matcher"
        description="Browse the complete list of legendary football players in the Legend database, grouped by league."
      />

      {/* Header */}
      <div className="border-b border-[#111111] pb-4 mb-8">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#111111] tracking-tight">
          All Players
        </h1>
        <p className="text-sm sm:text-base text-[#555555] mt-2 font-sans">
          Every player currently available in the Legend database, grouped by the leagues they played in.
        </p>
      </div>

      <div className="space-y-10">
        {LEAGUES.map((league) => {
          const leaguePlayers = PLAYERS.filter((p) => p.leagues.includes(league.id as LeagueId));

          return (
            <section key={league.id} className="border border-[#111111] bg-[#FAF8F2] p-6 rounded-[2px] shadow-[2px_2px_0px_#111111]">
              <div className="flex items-baseline justify-between border-b border-[#111111] pb-2 mb-4">
                <h2 className="font-serif text-2xl text-[#111111]">
                  {league.name}
                </h2>
                <span className="font-condensed text-xs uppercase tracking-wider text-[#555555]">
                  {leaguePlayers.length} players
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {leaguePlayers.map((player) => (
                  <Link
                    key={`${league.id}-${player.slug}`}
                    to={`/result/${player.slug}`}
                    className="p-3 border border-[#CCCCCC] hover:border-[#111111] hover:bg-[#FFFFFF] rounded-[2px] transition-colors group block"
                  >
                    <div className="flex items-center justify-between text-[11px] font-condensed uppercase tracking-wider text-[#666666] mb-1">
                      <span className="font-bold text-[#1F6F43]">#{player.shirtNumber}</span>
                      <span>{player.nationality}</span>
                    </div>
                    <div className="font-serif text-lg text-[#111111] group-hover:text-[#1F6F43] transition-colors">
                      {player.name}
                    </div>
                    <div className="text-xs font-condensed uppercase tracking-wider text-[#666666] mt-0.5">
                      {player.position} · {player.playstyle} · {player.leagues.length > 0 ? player.leagues.join(' / ') : 'Other'}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {otherPlayers.length > 0 && (
          <section className="border border-[#111111] bg-[#FAF8F2] p-6 rounded-[2px] shadow-[2px_2px_0px_#111111]">
            <div className="flex items-baseline justify-between border-b border-[#111111] pb-2 mb-4">
              <h2 className="font-serif text-2xl text-[#111111]">
                Other leagues
              </h2>
              <span className="font-condensed text-xs uppercase tracking-wider text-[#555555]">
                {otherPlayers.length} players
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {otherPlayers.map((player) => (
                <Link
                  key={player.slug}
                  to={`/result/${player.slug}`}
                  className="p-3 border border-[#CCCCCC] hover:border-[#111111] hover:bg-[#FFFFFF] rounded-[2px] transition-colors group block"
                >
                  <div className="flex items-center justify-between text-[11px] font-condensed uppercase tracking-wider text-[#666666] mb-1">
                    <span className="font-bold text-[#1F6F43]">#{player.shirtNumber}</span>
                    <span>{player.nationality}</span>
                  </div>
                  <div className="font-serif text-lg text-[#111111] group-hover:text-[#1F6F43] transition-colors">
                    {player.name}
                  </div>
                  <div className="text-xs font-condensed uppercase tracking-wider text-[#666666] mt-0.5">
                    {player.position} · {player.playstyle} · Other
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

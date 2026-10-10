import { LeagueId } from '../data/players';

export function leagueToSlug(league: LeagueId): string {
  switch (league) {
    case 'Premier League':
      return 'premier-league';
    case 'La Liga':
      return 'la-liga';
    case 'Serie A':
      return 'serie-a';
    case 'Bundesliga':
      return 'bundesliga';
    case 'Ligue 1':
      return 'ligue-1';
  }
}

export function slugToLeague(slug: string): LeagueId | null {
  const normalized = slug.toLowerCase().trim();
  switch (normalized) {
    case 'premier-league':
    case 'premierleague':
    case 'epl':
      return 'Premier League';
    case 'la-liga':
    case 'laliga':
      return 'La Liga';
    case 'serie-a':
    case 'seriea':
      return 'Serie A';
    case 'bundesliga':
      return 'Bundesliga';
    case 'ligue-1':
    case 'ligue1':
      return 'Ligue 1';
    default:
      return null;
  }
}

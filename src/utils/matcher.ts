import { Foot, HeightRange, LeagueId, Player, PLAYERS, Position, Playstyle, getHeightRange } from '../data/players';

export interface QuizAnswers {
  foot: Foot;
  height: HeightRange;
  position: Position;
  playstyle: Playstyle;
  leagueFilter?: 'All' | LeagueId;
}

export interface MatchScore {
  player: Player;
  score: number;
}

export interface MatchResult {
  topMatch: Player;
  runnersUp: [Player, Player];
  answers: QuizAnswers;
  fromOtherLeaguesFlags?: [boolean, boolean]; // True if runner-up came from outside league
}

const HEIGHT_ORDER: HeightRange[] = [
  'Under 170 cm',
  '170-179 cm',
  '180-189 cm',
  '190 cm+',
];

function calculatePositionScore(userPos: Position, playerPos: Position): number {
  if (userPos === playerPos) return 40;

  if ((userPos === 'Striker' && playerPos === 'Winger') || (userPos === 'Winger' && playerPos === 'Striker')) {
    return 20;
  }
  if ((userPos === 'Winger' && playerPos === 'Midfielder') || (userPos === 'Midfielder' && playerPos === 'Winger')) {
    return 16;
  }
  if ((userPos === 'Midfielder' && playerPos === 'Defender') || (userPos === 'Defender' && playerPos === 'Midfielder')) {
    return 12;
  }
  if ((userPos === 'Striker' && playerPos === 'Midfielder') || (userPos === 'Midfielder' && playerPos === 'Striker')) {
    return 10;
  }
  if ((userPos === 'Defender' && playerPos === 'Goalkeeper') || (userPos === 'Goalkeeper' && playerPos === 'Defender')) {
    return 6;
  }
  return 0;
}

function calculatePlaystyleScore(userStyle: Playstyle, playerStyle: Playstyle): number {
  if (userStyle === playerStyle) return 35;

  if (
    (userStyle === 'Dribbler' && playerStyle === 'Playmaker') ||
    (userStyle === 'Playmaker' && playerStyle === 'Dribbler')
  ) {
    return 18;
  }
  if (
    (userStyle === 'Finisher' && playerStyle === 'Powerhouse') ||
    (userStyle === 'Powerhouse' && playerStyle === 'Finisher')
  ) {
    return 16;
  }
  if (
    (userStyle === 'Powerhouse' && playerStyle === 'Wall') ||
    (userStyle === 'Wall' && playerStyle === 'Powerhouse')
  ) {
    return 15;
  }
  if (
    (userStyle === 'Dribbler' && playerStyle === 'Finisher') ||
    (userStyle === 'Finisher' && playerStyle === 'Dribbler')
  ) {
    return 12;
  }
  if (
    (userStyle === 'Playmaker' && playerStyle === 'Wall') ||
    (userStyle === 'Wall' && playerStyle === 'Playmaker')
  ) {
    return 6;
  }
  return 0;
}

function calculateFootScore(userFoot: Foot, playerFoot: Foot): number {
  if (userFoot === playerFoot) return 15;
  if (playerFoot === 'Both') return 14;
  if (userFoot === 'Both') return 10;
  return 0;
}

function calculateHeightScore(userHeight: HeightRange, playerHeightCm: number): number {
  const playerRange = getHeightRange(playerHeightCm);
  if (userHeight === playerRange) return 10;

  const userIdx = HEIGHT_ORDER.indexOf(userHeight);
  const playerIdx = HEIGHT_ORDER.indexOf(playerRange);
  const diff = Math.abs(userIdx - playerIdx);

  if (diff === 1) return 5;
  return 0;
}

function scorePool(pool: Player[], answers: QuizAnswers): MatchScore[] {
  const scored: MatchScore[] = pool.map((player) => {
    const positionScore = calculatePositionScore(answers.position, player.position);
    const playstyleScore = calculatePlaystyleScore(answers.playstyle, player.playstyle);
    const footScore = calculateFootScore(answers.foot, player.preferredFoot);
    const heightScore = calculateHeightScore(answers.height, player.heightCm);

    const score = positionScore + playstyleScore + footScore + heightScore;
    return { player, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    if (b.player.fameWeight !== a.player.fameWeight) {
      return b.player.fameWeight - a.player.fameWeight;
    }
    return a.player.name.localeCompare(b.player.name);
  });

  return scored;
}

export function matchPlayer(answers: QuizAnswers): MatchResult {
  const leagueFilter = answers.leagueFilter;

  // Unrestricted match
  if (!leagueFilter || leagueFilter === 'All') {
    const allScored = scorePool(PLAYERS, answers);
    return {
      topMatch: allScored[0].player,
      runnersUp: [allScored[1].player, allScored[2].player],
      answers,
      fromOtherLeaguesFlags: [false, false],
    };
  }

  // League restricted match
  const leaguePool = PLAYERS.filter((p) => p.leagues.includes(leagueFilter));
  const leagueScored = scorePool(leaguePool, answers);

  if (leagueScored.length >= 3) {
    return {
      topMatch: leagueScored[0].player,
      runnersUp: [leagueScored[1].player, leagueScored[2].player],
      answers,
      fromOtherLeaguesFlags: [false, false],
    };
  }

  // If pool has fewer than 3 players, fill remaining runner-up slots from all players
  const allScored = scorePool(PLAYERS, answers);
  const topMatch = leagueScored[0]?.player || allScored[0].player;

  const usedSlugs = new Set<string>([topMatch.slug]);
  let runner1: Player;
  let runner1Other = false;

  if (leagueScored[1]) {
    runner1 = leagueScored[1].player;
    usedSlugs.add(runner1.slug);
  } else {
    runner1 = allScored.find((s) => !usedSlugs.has(s.player.slug))!.player;
    usedSlugs.add(runner1.slug);
    runner1Other = true;
  }

  let runner2: Player;
  let runner2Other = false;
  if (leagueScored[2]) {
    runner2 = leagueScored[2].player;
  } else {
    runner2 = allScored.find((s) => !usedSlugs.has(s.player.slug))!.player;
    runner2Other = true;
  }

  return {
    topMatch,
    runnersUp: [runner1, runner2],
    answers,
    fromOtherLeaguesFlags: [runner1Other, runner2Other],
  };
}

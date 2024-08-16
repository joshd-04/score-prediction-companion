export interface IPrediction {
  username: string;
  outcome: 'team1' | 'draw' | 'team2';
  finalScore: string;
  firstGoalScorer: string | null;
}

export interface IGame {
  discriminator: 'I-G-A-M-E-0101';
  id: number;
  team1: string;
  team2: string;
  date: string;
  formattedDate: string;
  multiplier: number;
  outcome: 'team1' | 'draw' | 'team2' | undefined;
  finalScore: string | undefined;
  firstGoalScorer: string | null | undefined;
  predictions: IPrediction[];
}

export const data: IGame[] = [
  {
    discriminator: 'I-G-A-M-E-0101',
    id: 1,
    team1: 'Liverpool',
    team2: 'Chelsea',
    date: '2024-07-26',
    formattedDate: '26/07/24',
    multiplier: 4,
    outcome: 'team1',
    finalScore: '3-1',
    firstGoalScorer: 'Salah',
    predictions: [
      {
        username: 'rare',
        outcome: 'team1',
        finalScore: '4-0',
        firstGoalScorer: 'Nunez',
      },
      {
        username: 'taa',
        outcome: 'team1',
        finalScore: '3-1',
        firstGoalScorer: 'Salah',
      },
    ],
  },
  {
    discriminator: 'I-G-A-M-E-0101',
    id: 2,
    team1: 'Liverpool',
    team2: 'Brentford',
    date: '2024-07-31',
    formattedDate: '31/07/24',
    multiplier: 1,
    outcome: undefined,
    finalScore: undefined,
    firstGoalScorer: undefined,
    predictions: [
      {
        username: 'rare',
        outcome: 'team1',
        finalScore: '4-0',
        firstGoalScorer: 'Nunez',
      },
      {
        username: 'taa',
        outcome: 'draw',
        finalScore: '0-0',
        firstGoalScorer: null,
      },
    ],
  },
];

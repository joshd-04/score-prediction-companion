import { IGame, IPrediction } from './data';

export function validateScoreline(
  score: string,
  checkForDraw: boolean = false
) {
  if (!score.includes('-')) {
    return false;
  }

  const individualScoresStr = score.split('-');
  if (individualScoresStr.length !== 2) return false;

  const individualScores = individualScoresStr.map((el) =>
    el.length > 0 ? Number(el) : NaN
  );
  let flag = false;
  individualScores.forEach((el) => {
    if (isNaN(el)) flag = true;
  });
  if (flag) return false;

  if (checkForDraw && individualScores[0] !== individualScores[1]) {
    return false;
  }

  return true;
}

export function formatShortDate(date: Date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(2);

  return `${day}/${month}/${year}`;
}

export function calculatePoints(game: IGame, prediction: IPrediction) {
  const multiplier = game.multiplier;
  let score = 0;
  if (!game.outcome || !game.finalScore || game.firstGoalScorer === undefined)
    return 0;

  if (game.outcome === prediction.outcome) score += 2 * multiplier;
  if (
    game.finalScore === prediction.finalScore ||
    game.finalScore === prediction.finalScore.split('-').reverse().join('-')
  )
    score += 3 * multiplier;
  if (
    (game.firstGoalScorer === null && prediction.firstGoalScorer === null) ||
    game.firstGoalScorer?.toLowerCase() ===
      prediction.firstGoalScorer?.toLowerCase()
  )
    score += 3 * multiplier;

  return score;
}

export function usernameIsUnique(username: string, predictions: IPrediction[]) {
  const arr = predictions.filter((pred) => {
    return pred.username.toLowerCase() === username.toLowerCase();
  });
  return arr.length === 0;
}

interface OutcomeParams {
  username: string;
  outcome: 'team1' | 'draw' | 'team2' | 'later' | '';
  finalScore: string;
  firstGoalScorer: string | null;
}

export interface PredictionErrorInterface {
  usernameError?: string;
  outcomeError?: string;
  finalScoreError?: string;
  firstGoalScorerError?: string;
}

export function validatePredictionInput(
  game: IGame,
  { username, outcome, finalScore, firstGoalScorer }: OutcomeParams,
  editing = false
): PredictionErrorInterface {
  const errorObj: PredictionErrorInterface = {};

  // Username validation
  // 1. Check that a username is given
  // 2. Check that username is unique if not editing

  if (username.length === 0) errorObj.usernameError = 'This field is required';
  else if (!editing && !usernameIsUnique(username, game.predictions))
    errorObj.usernameError = 'This user already has a prediction';

  // Outcome validation
  // 1. Check that outcome is given
  if (outcome === '') errorObj.outcomeError = 'This field is required';

  // Final score validation
  // 1. Check that final score is given
  // 2. Check that final score is valid
  // 3. If outcome is a draw, make sure scoreline resembles this
  if (finalScore === '') errorObj.finalScoreError = 'This field is required';
  else if (!validateScoreline(finalScore))
    errorObj.finalScoreError =
      'Invalid format, enter a score e.g 2-0, 2-2, 0-2. Use a hyphen to separate scores';
  else if (outcome === 'draw' && !validateScoreline(finalScore, true))
    errorObj.finalScoreError = 'This score does not resemble a draw';

  // FGS validation
  // 1. Check that a FGS is given IF final score is valid & final score is not 0-0
  if (!firstGoalScorer && finalScore !== '0-0' && validateScoreline(finalScore))
    errorObj.firstGoalScorerError = 'This field is required';

  return errorObj;
}

interface GameParams {
  team1: string;
  team2: string;
  date: string;
  outcome: '' | 'team1' | 'draw' | 'team2' | 'later';
  finalScore: string;
  firstGoalScorer: string | null;
}

export interface GameErrorInterface {
  team1Error?: string;
  team2Error?: string;
  dateError?: string;
  multiplierError?: string;
  outcomeError?: string;
  finalScoreError?: string;
  firstGoalScorerError?: string;
  genericError?: string;
}

export function validateGameInput({
  team1,
  team2,
  date,
  outcome,
  finalScore,
  firstGoalScorer,
}: GameParams): GameErrorInterface {
  const errorObj: GameErrorInterface = {};

  // team1 validation
  // 1. Make sure team1 is given
  if (team1.length === 0) errorObj.team1Error = 'This field is required';

  // team2 validation
  // 1. Make sure team2 is given
  if (team2.length === 0) errorObj.team2Error = 'This field is required';

  // date validation
  // 1. Make sure date is given
  if (date.length === 0) errorObj.dateError = 'This field is required';

  // outcome validation
  // 1. Make sure outcome is given
  if (outcome.length === 0) errorObj.outcomeError = 'This field is required';

  // final score validation
  // 1. If outcome is being given now, make sure final score is given
  // 2. If outcome is being given now, and a final score is given, make sure it's valid
  if (outcome !== 'later' && finalScore.length === 0)
    errorObj.finalScoreError = 'This field is required';
  else if (
    outcome !== 'later' &&
    finalScore.length > 0 &&
    !validateScoreline(finalScore)
  )
    errorObj.finalScoreError =
      'Invalid format, enter a score e.g 2-0, 2-2, 0-2. Use a hyphen to separate scores';

  // fgs validation
  // 1. if final score is not 0-0, and the final score is valid, and outcome is being given now, make sure fgs is given
  // 2. if the outcome is a draw, and an invalid scoreline is given e.g 1-2 !== draw, give error
  if (
    finalScore !== '0-0' &&
    validateScoreline(finalScore) &&
    outcome !== 'later' &&
    firstGoalScorer?.length === 0
  )
    errorObj.firstGoalScorerError = 'This field is required';
  else if (outcome === 'draw' && !validateScoreline(finalScore, true))
    errorObj.finalScoreError = 'This score does not resemble a draw';

  return errorObj;
}

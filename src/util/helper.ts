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
  if (game.finalScore === prediction.finalScore) score += 3 * multiplier;
  if (
    (game.firstGoalScorer === null && prediction.firstGoalScorer === null) ||
    game.firstGoalScorer?.toLowerCase() ===
      prediction.firstGoalScorer?.toLowerCase()
  )
    score += 3 * multiplier;

  return score;
}

export function usernameIsUnique(username: string, predictions: IPrediction[]) {
  console.log(`checking matches for ${username}`);
  const arr = predictions.filter((pred) => {
    console.log(pred.username);
    return pred.username.toLowerCase() === username.toLowerCase();
  });
  console.log(arr);
  return arr.length === 0;
}

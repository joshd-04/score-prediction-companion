import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import {
  CrossSVG,
  DeleteSVG,
  PersonSVG,
  QuestionBoxSVG,
  TickSVG,
} from '../components/SVGs';
import { IGame, IPrediction } from '../util/data';
import { IContext } from '../pages/Root';
import { calculatePoints } from '../util/helper';
import Tippy from '@tippyjs/react';

export default function PredictionCard({
  prediction,
  game,
}: {
  prediction: IPrediction;
  game: IGame;
}) {
  const { data, setData } = useOutletContext<IContext>();
  const { pathname } = useLocation();
  const navigator = useNavigate();

  let predWinner: string = 'Draw';

  if (prediction.outcome !== 'draw') {
    predWinner = `${game[prediction.outcome]} win`;
  }

  function handleDelete() {
    const newPredictions: IPrediction[] = game.predictions.filter(
      (pred) => pred !== prediction
    );
    const newGame: IGame = { ...game, predictions: newPredictions };

    const newData = data.map((g) => (g.id === game.id ? newGame : g));
    setData(newData);
  }

  function handleEdit() {
    console.log(pathname);
    navigator(
      `${pathname}/edit-prediction/${prediction.username.toLowerCase()}`
    );
  }

  function checkPrediction(
    actual: string | null | undefined,
    prediction: string | null
  ) {
    if (actual?.toLowerCase() === prediction?.toLowerCase()) return <TickSVG />;
    if (actual === undefined) return <QuestionBoxSVG />;
    if (actual !== prediction) return <CrossSVG />;
  }

  function checkScorePrediction(
    actual: string | undefined,
    prediction: string
  ) {
    if (actual === prediction) return <TickSVG />;

    const individualScores = prediction.split('-').filter((str) => str !== '');

    if (actual === individualScores.reverse().join('-')) return <TickSVG />;
    if (actual === undefined) return <QuestionBoxSVG />;
    if (actual !== prediction) return <CrossSVG />;
  }

  return (
    <div className="prediction-card">
      <Tippy content="Click to edit prediction">
        <div className="user-stats hoverable" onClick={handleEdit}>
          <div className="user">
            <PersonSVG />
            <h2>{prediction.username}</h2>
          </div>
          <p>{`${calculatePoints(game, prediction)} pts`}</p>
        </div>
      </Tippy>
      <Tippy content="Click to edit prediction">
        <div className="predictions hoverable" onClick={handleEdit}>
          <span>
            {checkPrediction(game.outcome, prediction.outcome)}
            <p>{predWinner}</p>
          </span>
          <span>
            {checkScorePrediction(game.finalScore, prediction.finalScore)}
            <p>Score: {prediction.finalScore}</p>
          </span>
          <span>
            {checkPrediction(game.firstGoalScorer, prediction.firstGoalScorer)}
            {<p>FGS: {prediction.firstGoalScorer || 'No one'}</p>}
          </span>
        </div>
      </Tippy>
      <button onClick={handleDelete}>
        <DeleteSVG fillColor="red" />
      </button>
    </div>
  );
}

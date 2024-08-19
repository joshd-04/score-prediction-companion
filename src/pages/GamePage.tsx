import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import PredictionCard from '../components/PredictionCard';
import { IContext } from './Root';
import NotFound from './NotFound';
import { CheckCircleSVG, ScheduleSVG } from '../components/SVGs';
import Tippy from '@tippyjs/react';
import { IGame, IPrediction } from '../util/data';
import { calculatePoints } from '../util/helper';
import usePageTitle from '../util/usePageTitle';
import { useState } from 'react';

export default function GamePage() {
  const { data, setData } = useOutletContext<IContext>();
  const navigator = useNavigate();
  const { pathname } = useLocation();
  const [docTitle, setDocTitle] = useState('Game page');
  const [docTitleReady, setDocTitleReady] = useState(false);

  usePageTitle(docTitle, [docTitle]);

  const { gameId } = useParams();
  if (gameId === undefined) return <NotFound />;
  const activeGame = data.find((game) => game.id === +gameId);
  if (activeGame === undefined) return <NotFound />;

  let outcome: string = '';
  if (activeGame.outcome === 'draw') outcome = 'Draw';
  if (activeGame.outcome === 'team1') outcome = `${activeGame.team1} win`;
  if (activeGame.outcome === 'team2') outcome = `${activeGame.team2} win`;

  if (docTitleReady === false) {
    setDocTitle(`${activeGame.team1} v ${activeGame.team2}`);
    setDocTitleReady(true);
  }
  function handleEdit() {
    if (activeGame === undefined) return;
    navigator(`/edit-game/${activeGame.id}`);
  }

  function handleAddPrediction() {
    navigator(`${pathname}/add-prediction`);
  }

  return (
    <div className="game-page">
      <div className="topbar">
        <div className="game-details">
          <h1>
            {activeGame.team1} v {activeGame.team2}
          </h1>
          <div className="game-stats">
            <p>{activeGame.formattedDate}</p>
            <p>
              {activeGame.predictions.length} prediction
              {activeGame.predictions.length !== 1 ? 's' : ''}
            </p>
          </div>
          <span className="multiplier">
            {activeGame.multiplier === 1 ? (
              'No multiplier'
            ) : (
              <b>Multiplier: x{activeGame.multiplier}</b>
            )}
          </span>
          <p>{activeGame.outcome ? `Outcome: ${outcome}` : ''}</p>
          <p>
            {activeGame.finalScore
              ? `Final score: ${activeGame.finalScore}`
              : ''}
          </p>
          <p>
            {activeGame.firstGoalScorer
              ? `First goal-scorer: ${activeGame.firstGoalScorer}`
              : ''}
          </p>
        </div>
        <Tippy content="Edit game">
          <button onClick={handleEdit}>Edit</button>
        </Tippy>
        {!activeGame.finalScore && (
          <div
            className="game-status"
            style={{ background: 'var(--blue-linear)' }}
          >
            <ScheduleSVG fillColor="white" />
            <h2>Match outcome missing</h2>
          </div>
        )}
        {activeGame.finalScore && (
          <div
            className="game-status"
            style={{ background: 'var(--green-linear)' }}
          >
            <CheckCircleSVG fillColor="white" />
            <h2>No inputs missing!</h2>
          </div>
        )}
      </div>
      <div className="main">
        <div className="prediction-section">
          <div className="top">
            <h1>Predictions</h1>
            <Tippy content="Add a prediction">
              <button onClick={handleAddPrediction}>Add</button>
            </Tippy>
          </div>
          <div className="predictions">
            {activeGame.predictions.map((pred, i) => (
              <PredictionCard prediction={pred} game={activeGame} key={i} />
            ))}
          </div>
        </div>
        <div className="points-section">
          <h1>Points leaderboard</h1>
          <PointsTable game={activeGame} />
        </div>
      </div>
      <Outlet context={{ data, setData } satisfies IContext} />
    </div>
  );
}

function compareFn(a: IPrediction, b: IPrediction, game: IGame) {
  return calculatePoints(game, b) - calculatePoints(game, a);
}

function PointsTable({ game }: { game: IGame }) {
  const predictions = game.predictions;
  if (game.predictions.length === 0)
    return (
      <p style={{ fontStyle: 'italic', marginTop: '-3rem' }}>
        No data to present
      </p>
    );
  return (
    <div className="pts-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {[...predictions]
            .sort((a, b) => compareFn(a, b, game))
            .map((pred, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td
                    style={{
                      maxWidth: '30rem',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {pred.username}
                  </td>
                  <td>{calculatePoints(game, pred)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

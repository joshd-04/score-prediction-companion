import { useOutletContext } from 'react-router-dom';
import { IContext } from './Root';
import { IGame } from '../util/data';
import { CheckCircleSVG, DeleteSVG, ScheduleSVG } from '../components/SVGs';
import { useState } from 'react';
import { calculatePoints } from '../util/helper';
import usePageTitle from '../util/usePageTitle';

export function TallyPoints() {
  const [gamesList, setGamesList] = useState<IGame[]>([]);
  const [tally, setTally] = useState<{ [key: string]: number }>({});

  const { data } = useOutletContext<IContext>();
  usePageTitle('Tally points for multiple games');

  const gamesToTally = data.filter(
    (game) => game.outcome !== undefined && game.predictions.length > 0
  );

  function handleToggleGame(game: IGame) {
    // check if game in list, if it is: remove it, else: add it

    const isSelected = gamesList.includes(game);

    if (isSelected) {
      setGamesList((prev) => prev.filter((g) => g.id !== game.id));
    } else {
      setGamesList((prev) => [...prev, game]);
    }
  }

  function handleTally() {
    const userTally: { [key: string]: number } = {};

    gamesList.forEach((game) => {
      game.predictions.forEach((pred) => {
        const points = calculatePoints(game, pred);
        if (isNaN(userTally[pred.username.toLowerCase()]))
          return (userTally[pred.username.toLowerCase()] = points);
        return (userTally[pred.username.toLowerCase()] += points);
      });
    });

    setTally(userTally);

    // const x = Object.entries(userTally);
    // x.sort((a, b) => b[1] - a[1]);
    // console.log(Object.fromEntries(x));
  }

  // go over each game
  // -> go over each prediction
  // -> add points of user to tally

  function handleClose() {
    setTally({});
  }

  return (
    <div className="points-tally-page">
      {Object.keys(tally).length !== 0 && (
        <div className="modal-blur tally" style={{ zIndex: 99 }}>
          <button className="tally-close" onClick={handleClose}>
            Close
          </button>
          <PointsTable tally={tally} />
        </div>
      )}
      <div className="top-bar">
        <h1>Select the games to tally</h1>
        <button disabled={gamesList.length === 0} onClick={handleTally}>
          Next
        </button>
      </div>
      <div className="tally-games">
        {gamesToTally.length > 0 ? (
          gamesToTally.map((game) => (
            <GameSimplified
              key={game.id}
              game={game}
              handleToggleGame={handleToggleGame}
              gamesList={gamesList}
            />
          ))
        ) : (
          <h1>Nothing to tally</h1>
        )}
      </div>
    </div>
  );
}

interface GameProps {
  game: IGame;
  handleToggleGame: (game: IGame) => void;
  gamesList: IGame[];
}

function GameSimplified({ game, handleToggleGame, gamesList }: GameProps) {
  const isSelected = gamesList.includes(game);

  return (
    <div
      className={`game-preview hoverable ${isSelected && 'selected'}`}
      onClick={() => handleToggleGame(game)}
    >
      <div>
        {game.finalScore ? (
          <div>
            <CheckCircleSVG fillColor="#45C139" />
          </div>
        ) : (
          <div>
            <ScheduleSVG fillColor="#399DC1" />
          </div>
        )}

        <div className="game-details">
          <h2>
            {game.team1} v {game.team2}
          </h2>
          <div>
            <p>{game.formattedDate}</p>
            <p>
              {game.predictions.length} prediction
              {game.predictions.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>
      <span>
        <button disabled style={{ cursor: 'not-allowed' }}>
          <DeleteSVG fillColor="red" className="del" />
        </button>
      </span>
    </div>
  );
}
/* 
{Object.keys(
            Object.fromEntries(
              Object.entries(tally).sort((a, b) => b[1] - a[1])
            )
          ).map((key) => (
            <h1>
              {key} - {tally[key]}
            </h1>
          ))}
            */
function PointsTable({
  tally,
}: {
  tally: {
    [key: string]: number;
  };
}) {
  return (
    <div className="pts-table big-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(
            Object.fromEntries(
              Object.entries(tally).sort((a, b) => b[1] - a[1])
            )
          ).map((key, i) => (
            <tr>
              <td>{i + 1}</td>
              <td
                style={{
                  maxWidth: '30rem',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {key}
              </td>
              <td>{tally[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

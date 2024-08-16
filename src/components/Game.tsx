import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { IGame } from '../util/data';
import { CheckCircleSVG, DeleteSVG, ScheduleSVG } from './SVGs';
import { useNavigate } from 'react-router-dom';

export default function Game({
  game,
  handleDeleteGame,
}: {
  game: IGame;
  handleDeleteGame: (gameId: number) => void;
}) {
  const navigator = useNavigate();

  function handleSelectGame() {
    navigator(`/game/${game.id}`);
  }

  return (
    <div className="game-preview ">
      <div>
        {game.finalScore ? (
          <Tippy content="You have given the match outcome">
            <div>
              <CheckCircleSVG fillColor="#45C139" />
            </div>
          </Tippy>
        ) : (
          <Tippy content="You still need to give the match outcome">
            <div>
              <ScheduleSVG fillColor="#399DC1" />
            </div>
          </Tippy>
        )}
        <Tippy content="Click to open">
          <div className="game-details hoverable" onClick={handleSelectGame}>
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
        </Tippy>
      </div>
      <span>
        <Tippy content="Delete this game and all its predictions">
          <button onClick={() => handleDeleteGame(game.id)}>
            <DeleteSVG fillColor="red" className="del" />
          </button>
        </Tippy>
      </span>
    </div>
  );
}

import { useNavigate, useOutletContext } from 'react-router-dom';
import Game from '../components/Game';
// import { data } from '../util/data';
import { IContext } from './Root';
import usePageTitle from '../util/usePageTitle';

export default function Home() {
  usePageTitle('Score Prediction Companion');

  return (
    <div className="home">
      <Main />
      <About />
    </div>
  );
}

function Main() {
  return (
    <div className="main">
      <TopBar />
      <div className="games-list">
        <GamesList />
      </div>
    </div>
  );
}

function TopBar() {
  const navigator = useNavigate();
  function handleAddGame() {
    navigator('/add-game');
  }

  return (
    <div className="topbar">
      <h1>Your games and predictions</h1>
      <button onClick={handleAddGame}>+</button>
    </div>
  );
}

function GamesList() {
  const { data, setData } = useOutletContext<IContext>();

  function handleDeleteGame(gameId: number) {
    const question = confirm('Are you sure you want to delete this game?');
    if (!question) return;
    const newData = data.filter((game) => game.id !== gameId);
    setData(newData);
  }

  return data.map((game, i) => {
    return <Game key={i} game={game} handleDeleteGame={handleDeleteGame} />;
  });
  // return <Game />;
}

function About() {
  return (
    <div className="about">
      <h1>About this website</h1>
      <h2>What is it for?</h2>
      <p>
        This website was made as a companion to a football related score
        prediction game that took place in a Discord server As the member count
        rose, it kept getting harder to keep up with everyone, so this aims to
        automate most of the process
      </p>
      <h2>The prediction system</h2>
      <p>
        A user can predict a football match by providing the outcome e.g.
        Liverpool win, draw etc, by providing the final score line, and the
        first goal scorer (if they do not predict 0-0)
      </p>
    </div>
  );
}

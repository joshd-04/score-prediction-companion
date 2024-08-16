import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { HomeFillSVG, HomeSVG } from '../components/SVGs';
import { useEffect, useState } from 'react';
import { IGame } from '../util/data';

export interface IContext {
  data: IGame[];
  setData: React.Dispatch<React.SetStateAction<IGame[]>>;
}

export default function Root() {
  const [data, setData] = useState<IGame[]>([]);
  const [readyToSave, setReadyToSave] = useState(false);

  const navigator = useNavigate();
  const location = useLocation();
  const { gameId } = useParams();

  // @ts-expect-error any type is not unexpected
  function isGameObject(Obj): Obj is IGame {
    return Obj.discriminator === 'I-G-A-M-E-0101';
  }

  // save to local storage

  useEffect(() => {
    if (!readyToSave) {
      setReadyToSave(true);
      return;
    }

    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  // get from local storage

  useEffect(() => {
    const raw = localStorage.getItem('data');
    if (raw === null) return;

    try {
      const data = JSON.parse(raw);
      const isValid = isGameObject(data[0]);
      if (isValid) {
        setData(data);
      }
    } catch {
      console.log('There was an error fetching data from local storage');
    }
  }, []);

  function handleClick() {
    if (location.pathname !== '/') navigator('/');
  }

  let caption: string = '';
  if (location.pathname === '/' || location.pathname === '/home')
    caption = 'Home';
  if (location.pathname === '/add-game') caption = 'Add new game';
  if (location.pathname.startsWith('/game') && gameId !== undefined) {
    const game = data.find((game) => game.id === +gameId);
    if (game === undefined) {
      caption = 'Game';
    } else {
      caption = `${game.team1} v ${game.team2}`;
    }
  }
  if (location.pathname.startsWith('/edit-game')) caption = 'Editing game';

  return (
    <>
      <div className="home-icon">
        <div onClick={handleClick} className="hoverable">
          {location.pathname === '/' ? <HomeFillSVG /> : <HomeSVG />}
        </div>
        <p>{caption}</p>
      </div>
      <Outlet context={{ data, setData } satisfies IContext} />
    </>
  );
}

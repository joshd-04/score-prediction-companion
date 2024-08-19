import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Root from './pages/Root';
import AddGame from './pages/AddGame';
import GamePage from './pages/GamePage';
import NotFound from './pages/NotFound';
import EditGame from './pages/EditGame';
import AddPrediction from './pages/AddPrediction';
import EditPrediction from './pages/EditPrediction';
import { TallyPoints } from './pages/TallyPoints';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/tally-points',
        element: <TallyPoints />,
      },
      {
        path: '/add-game',
        element: <AddGame />,
      },
      {
        path: '/game/:gameId',
        element: <GamePage />,
        children: [
          {
            path: 'add-prediction',
            element: <AddPrediction />,
          },
          {
            path: 'edit-prediction/:username',
            element: <EditPrediction />,
          },
        ],
      },
      {
        path: '/edit-game/:gameId',
        element: <EditGame />,
      },
    ],
  },
]);

export default router;

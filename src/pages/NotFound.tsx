import { Link } from 'react-router-dom';
import usePageTitle from '../util/usePageTitle';

export default function NotFound() {
  usePageTitle('404 Not Found')
  return (
    <>
      <h1>404 Page not found!</h1>
      <h2>
        Click <Link to="/">here</Link> to go back home
      </h2>
    </>
  );
}

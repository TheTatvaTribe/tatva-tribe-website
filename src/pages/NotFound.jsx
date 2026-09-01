import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="notfound">
    <p className="notfound-code" aria-hidden="true">४०४</p>
    <h1>This path isn&rsquo;t on the map</h1>
    <p>
      The page you were looking for has moved or never existed. Let&rsquo;s get you back to the
      tribe.
    </p>
    <Link to="/" className="btn btn-primary">
      Back to home
    </Link>
  </section>
);

export default NotFound;

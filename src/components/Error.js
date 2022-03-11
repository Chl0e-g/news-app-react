import ArticlesNav from "./ArticlesNav";
import { Link } from "react-router-dom";

function Error({ error }) {
  return (
    <>
      <ArticlesNav />
      <main className="uk-container uk-container-small uk-position-center uk-text-center">
        {!error ? (
          <h2>This page doesn't exist</h2>
        ) : (
            <>
          <h2>Something went wrong</h2>
          <p className="uk-text-lead">{error.status}: {error.data.msg}</p></>
        )}
        <Link to="/">
          <p className="uk-text-lead">Take me home</p>
        </Link>
      </main>
    </>
  );
}

export default Error;

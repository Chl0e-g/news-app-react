import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { fetchUserByUsername } from "../api/users";

function Header() {
  const { setLoggedInUser } = useContext(UserContext);
  useEffect(() => {
    fetchUserByUsername("tickle122").then((user) => {
      setLoggedInUser(user);
    });
  }, [setLoggedInUser]);

  return (
    <header
      uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky"
      className="secondary-colour-background uk-padding-remove"
    >
      <div className="uk-navbar-item">
        <h1 className="uk-navbar-nav uk-text-default uk-text-uppercase primary-colour-text">
          News & Views
        </h1>
      </div>
    </header>
  );
}

export default Header;

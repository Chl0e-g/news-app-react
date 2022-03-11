import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { fetchTopics } from "../api/topics";
import MobileNav from "./MobileNav";

function ArticlesNav() {
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState("all");
  const [width, setWidth] = useState(window.innerWidth);
  const { loggedInUser } = useContext(UserContext);

  //mobile screen size detection
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //fetch topics
  useEffect(() => {
    fetchTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  //setting current topic
  const { topic, articleId } = useParams();
  useEffect(() => {
    setCurrentTopic(() => {
      if (!topic && articleId) return "";
      if (!topic) return "all";
      return topic;
    });
  }, [topic, articleId]);

  //adding active styling to nav items
  const activeClass = (current) => {
    if (currentTopic === current) return "uk-active";
    return "";
  };

  return width > 640 ? (
    <nav
      className="uk-background-default uk-flex uk-width-1-1 uk-box-shadow-small"
      uk-sticky="offset: 40"
    >
      <ul className="uk-subnav uk-subnav-divider uk-text-uppercase uk-margin-large-left uk-margin-top">
        <li className={activeClass("all")} key="all">
          <Link to="/">all</Link>
        </li>
        {topics.map((topic) => {
          return (
            <li className={activeClass(topic.slug)} key={topic.slug}>
              <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
            </li>
          );
        })}
      </ul>
      <div className="uk-flex-1">
        <img
          src={loggedInUser.avatar_url}
          alt={loggedInUser.author}
          className="uk-margin-right uk-margin-small-bottom uk-border-circle nav-avatar uk-align-right uk-margin-small-top"
          uk-tooltip={`Logged in as ${loggedInUser.username}`}
        />
      </div>
    </nav>
  ) : (
    <MobileNav activeClass={activeClass} currentTopic={currentTopic}>
      <ul className="uk-text-uppercase uk-nav uk-height-1-1 uk-flex uk-flex-column uk-flex-bottom uk-flex-right uk-list uk-list-divider">
        <li><div className="">
        <img
          src={loggedInUser.avatar_url}
          alt={loggedInUser.author}
          className="uk-margin-small-bottom uk-border-circle nav-avatar uk-align-right uk-margin-small-top"
          uk-tooltip={`Logged in as ${loggedInUser.username}`}
        />
      </div></li>
        <li className={activeClass("all")} key="all">
          <Link to="/">all</Link>
        </li>
        {topics.map((topic) => {
          return (
            <li className={activeClass(topic.slug)} key={topic.slug}>
              <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
            </li>
          );
        })}
      </ul>
    </MobileNav>
  );
}

export default ArticlesNav;

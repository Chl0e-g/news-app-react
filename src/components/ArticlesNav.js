import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTopics } from "../api/topics";

function ArticlesNav({ currentTopic, setCurrentTopic }) {
  const [topics, setTopics] = useState([]);

  //fetch topics
  useEffect(() => {
    fetchTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  //setting current topic
  const { topic } = useParams();
  setCurrentTopic(() => {
    if (!topic) return "all";
    return topic;
  });

  //adding active styling to nav items
  const activeClass = (current) => {
    if (currentTopic === current) return "uk-active";
    return "";
  };

  return (
    <nav className="uk-background-default" uk-sticky="offset: 80">
      <ul className="uk-subnav uk-subnav-divider uk-text-uppercase uk-margin-large-left">
        <li className={activeClass('all')}>
          <Link to="/">
            all
          </Link>
        </li>
        {topics.map((topic) => {
          return (
            <li className={activeClass(topic.slug)}>
              <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default ArticlesNav;

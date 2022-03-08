import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTopics } from "../api/topics";

function ArticlesNav() {
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState("all");

  //fetch topics
  useEffect(() => {
    fetchTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  //setting current topic
  const { topic } = useParams();
  useEffect(() => {
    setCurrentTopic(() => {
      if (!topic) return "all";
      return topic;
    });
  }, [topic]);
  
  //adding active styling to nav items
  const activeClass = (current) => {
    if (currentTopic === current) return "uk-active";
    return "";
  };

  return (
    <nav className="uk-background-default " uk-sticky="offset: 40">
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
      <hr className="uk-margin-remove" />
    </nav>
  );
}

export default ArticlesNav;

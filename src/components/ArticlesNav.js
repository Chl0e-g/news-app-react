import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTopics } from "../api/topics";
import MobileNav from "./MobileNav";

function ArticlesNav() {
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState("all");
  const [width, setWidth] = useState(window.innerWidth);

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
    if (currentTopic === current) return "uk-margin-small-bottom uk-active";
    return "uk-margin-small-bottom";
  };

  return width > 640 ? (
    <nav className="uk-background-default uk-flex" uk-sticky="offset: 40">
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
    </nav>
  ) : (<MobileNav activeClass={activeClass} currentTopic={currentTopic}>
  <ul className="uk-text-uppercase uk-nav uk-height-1-1 uk-flex uk-flex-column uk-flex-bottom uk-flex-right">
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
</MobileNav>)
}

export default ArticlesNav;

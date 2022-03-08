import "./App.css";
import { Routes, Route, useParams } from "react-router-dom";
import Header from "./components/Header";
import ArticlesNav from "./components/ArticlesNav";
import ArticlesList from "./components/ArticlesList";
import SingleArticle from "./components/SingleArticle";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="topics/:topic" element={<ArticlesList />} />
        <Route path="article/:articleId" element={<SingleArticle />} />
      </Routes>
    </>
  );
}

export default App;

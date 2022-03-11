import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticlesList from "./components/ArticlesList";
import SingleArticle from "./components/SingleArticle";
import Error from "./components/Error";
import {UserContext} from "./context/UserContext";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Header />
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="topics/:topic" element={<ArticlesList />} />
          <Route path="article/:articleId" element={<SingleArticle />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;

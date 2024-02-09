import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTopics } from "./api";
import Articles from "./components/Articles";
// import TopicsArticles from "./components/TopicsArticles";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import SingleArticle from "./components/SingleArticle";
import UsersList from "./components/UsersList";
import UserContext from "./contexts/UserContexts";
import "./App.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState();
  const [topicsURL, setTopicsURL] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopics()
      .then((topics) => {
        setTopicsURL(topics);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Header />
        <NavBar />
        <Routes>
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/*" element={<Articles topicsURL={topicsURL} />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;

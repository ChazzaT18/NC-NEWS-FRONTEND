import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTopics } from "./api";
import ErrorComponent from "./components/ErrorComponent";
import Articles from "./components/Articles";
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
          <Route path="*" element={<ErrorComponent error="Page Not Found" />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;

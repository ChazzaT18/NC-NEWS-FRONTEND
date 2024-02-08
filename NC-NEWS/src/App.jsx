import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Articles from "./components/Articles";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import SingleArticle from "./components/SingleArticle";
import UsersList from "./components/UsersList";
import UserContext from "./contexts/UserContexts";
import "./App.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState();

  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;

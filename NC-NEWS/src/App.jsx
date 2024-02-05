import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import SingleArticle from "./components/SingleArticle";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </>
  );
}

export default App;

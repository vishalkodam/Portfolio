import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar/navbar.js";
import WritingArticle from "../components/Writings/WritingArticle.jsx";
import AstroBackground from "../components/AstroBackground.jsx";

export default function WritingArticlePage() {
  const { slug } = useParams();

  return (
    <>
      <AstroBackground />
      <div className="App-main">
        <Navbar />
        <WritingArticle slug={slug} />
      </div>
    </>
  );
}

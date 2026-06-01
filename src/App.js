import { LazyMotion, domAnimation } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import WritingsPage from "./pages/WritingsPage.jsx";
import WritingArticlePage from "./pages/WritingArticlePage.jsx";

function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/writings" element={<WritingsPage />} />
            <Route path="/writings/:slug" element={<WritingArticlePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LazyMotion>
  );
}

export default App;

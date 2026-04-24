import Navbar from "./components/NavBar/navbar.js";
import Intro from "./components/Intro/intro.js";
import About from "./components/About/About.js";
import Contact from "./components/Contact/contact.js";
import Projects from "./components/Projects/projects.js";
import ChatbotWidget from "./components/Chatbot/ChatbotWidget.jsx";
import ScrollReveal from "./components/ScrollReveal.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import AstroBackground from "./components/AstroBackground.jsx";

function App() {
  return (
    <div className="App">
        <AstroBackground />
        <div className="App-main">
          <ScrollProgress />
          <Navbar/>
          <ScrollReveal><Intro/></ScrollReveal>
          <ScrollReveal delay={0.06}><About/></ScrollReveal>
          <ScrollReveal delay={0.08}><Projects/></ScrollReveal>
          <ScrollReveal delay={0.1}><Contact/></ScrollReveal>
          <ChatbotWidget/>
        </div>
    </div>
  );
}

export default App;
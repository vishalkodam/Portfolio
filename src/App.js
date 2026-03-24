import Navbar from "./components/NavBar/navbar.js";
import Intro from "./components/Intro/intro.js";
import About from "./components/About/About.js";
import Contact from "./components/Contact/contact.js";
import Projects from "./components/Projects/projects.js";
import ChatbotWidget from "./components/Chatbot/ChatbotWidget.jsx";

function App() {
  return (
    <div className="App">
        <Navbar/>
        <Intro/>
        <About/>
        <Projects/>
        <Contact/>
        <ChatbotWidget/>
    </div>
  );
}

export default App;
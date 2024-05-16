import Navbar from "./components/NavBar/navbar.js";
import Intro from "./components/Intro/intro.js";
import About from "./components/About/About.js";
import Contact from "./components/Contact/contact.js";

function App() {
  return (
    <div className="App">
        <Navbar/>
        <Intro/>
        <About/>
        <Contact/>
    </div>
  );
}

export default App;
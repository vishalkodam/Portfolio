import Navbar from "./components/NavBar/navbar";
import Intro from "./components/Intro/intro";
import About from "./components/About/About";
import Contact from "./components/Contact/contact";

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
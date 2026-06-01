import Navbar from "../components/NavBar/navbar.js";
import Writings from "../components/Writings/Writings.js";
import AstroBackground from "../components/AstroBackground.jsx";

export default function WritingsPage() {
  return (
    <>
      <AstroBackground />
      <div className="App-main">
        <Navbar />
        <Writings />
      </div>
    </>
  );
}

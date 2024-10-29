import React, { useState } from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import lightModeIcon from '../../assets/Sun.svg'; // Import light mode icon
import { Link } from 'react-scroll';
import menu from '../../assets/menu.png';
import resumeFile from '../../assets/Resume.pdf';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Function to show the motivational message
  const showMotivationalMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 5000); // Hide the message after 5 seconds
  };

  return (
    <nav className="navbar">
      <button className="toggleBtn" onClick={showMotivationalMessage}>
        <img
          src={lightModeIcon}
          alt="Light Mode"
          className="toggleIcon"
        />
        {showMessage && (
          <div className="message">On a Job HUNT! 🏹</div>
        )}
      </button>

      <div className="desktopMenu">
        <Link activeClass='active' to='intro' spy={true} smooth={true} offset={-100} duration={500} className="desktopMenuListItem">Home</Link>
        <Link activeClass='active' to='about' spy={true} smooth={true} offset={-100} duration={500} className="desktopMenuListItem">About</Link>
        <Link activeClass='active' to='projects' spy={true} smooth={true} offset={-100} duration={500} className="desktopMenuListItem">Projects</Link>
        <Link activeClass='active' to='contact' spy={true} smooth={true} offset={-100} duration={500} className="desktopMenuListItem">Contact Me</Link>
      </div>

      <button className="desktopMenuBtn" onClick={() => { window.open(resumeFile, "_blank") }}>
        <FontAwesomeIcon icon={faDownload} className="downloadIcon" />
        <span>Resume</span>
      </button>

      <img src={menu} alt='Menu' className='mobMenu' onClick={() => setShowMenu(!showMenu)} />
      <div className="navMenu" style={{ display: showMenu ? 'flex' : 'none' }}>
        <Link activeClass='active' to='intro' spy={true} smooth={true} offset={-100} duration={500} className="listItem" onClick={() => setShowMenu(false)}>Home</Link>
        <Link activeClass='active' to='about' spy={true} smooth={true} offset={-100} duration={500} className="listItem" onClick={() => setShowMenu(false)}>About</Link>
        <Link activeClass='active' to='projects' spy={true} smooth={true} offset={-100} duration={500} className="listItem" onClick={() => setShowMenu(false)}>Projects</Link> 
        <Link activeClass='active' to='contact' spy={true} smooth={true} offset={-100} duration={500} className="listItem" onClick={() => setShowMenu(false)}>Contact</Link>
        <a href={resumeFile} className="listItem" download="resume.pdf" onClick={() => setShowMenu(false)}>Resume</a>
      </div>
    </nav>
  );
};

export default Navbar;

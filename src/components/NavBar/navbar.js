import React, { useState } from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import lightModeIcon from '../../assets/Sun.svg'; // Import light mode icon
import darkModeIcon from '../../assets/Moon.svg'; // Import dark mode icon
import { Link } from 'react-scroll';
import menu from '../../assets/menu.png';
import resumeFile from '../../assets/Resume.pdf';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Additional logic to toggle dark mode styles across the application
    // For example, you might want to update CSS variables or apply different classes
  };

  return (
    <nav className="navbar">
      <button className="toggleBtn" onClick={toggleDarkMode}>
        <img
          src={isDarkMode ? darkModeIcon : lightModeIcon}
          alt={isDarkMode ? 'Dark Mode' : 'Light Mode'}
          className="toggleIcon"
        />
      </button>

      <div className="desktopMenu">
        <Link activeClass='active' to='intro' spy={true} smooth={true} offset={-100} duration={500} className="desktopMenuListItem">Home</Link>
        <Link activeClass='active' to='about' spy={true} smooth={true} offset={-100} duration={500} className="desktopMenuListItem">About</Link>
        <Link activeClass='active' to='contact' spy={true} smooth={true} offset={-100} duration={500} className="desktopMenuListItem">Contact Me</Link>
      </div>

      {/* Resume button */}
      <button className="desktopMenuBtn" onClick={() => { window.open(resumeFile, "_blank") }}>
        <FontAwesomeIcon icon={faDownload} className="downloadIcon" />
        <span>Resume</span>
      </button>

      {/* Menubar */}
      <img src={menu} alt='Menu' className='mobMenu' onClick={() => setShowMenu(!showMenu)} />
      <div className="navMenu" style={{ display: showMenu ? 'flex' : 'none' }}>
        <Link activeClass='active' to='intro' spy={true} smooth={true} offset={-100} duration={500} className="listItem" onClick={() => setShowMenu(false)}>Home</Link>
        <Link activeClass='active' to='about' spy={true} smooth={true} offset={-100} duration={500} className="listItem" onClick={() => setShowMenu(false)}>About</Link>
        <Link activeClass='active' to='contact' spy={true} smooth={true} offset={-100} duration={500} className="listItem" onClick={() => setShowMenu(false)}>Contact</Link>
        <a href={resumeFile} className="listItem" download="resume.pdf" onClick={() => setShowMenu(false)}>Resume</a>
      </div>
    </nav>
  );
};

export default Navbar;

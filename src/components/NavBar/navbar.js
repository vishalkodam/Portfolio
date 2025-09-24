import React, { useEffect, useState } from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import lightModeIcon from '../../assets/Sun.svg'; // Light mode icon
import darkModeIcon from '../../assets/Moon.svg'; // Dark mode icon
import { Link } from 'react-scroll';
import menu from '../../assets/menu.png';
import resumeFile from '../../assets/Resume.pdf';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enableDark = stored ? stored === 'dark' : prefersDark;
    if (enableDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <nav className="navbar">
      <button
        className="toggleBtn"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={isDark}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <div className={`themeSwitch ${isDark ? 'is-dark' : ''}`}>
          <img src={lightModeIcon} alt="" className="themeSwitch__icon themeSwitch__icon--sun" aria-hidden="true" />
          <img src={darkModeIcon} alt="" className="themeSwitch__icon themeSwitch__icon--moon" aria-hidden="true" />
          <div className="themeSwitch__thumb" />
        </div>
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

import React, { useEffect, useState } from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import lightModeIcon from '../../assets/Sun.svg';
import darkModeIcon from '../../assets/Moon.svg';
import { Link as ScrollLink } from 'react-scroll';
import { NavLink, useLocation } from 'react-router-dom';
import menu from '../../assets/menu.png';
import resumeFile from '../../assets/Resume.pdf';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const onWritingsPage = location.pathname.includes('/writings');

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

  const closeMenu = () => setShowMenu(false);

  const desktopNavClass = ({ isActive }) =>
    isActive ? 'desktopMenuListItem active' : 'desktopMenuListItem';

  const mobileNavClass = ({ isActive }) =>
    isActive ? 'listItem active' : 'listItem';

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
        {onWritingsPage ? (
          <>
            <NavLink to="/" className={desktopNavClass} end>Home</NavLink>
            <NavLink to="/writings" className={desktopNavClass}>Writings</NavLink>
          </>
        ) : (
          <>
            <ScrollLink activeClass='active' to='intro' spy={true} smooth={true} offset={-100} duration={750} easing="easeInOutCubic" className="desktopMenuListItem">Home</ScrollLink>
            <ScrollLink activeClass='active' to='about' spy={true} smooth={true} offset={-100} duration={750} easing="easeInOutCubic" className="desktopMenuListItem">About</ScrollLink>
            <ScrollLink activeClass='active' to='projects' spy={true} smooth={true} offset={-100} duration={750} easing="easeInOutCubic" className="desktopMenuListItem">Projects</ScrollLink>
            <NavLink to="/writings" className={desktopNavClass}>Writings</NavLink>
            <ScrollLink activeClass='active' to='contact' spy={true} smooth={true} offset={-100} duration={750} easing="easeInOutCubic" className="desktopMenuListItem">Contact Me</ScrollLink>
          </>
        )}
      </div>

      <a
        className="desktopMenuBtn"
        href={resumeFile}
        download="Vishal_Kodam_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faDownload} className="downloadIcon" />
        <span>Resume</span>
      </a>

      <button
        type="button"
        className="mobMenu"
        onClick={() => setShowMenu(!showMenu)}
        aria-label={showMenu ? 'Close menu' : 'Open menu'}
        aria-expanded={showMenu}
      >
        <img src={menu} alt="" aria-hidden="true" />
      </button>
      <div className="navMenu" style={{ display: showMenu ? 'flex' : 'none' }}>
        {onWritingsPage ? (
          <>
            <NavLink to="/" className={mobileNavClass} end onClick={closeMenu}>Home</NavLink>
            <NavLink to="/writings" className={mobileNavClass} onClick={closeMenu}>Writings</NavLink>
          </>
        ) : (
          <>
            <ScrollLink activeClass='active' to='intro' spy={true} smooth={true} offset={-100} duration={750} easing="easeInOutCubic" className="listItem" onClick={closeMenu}>Home</ScrollLink>
            <ScrollLink activeClass='active' to='about' spy={true} smooth={true} offset={-100} duration={750} easing="easeInOutCubic" className="listItem" onClick={closeMenu}>About</ScrollLink>
            <ScrollLink activeClass='active' to='projects' spy={true} smooth={true} offset={-100} duration={750} easing="easeInOutCubic" className="listItem" onClick={closeMenu}>Projects</ScrollLink>
            <NavLink to="/writings" className={mobileNavClass} onClick={closeMenu}>Writings</NavLink>
            <ScrollLink activeClass='active' to='contact' spy={true} smooth={true} offset={-100} duration={750} easing="easeInOutCubic" className="listItem" onClick={closeMenu}>Contact</ScrollLink>
          </>
        )}
        <a
          href={resumeFile}
          className="listItem"
          download="Vishal_Kodam_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
        >
          Resume
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

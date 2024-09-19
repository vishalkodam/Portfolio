import React from 'react';
import './intro.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
// import btnImg from '../../assets/hireme.jpg'
// import {Link} from 'react-scroll';

const Intro = () => {
  return (
    <section id = "intro">
        <div className="introContent">
            <span className="introName">Vishal Kodam</span>
            <p className= "introPara">TECH --Innovation | Research | Social</p>
            <div className='links'>
              <a href="https://www.linkedin.com/in/vishal-kodam/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} alt='LinkedIn' className='link' />
              </a>
              <a href="https://github.com/vishalkodam" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} alt='Github' className='link' />
              </a>
              <a href="https://www.instagram.com/__vishal017" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} alt='Instagram' className='link' />
              </a>
            </div>
            {/* <Link><button className='btn'><img src={btnImg} alt="Hire Me" className='btnImg'/>Hire Me</button></Link> */}
        </div>
    </section>
  )
}

export default Intro;
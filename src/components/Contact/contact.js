import React from 'react';
import './contact.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  return (
    <section id='contactPage'>
      <div id='contact'>
        <h1 className='contactPageTitle'>Contact Me</h1>
        <span className='contactDesc'>Please fill out the form for possible collaborations/any work opportunities</span>
        <form className='contactForm'>
          <input type='text' className='name' placeholder='Your Name'/>
          <input type='email' className='email' placeholder='Your E-mail'/>
          <textarea className='msg' name='message' rows="6" placeholder='Your Message'></textarea>
          <button type='submit' value='Send' className='submitBtn'>Submit</button>
        </form>
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
      </div>
    </section>
  );
}

export default Contact;

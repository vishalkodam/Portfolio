import React, { useRef, useState } from 'react';
import './contact.css';
import emailjs from '@emailjs/browser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram, faHackerrank } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_my220yv', 'template_rpsgjw1', form.current, '4UInwFJTISwQ8i21P',)
      .then(
        () => {
          console.log('SUCCESS!');
          setSubmitted(true); // Set submitted to true after successful submission
          setTimeout(() => {
            setSubmitted(false); // Reset submitted state after 3 seconds
          }, 3000);
          form.current.reset(); // Clear the form fields
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <section id='contactPage'>
      <div id='contact'>
        <h1 className='contactPageTitle'>Contact Me</h1>
        <span className='contactDesc'>Please fill out the form for possible collaborations/any work opportunities</span>
        <form className='contactForm' ref={form} onSubmit={sendEmail}>
          <input type='text' className='name' placeholder='Your Name' name= 'your_name'/>
          <input type='email' className='email' placeholder='Your E-mail' name= 'your_email'/>
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
          <a href="https://leetcode.com/u/Vishal_kodam/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faHackerrank} alt='Leetcode' className='link' />
          </a>
        </div>
        {submitted && <div className="submittedMessage">Form submitted successfully!</div>}
      </div>
    </section>
  );
}

export default Contact;

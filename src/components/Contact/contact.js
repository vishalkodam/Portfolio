import React from 'react';
import './contact.css';
import LinkedIn from '../../assets/linkedin.jpg'
import Github from '../../assets/github.png'
import Instagram from '../../assets/instagram.jpg'


const Contact = () => {
  return (
    <section id='contactPage'>
        <div id='contact'>
            <h1 className='contactPageTitle'>Contact Me</h1>
            <span className='contactDesc'>Please fill out the form for possible collaborations/any work opportunities</span>
            <form className='contactForm'></form>
                <input type='text' className='name' placeholder='Your Name'/>
                <input type='email' className='email'placeholder='Your E-mail'/>
                <textarea className='msg' name='message'rows="6" placeholder='Your Message'></textarea>
                <button type= 'submit' value='Send' className='submitBtn'>Submit</button>
                <div className='links'>
                    <img src={LinkedIn} alt='LinkedIn' className='link' />
                    <img src={Github} alt='Github' className='link' />
                    <img src={Instagram} alt='Instagram' className='link' />
                </div>
        </div>
    </section>
  )
}

export default Contact

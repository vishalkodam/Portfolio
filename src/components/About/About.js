import React from 'react';
import './about.css';

const About = () => {
  return (
    <section id='about'>
      <span className='aboutTitle'>Want to know about ME???</span>
      <div className='aboutDescription'>
        <p>
          Hello and welcome! I'm <span className='highlightedName'>VISHAL KODAM</span>, a passionate computer science enthusiast driven by a desire to innovate and create positive change through technology. Currently pursuing my Master's degree in Computer Science at SUNY Polytechnic Institute, I am on a mission to push the boundaries of what's possible in the world of technology.
        </p>
        
        <p>
          My academic journey at <span className='highlightedName'>SUNY Polytechnic Institute</span> has been an exhilarating exploration of the vast landscape of computer science. From delving into fundamental concepts to embracing cutting-edge technologies, I have cultivated a deep passion for leveraging technology to solve real-world problems. With a focus on advanced frameworks and methodologies, I am constantly seeking opportunities to expand my knowledge and skills in areas such as software engineering, web development and machine learning.
        </p>
        <p>
          My journey into the realm of technology began with earning a Bachelor of Technology in Electronics and Communications from the esteemed <span className='highlightedName'>IIIT-N</span>. During my undergraduate studies, I built a robust foundation in electronics principles, telecommunications, and signal processing. Although my background provided valuable insights into hardware systems, I transitioned to computer science for my master's degree, driven by a desire to explore new horizons and embrace emerging technologies. I recognized the transformative impact of software-driven innovation and its potential to address complex challenges across diverse domains. This transition was fueled by my innate curiosity, coupled with a passion for technology and a relentless pursuit of knowledge. Additionally, I have published a research paper titled "<a href='https://ieeexplore.ieee.org/document/XXXXXX' target='_blank' rel='noopener noreferrer'>Covid-19 Detection from X-ray Scans Using Alexa</a>" on IEEE, underscoring my commitment to research and innovation in the field of computer science.
        </p>
      </div>
    </section>
  );
}

export default About;

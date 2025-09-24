import React from 'react';
import './about.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faRobot, faServer, faCogs } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <section id='about'>
      <span className='aboutTitle'>Want to know about ME???</span>
      <div className='aboutDescription'>
        <p>
          Hello! I'm <span className='highlightedName'>Vishal Kodam</span>, a Master's student in Computer Science at <span className='highlightedName'>SUNY Polytechnic Institute</span>, specializing in machine learning, advanced algorithms, and optimization strategies. With a strong foundation in both hardware and software, I aim to bridge the gap between technology and impactful solutions.
        </p>

        <p>
          My journey began with a Bachelor’s in Electronics and Communication from <span className='highlightedName'>IIIT-N</span>, where I gained valuable insights into hardware systems. Transitioning to computer science, I have developed expertise in building AI-driven applications, data analysis, and DevOps solutions. My research on "<a href='https://ieeexplore.ieee.org/abstract/document/9781958' target='_blank' rel='noopener noreferrer'><em>Covid-19 Detection from X-ray Scans Using Alexa</em></a>," published by IEEE, showcases my commitment to creating meaningful technological advancements.
        </p>
      </div>

      <h2 className='skillBarsHeading'>What I do?</h2>
      <div className="skillBars">
        <div className="skillBar"> 
          <FontAwesomeIcon icon={faChartBar} className='skillBarIcon' />
          <div className='skillBarText'>
            <h2>Data Analysis</h2>
            <p>Skilled in extracting valuable insights from complex datasets, leveraging statistical methods and machine learning techniques to inform decision-making.</p>
          </div>
        </div>

        <div className="skillBar"> 
          <FontAwesomeIcon icon={faRobot} className='skillBarIcon' />
          <div className='skillBarText'>
            <h2>LLM Mastery</h2>
            <p>Developed tools using advanced language models like OpenAI’s GPT, integrating AI for efficient document indexing and query analysis.</p>
          </div>
        </div>

        <div className="skillBar"> 
          <FontAwesomeIcon icon={faServer} className='skillBarIcon' /> 
          <div className='skillBarText'>
            <h2>Machine Learning</h2>
            <p>Experienced in applying neural networks and advanced algorithms to solve complex problems across various domains, with a focus on practical, data-driven solutions.</p>
          </div>
        </div>

        <div className="skillBar"> 
          <FontAwesomeIcon icon={faCogs} className='skillBarIcon' /> 
          <div className='skillBarText'>
            <h2>DevOps</h2>
            <p>Hands-on experience with cloud services and automation, including AWS and RESTful services, enhancing workflow efficiency and reducing errors.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
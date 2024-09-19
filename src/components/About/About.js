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
        Hello! I'm <span className='highlightedName'>Vishal Kodam</span>, a passionate computer science enthusiast currently pursuing my Master's in Computer Science at <span className='highlightedName'>SUNY Polytechnic Institute </span>. I’m driven to innovate and push technological boundaries, with a focus on leveraging cutting-edge solutions to create real-world impact.
        </p>

        <p>
        My journey began with a Bachelor’s in Electronics and Communications from <span className='highlightedName'>IIIT-N</span>, providing valuable insights into hardware systems. Since transitioning to computer science, I’ve published research on "<a href='https://ieeexplore.ieee.org/document/XXXXXX' target='_blank' rel='noopener noreferrer'><em>Covid-19 Detection from X-ray Scans Using Alexa</em></a>"on IEEE, further solidifying my commitment to impactful technology.
        </p>
      </div>

      <h2 className='skillBarsHeading'>What I do?</h2>
      <div className="skillBars">
        <div className="skillBar"> 
          <FontAwesomeIcon icon={faChartBar} className='skillBarIcon' />
          <div className='skillBarText'>
            <h2>Data Analysis</h2>
            <p> Skilled in extracting valuable insights from complex datasets, leveraging statistical methods and machine learning techniques to inform decision-making.</p>
          </div>
        </div>

        <div className="skillBar"> 
          <FontAwesomeIcon icon={faRobot} className='skillBarIcon' />
          <div className='skillBarText'>
            <h2>LLM Mastery</h2>
            <p> Developed tools using advanced language models like OpenAI’s GPT, integrating AI for efficient document indexing and query analysis.</p>
          </div>
        </div>

        <div className="skillBar"> 
          <FontAwesomeIcon icon={faServer} className='skillBarIcon' /> 
          <div className='skillBarText'>
            <h2>Machine Learning</h2>
            <p> Experienced in applying neural networks and advanced algorithms to solve complex problems across various domains, with a focus on practical, data-driven solutions.</p>
          </div>
        </div>

        <div className="skillBar"> 
          <FontAwesomeIcon icon={faCogs} className='skillBarIcon' /> 
          <div className='skillBarText'>
            <h2>DevOps</h2>
            <p> Hands-on experience with cloud services and automation, including AWS and RESTful services, enhancing workflow efficiency and reducing errors.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
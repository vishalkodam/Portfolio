import React from 'react';
import './projects.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Projects = () => {
  const projects = [
    {
      title: "JIRA AI Assistant - Conversational AI for Streamlined Task Management",
      description: "Built an intelligent chatbot using LangChain, OpenAI APIs, and Streamlit for UI to streamline JIRA project management. Integrated vector embeddings for task execution and enhanced usability via text-based commands.",
      technologies: "Python, JIRA API, Langchain, OpenAI API, Streamlit, NLP",
      github: "https://github.com/vishalkodam/JIRA_AI_BOT"
    },
    {
      title: "News Research Tool with LLM",
      description: "Developed an intelligent news research tool using LangChain and OpenAI APIs to analyze news articles and provide insights. Implemented vector embeddings for efficient information retrieval.",
      technologies: "Python, LangChain, OpenAI API, ChromaDB",
      github: "https://github.com/vishalkodam/News_Research_LLM"
    },
    {
      title: "COVID-19 Detection through Alexa",
      description: "Created an Alexa-integrated CNN model for COVID-19 detection from chest X-rays. Published in IEEE conference proceedings. Achieved significant accuracy in early detection.",
      technologies: "Python, TensorFlow, AWS Lambda, Alexa Skills Kit",
      github: "https://github.com/vishalkodam/Detecting-Covid19-using-CNN-through-Alexa"
    },
    {
      title: "Retail Q&A System with PaLM",
      description: "Built an intelligent retail query system using Google's PaLM API to handle customer inquiries and provide accurate product information.",
      technologies: "Python, Google PaLM API, LangChain",
      github: "https://github.com/vishalkodam/Retail_QA_palm"
    },
    {
      title: "GenAI Social Media Analysis",
      description: "Conducted comparative analysis between Twitter user comments and ChatGPT responses on Generative AI topics, providing insights into public perception versus AI understanding.",
      technologies: "Python, NLP, Twitter API, OpenAI API",
      github: "https://github.com/vishalkodam/Twitter-User-Comments-vs.-ChatGPT-Responses-on-GenAI"
    },
    {
      title: "AWS DeepRacer Reward Function",
      description: "Implemented and optimized reward functions for AWS DeepRacer, achieving improved autonomous racing performance through reinforcement learning.",
      technologies: "Python, AWS DeepRacer, Reinforcement Learning",
      github: "https://github.com/vishalkodam/awsdeepracer_reward"
    },
    {
      title: "Diabetes Detection System", 
      description: "Developed a machine learning model for early diabetes detection using patient health metrics, helping in preventive healthcare.",
      technologies: "Python, Scikit-learn, Pandas, NumPy",
      github: "https://github.com/vishalkodam/Diabetes_Detection"
    },
    {
      title: "Personal Portfolio Website",
      description: "Designed and developed a responsive portfolio website using React, showcasing projects and professional experience with modern UI/UX principles.",
      technologies: "React, JavaScript, CSS, HTML",
      github: "https://github.com/vishalkodam/Portfolio"
    }
  ];

  return (
    <section id="projects">
      <h1 className="projectsTitle">My Projects</h1>
      <div className="projectsTable">
        {projects.map((project, index) => (
          <div className="projectRow" key={index}>
            <div className="projectContent">
              <h2 className="projectTitle">{project.title}</h2>
              <p className="projectDescription">{project.description}</p>
              <p className="projectTech"><strong>Technologies:</strong> {project.technologies}</p>
            </div>
            <div className="projectLinks">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="githubButton">
                <FontAwesomeIcon icon={faGithub} className="githubIcon" />
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;



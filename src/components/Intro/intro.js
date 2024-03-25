import React from 'react';
import './intro.css';
import btnImg from '../../assets/hireme.jpg'
import {Link} from 'react-scroll';

const Intro = () => {
  return (
    <section id = "intro">
        <div className="introContent">
            <span className="introName">Vishal Kodam</span>
            <p className= "introPara">TECH --Innovation | Research | Social</p>
            <Link><button className='btn'><img src={btnImg} alt="Hire Me" className='btnImg'/>Hire Me</button></Link>
        </div>
    </section>
  )
}

export default Intro;
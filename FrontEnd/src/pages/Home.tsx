import React from 'react';
import '../assets/styles/style.css';
import Hero from '../assets/images/Hero.jpg';
import Logo from '../assets/images/Logo.png';

export const Home = () => {
  return (
    <>
            <header>
        <div className="header-left">
            <div className="logo-photo">
                <img width="80px" src={Logo}/>
            </div>
            <div className="logo-text">
                <h3>EncoHealth AI</h3>
                </div>
        </div>
        <div className="header-right" >
            <nav>
                <ul>
                    <li>
                        <a className='text-[22px]' href=" ">Login</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

    <section className="intro">
        <div className="intro-mid">
            <h1>Empowering Rural Health with AI</h1>
            <p>
              Bridging the gab between advanced healthcare technology and rural communities through innovative AI solutions.
            </p>

            <button>Get Started</button>
        </div>
    </section>

    <div className="row3_main">
        <h3>Innovative AI Solutions</h3>
        <div className="row3_box_main">
          <div  className="row3_box_inside">
              <h4>Smart Facility Mapping</h4>
              <p>AI-powered geospatial analysis for optimal healthcare resource distribution in rural areas.</p>
          </div>
          <div className="row3_box_inside">
              <h4>Predictive Health Trends</h4>
              <p>Advanced algorithms forecasting rural health patterns and resources needs with unprecedented accuracy</p>
          </div>
          <div className="row3_box_inside">
              <h4>AI-Assisted Diagnostics</h4>
             <p> Empowering rural healthcare providers with cutting-edge support tools.</p>
          </div>
        </div>
  </div>

  <div className="row4_main">
      <p id="our_impact_para">Our Impact</p>
      <div className="row4_box_main">
          <div className="row4_box_content_div">
              <h3>500+</h3>
              <p>Rural Facilities Enhanced</p>
          </div>
          <div className="row4_box_content_div">
              <h3>1M+</h3>
              <p>Lives Inproved Annually</p>
          </div>
          <div className="row4_box_content_div">
              <h3>30%</h3>
              <p>Increase in Care Efficiency</p>
          </div>
      </div>
  </div>
  <div className="row5_main">
      <h2>Join the Rural Health Revolution</h2>
      <p>Be part of the movement to transform rural healthcare with AI-driven solutions</p>
      <div className="row5_input_box_div">
          <input type="text" placeholder="Enter your email"/>
          <button>Get Started</button>
      </div>
      <div className="row5_inside_bottom_div">
          By subscribing , you agree to our Terms of Service and Privacy Policy.
      </div>
  </div>


  <footer>
    <div className="footer-left">
        <div className="logo">
            <img width="80px" src={Hero}/>   
        </div>
        <div className="text">
            <h4>EncoHealth AI. Tech Adrishta 2024</h4>
        </div>
    </div>
    <div className="footer-right">
        <nav>
            <ul>
                <li>
                    <a href=" ">About us</a>
                </li>
                <li>
                    <a href=" ">Contact Us</a>
                </li>
                <li>
                    <a href=" ">Get Started</a>
                </li>
            </ul>
        </nav>
    </div>
  </footer>

    </>
  )
}

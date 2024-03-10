import image01 from '../assets/images/about1.png'
import image02 from '../assets/images/about2.png'
import { SiTryhackme } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import '../styles/about.css'
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <section className='about-main flex mt-12'>
          <img src={image01} alt="Image" />
          <div className='about'>
            <div>
              Greetings!
            </div>
            <br/>
            <div>
              If you're here, you'd no doubt want to know a little bit about who I am and what I do.
            </div>
            <br/>
            <div>
            Back in the day, I managed to access databases through tools that automatically detect SQL injection (Havij, SQLI Dumper), which gave me a keen interest in cybersecurity and software.          </div>
            <br/>
            <div>
              The purpose of this blog is primarily to serve as a space where I can upload CTF articles and introductions to anything I have encountered in my work that interests me in particular, and also to document my journey into the field of information security. I hope you find my post informative, if not entertaining!
            </div>

            <div className='social-links mt-5 d-flex gap-4'>
              <div className="social-first">
                <Link to="https://github.com/namiqmamedov" target='_blank'>
                  <FaGithub />
                  Github
                </Link>
                <Link to="https://linkedin.com/in/namiqmamedov" target='_blank'>
                  <FaLinkedin />
                  LinkedIn
                </Link>
              </div>
              <div className="social-second">
                <Link to="https://tryhackme.com/p/namiq" target='_blank'>
                  <SiTryhackme />
                  Tryhackme
                </Link>
              </div>
            </div>
          </div>
          <img src={image02} alt="Image" />
      </section>
    </>
  )
}

export default About
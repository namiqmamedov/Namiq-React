import image01 from '../assets/images/about1.png'
import image02 from '../assets/images/about2.png'
import '../styles/about.css'

const About = () => {
  return (
    <section className='about-main flex mt-12'>
        <img src={image01} alt="Image" />
        <div className='about'>
          <div>
            Hello!
          </div>
          <br/>
          <div>
            If you're here, you'd no doubt want to know a little bit about who I am and what I do.
          </div>
          <br/>
          <div>
            When I was 15, I became interested in accessing databases through tools that automatically detect SQL injection (Havij, SQLI Dumper) and decided to follow this path.
          </div>
          <br/>
          <div>
            The purpose of this blog is primarily to serve as a space where I can upload CTF articles and introductions to anything I have encountered in my work that interests me in particular, and also to document my journey into the field of information security. I hope you find my post informative, if not entertaining!
          </div>
        </div>
        <img  src={image02} alt="Image" />
    </section>
  )
}

export default About
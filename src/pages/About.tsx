import image01 from '../assets/images/about1.png'
import image02 from '../assets/images/about2.png'

const About = () => {
  return (
    <div className='flex mt-12'>
        <img width={'17%'} src={image01} alt="Image" />
        <div className='about'>
        Hello, I'm Namiq Mammadov, born in 2002, and I dive into the depths of the computer world as a passionate enthusiast of cybersecurity and software. With the advantage of my young age, I have a strong desire to continually develop myself and acquire new skills in these exciting fields.
            <div>
            <span>
            Cybersecurity
            </span>
            For me, cybersecurity means safeguarding the security of our digital world and defending against cyber threats. I am interested in topics such as strong encryption, penetration testing, and security vulnerability analysis, and I keep up with the latest developments in the field of information security. My goal is to contribute to making the digital world safer and more resilient against vulnerabilities.
            </div>
            <div>
            <span>Software Development</span>
            Software development is another passionate area for me, allowing me to enhance my creative thinking and problem-solving skills. I work with languages like C#, Python and React, develop projects, and improve my coding skills every day. I am also interested in various software projects, including contributing to open-source initiatives and creating new applications.
            </div>
        </div>
        <img width={'17%'} src={image02} alt="Image" />
    </div>
  )
}

export default About
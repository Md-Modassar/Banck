import React from 'react'
import "./about.css"
import profile from "../../images/profile.png"

const About = () => {
  const data = [
    {
      "year": 1990,
      "event": "Bank's Foundation"
    },
    {
      "year": 2005,
      "event": "Introduction of Online Banking"
    },
    {
      "year": 2015,
      "event": "Expansion into Global Markets"
    },
    {
      "year": 2020,
      "event": "Launch of Mobile Banking App"
    }
  ]
  const leadershipTeam= [
    {
      "name": "John Smith",
      "position": "CEO"
    },
    {
      "name": "Jane Doe",
      "position": "CFO"
    },
    {
      "name": "Chris Williams",
      "position": "Head of Operations"
    }
  ]
  return (
    <div className='about' id="about">
      <h1>About</h1>
      <h3>Welcome to IndusInd Bank , where we are dedicated to providing exceptional financial services and building lasting relationships with our customers. With a rich history and a commitment to innovation, we strive to be a trusted partner in your financial journey.</h3>
       <div className='mission'>
        <span>Our Mission</span>
        <span>Empower individuals and businesses by delivering reliable and innovative financial solutions, fostering economic growth, and contributing to the well-being of the communities we serve.</span>
        </div>
        <div className='core-value'>
       <a> Integrity</a>
      <a>Customer-Centricity</a>
      <a>Innovation</a>
      <a>Community Engagement</a>
      <a>Transparency</a>
      
        </div>
        <div className='Our_history'>
         <h1>Our History</h1>
         <p>Established in 1999, IndusInd Back has a proud history of serving our community. From our humble beginnings, we have grown into a trusted financial institution, adapting to the changing needs of our customers.</p>
         <div className='mi-card-caontainer'>
         {
            data.map((product,i)=>(
              <div className='mil-card'>
               <h2>{product.year}</h2>
               <h3>{product.event}</h3>
              </div>
            ))
          }
          </div> 
        </div>
        <div className='leader'>
          <h1>Leadership Team</h1>
          <div className='leader-card-container'>
            {
              leadershipTeam.map((product,i)=>(
                <div className='leader-card'>
                 <img src={profile} alt=''/>
                 <h2>{product.name}</h2>
                 <h3>{product.position}</h3>
                </div>
              ))
            }
          </div>
        </div>

      </div>
  )
}

export default About
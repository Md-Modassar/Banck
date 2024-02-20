import React from 'react'
import "./footer.css"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <div className='footer'>
        <h1>IndusInd Bank</h1>
        <h2>inusidnbang@bank.org</h2>
        <div>
          <InstagramIcon/>
          <FacebookIcon/>
          <LinkedInIcon/>
          <TwitterIcon/>
        </div>
    </div>
  )
}

export default Footer
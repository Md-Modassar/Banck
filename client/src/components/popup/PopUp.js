import React from 'react'
import "./popup.css"
import { Link } from 'react-router-dom'

const PopUp = ({ isOpen, onClose ,status}) => {
  console.log("statusss",status)
  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      {
        status?(  <div className="popup-content">

        <button onClick={onClose} className='popbuton'>Close</button>
        <p>Opreation Sccessfull</p>
      </div>):(  <div className="popup-content">

<Link to="/"style={{direction:"none"}}><button onClick={onClose} className='popbuton'>Close</button></Link>
<p>samething went to wrong</p>

</div>)
      }
  
  </div>
  )
}

export default PopUp
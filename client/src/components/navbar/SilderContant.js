import React from 'react'

const SilderContant = ({ activeIndex, sliderImage }) => {
  return (
    
         <section>
      {sliderImage.map((slide, index) => (
        <div
          key={index}
          className={index === activeIndex ? "slides active" : "inactive"}
        >
          
          <div className='img-sid'>
          <img style={{height:"100%", width:"100%"}}  src={slide.urls} alt="" />
          </div>
         
          
        </div>
      ))}
    </section>

    
  )
}

export default SilderContant
import React, {useState,useEffect}from 'react'
import "./navbar.css"
import SliderContent from './SilderContant';
import Dots from './Dots';
import Scroller from './Scroller';
import sliderImage from './sliderImage';

const Navbar = () => {
    const len = sliderImage.length - 1;
    const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);


  return (
    <div className="slider-container">
    <SliderContent activeIndex={activeIndex} sliderImage={sliderImage} />
    <Scroller
      prevSlide={() =>
        setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
      }
      nextSlide={() =>
        setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
      }
    />
    <Dots
      activeIndex={activeIndex}
      sliderImage={sliderImage}
      onclick={(activeIndex) => setActiveIndex(activeIndex)}
    />
  </div>
  );
}

export default Navbar
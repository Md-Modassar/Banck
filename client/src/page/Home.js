import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import Service from '../components/service/Service'
import About from '../components/About/About'

const Home = () => {
  return (
    <div>
        <Header/>
        <Navbar/>
        <Service/>
        <About/>
        <Footer/>
    </div>
  )
}

export default Home
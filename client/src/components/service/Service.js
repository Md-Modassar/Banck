import React from 'react'
import "./service.css"
import data from "../data/servicedata"

const Service = () => {
    console.log(data)
  return (
    <div className='services' id="service">
        <h1>Services</h1>
        <div className='card-cantainer'>
            {
                data.map((prpduct,i)=>(
                    <div className='card'>
                     <img src={prpduct.image}  alt=''/>
                     <h1>{prpduct.name}</h1>
                     <p>{prpduct.description}</p>
                    </div>
                ))
            }

        </div>

    </div>
  )
}

export default Service
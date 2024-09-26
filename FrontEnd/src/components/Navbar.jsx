import React from 'react'
import { GoBell } from "react-icons/go";

const Navbar = () => {
  return (
    <>
        <div className='border border-black flex '>
            <h1>Rural Healthcare Dashboard</h1>
            <div className='border border-black flex '>
                <a href="#" className='p-4'>
                    <GoBell />
                </a>
                <select>
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Bengali</option>
                </select>
            </div>
        </div>
    </>

  )
}

export default Navbar
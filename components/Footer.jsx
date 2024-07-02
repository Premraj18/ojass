import React from 'react'
import { BiCopyright } from 'react-icons/bi'

const Footer = () => {
    return (
        <div className=''>
            <div className="text-sm flex flex-col items-center justify-center md:px-20 py-4 px-3 bg-transparent text-gray-200"
                // style={{background: 'linear-gradient(rgba(0, 0, 0, 0.919),rgba(109, 109, 109, 0.133))'}}
            >
                <p className="flex items-center"><BiCopyright className="mx-2 text-lg" /> Ojass, NIT Jamshedpur</p>
                <p className="mt-3 md:mt-0 text-center">Design and develop by <span className="text-orange-600"><a href="">Prem Raj</a> & <a href="">Aditya Vikram</a> </span></p>
            </div>
        </div>
    )
}

export default Footer

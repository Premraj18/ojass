"use client"
import React, { useState } from 'react'
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs'
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const Media = () => {
    const { scrollY } = useScroll();

    const [hidden, setHidden] = useState(false)

    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (latest > 2) {
            setHidden(true);
        } else {
            setHidden(false)
        }
    })
    return (
        <motion.div className="lg:flex hidden justify-center mx-3 gap-4  flex-col w-10  items-center fixed top-[40%] left-0 z-10 text-white"
            variants={{
                visible: { opacity: 0 },
                hidden: { opacity:1 },
            }}
            // animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <a href="https://www.instagram.com/team.daksh/" target='_blank' className='hidden lg:flex  items-center justify-center w-full h-10 hover:text-pink-600'><BsInstagram size={23} /></a>
            <a href="https://www.facebook.com/teamdaksh.nitjsr/" target='_blank' className='hidden lg:flex  items-center justify-center w-full h-10 hover:text-blue-600'><BsFacebook size={23} /></a>
            <a href="https://in.linkedin.com/company/teamdaksh" target='_blank' className='hidden lg:flex  items-center justify-center w-full h-10 hover:text-blue-600'><BsLinkedin size={23} /></a>
            <a href="https://www.youtube.com/@teamdaksh9836" target='_blank' className='hidden lg:flex  items-center justify-center w-full h-10 hover:text-red-600'><BsYoutube size={23} /></a>
        </motion.div>
    )
}

export default Media

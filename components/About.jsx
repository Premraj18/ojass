"use client"
import React from 'react'
import { BiCheckDouble } from "react-icons/bi";
import { delay, motion } from 'framer-motion'
import Link from 'next/link';

const variants = {
    initial: {
        x: -100,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            staggerChildren: 0.1,
        },
    },
}

const About = () => {
    return (
        <section className="flex items-center w-full font-poppins sm:pt-14 sm:pb-20">
            <motion.div className="justify-center flex-1 w-full py-4 mx-auto lg:py-4 md:px-6"
                variants={variants}
                initial='initial'
                whileInView='animate'
            >
                <div className="px-4 mb-10 md:text-center md:mb-20">
                    <div className='flex justify-center'>
                        <img src="/abouttext2.png" alt="" className='w-56 md:w-80 ' />
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-center lg:px-32 w-full">
                    <motion.div className="w-full px-4 mb-10 lg:w-1/2 flex justify-center lg:mb-0"
                        variants={variants}

                    >
                        {/* <img src="https://i.postimg.cc/j5L5bX2d/pexels-andrea-piacquadio-3757946.jpg" alt=""
                            className="relative object-cover border-2 lg:w-[500px] w-full h-96 rounded-tr-3xl rounded-bl-3xl" /> */}
                        <iframe className='w-[350px] md:w-[550px] h-[315px] md:h-[415px] rounded-3xl' src="https://www.youtube.com/embed/Zh2j5CyPV9o?si=qxwqd8dYum076apM" title="YouTube video player" 
                        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </motion.div>
                    <motion.div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 "
                        variants={variants}

                    >
                        <motion.h2
                            className="py-3 pl-2 mb-4 text-2xl font-bold text-gray-200 border-l-4 border-white 00 " variants={variants}>
                            We are providing a better facility
                        </motion.h2>
                        <motion.p className="mb-4 text-base leading-7 text-gray-300 " variants={variants}>
                            We believe in transforming spaces into captivating experiences. Our team of passionate designers
                            merges creativity with functionality, delivering interiors that reflect your unique style and enhance your daily life.
                        </motion.p>
                        <ul className="mb-10">
                            <motion.li className="flex items-center mb-4 text-base " variants={variants}>
                                <span className="mr-3 text-white  ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        className="w-5 h-5 bi bi-patch-check-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                    </svg>
                                </span>
                                Every project is a canvas, and we tailor our designs to align with your vision and lifestyle.
                            </motion.li>
                            <motion.li className="flex items-center mb-4 text-base " variants={variants}>
                                <span className="mr-3 text-white ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        className="w-5 h-5 bi bi-patch-check-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                    </svg>
                                </span>
                                We obsess over the details, ensuring every element harmonizes seamlessly within the space.
                            </motion.li>
                            <motion.li className="flex items-center mb-4 text-base " variants={variants}>
                                <span className="mr-3 text-white  ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        className="w-5 h-5 bi bi-patch-check-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                    </svg>
                                </span>
                                We collaborate closely with you, turning your ideas into stunning, functional realities.
                            </motion.li>
                        </ul>
                        <Link href='/about'
                            className="px-4 py-3 text-white transition-all transform border border-white hover:bg-white/15 rounded-full  hover:text-gray-100" variants={variants}>
                            Discover more
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}

export default About

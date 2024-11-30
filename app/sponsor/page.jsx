"use client"
import React from 'react'

import { delay, motion } from 'framer-motion'

const variants = {
    initial: {
        y: 40,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1.5,
            staggerChildren: 0.1,
        },
    },
}

const variants2 = {
    initial: {
        y: 40,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.2,
        },
    },
}
const variants3 = {
    initial: {
        y: 40,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.2,
        },
    },
}


const Page = () => {
    return (
        <div className="w-full min-h-[100vh] sm:mt-0 lg:pt-14 pt-20 bg-[url('/img1.webp')] bg-center bg-cover bg-no-repeat bg-fixed">
            {/* <h2 className='text-3xl md:text-5xl text-center mt-20 underline' variants={variants}>Our Sponser And Partners</h2> */}
            <div className='pt-20 w-full hidden md:flex justify-center items-center'>
                <img src="/sponsertext.webp" alt="" className=' lg:w-1/2' />
            </div>
            <div className='pt-20 w-full flex justify-center md:hidden items-center'>
                <img src="/sponsertext2.webp" alt="" className='w-[70%]' />
            </div>
            <motion.div className='mt-10 flex flex-col justify-center items-center'
                variants={variants}
                initial='initial'
                whileInView='animate'
            >

                {/* Title sponser */}
                <div className='titleSPonse  mt-10 flex flex-col justify-center items-center'>
                    <motion.h3 className='text-2xl md:text-4xl' variants={variants}>Title Sponser</motion.h3>
                    <motion.img src="/sponserimg1.png" alt="" className='w-[60%]' variants={variants} />
                </div>

                {/* Associate Title sponser */}
                <div className='titleSPonse  mt-10 flex flex-col justify-center items-center'>
                    <motion.h3 className='text-2xl md:text-4xl' variants={variants}>Associate Title Sponser</motion.h3>
                    <motion.img src="/sponserimg2.png" alt="" className='md:w-[60%] w-[50%] my-10 mt-20' variants={variants} />
                </div>

                {/* Bevarage Sponser */}
                <motion.div className='titleSPonse  mt-10 flex flex-col justify-center items-center'>
                    <motion.h3 className='text-2xl md:text-4xl' variants={variants}>Bevarage Sponser</motion.h3>
                    <motion.div className='flex w-full flex-wrap my-10 justify-center items-center gap-10' variants={variants}>
                        <motion.img src="/Sponser/bigCola.webp" alt="" className='w-36 md:w-44 h-32 md:h-36' variants={variants} />
                        <motion.img src="/Sponser/juice.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants} />
                        <motion.img src="/Sponser/shudhJal.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants} />
                        <motion.img src="/Sponser/tataGlucoPlus.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants} />
                    </motion.div>
                </motion.div>
                <motion.div className='titleSPonse  mt-10 flex flex-col justify-center items-center'
                    variants={variants3}
                    initial='initial'
                    whileInView='animate'
                >
                    <motion.h3 className='text-2xl md:text-4xl' variants={variants3}>Media Sponser</motion.h3>
                    <motion.div className='flex flex-wrap md:w-[70%] my-10 justify-center items-center gap-10' variants={variants3}>
                        <motion.img src="/Sponser/allevents.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants3} />
                        <motion.img src="/Sponser/DEDUexpress.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants3} />
                        <motion.img src="/Sponser/DUbeat.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants3} />
                        <motion.img src="/Sponser/kawctopus.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants3} />
                        <motion.img src="/Sponser/noticeBard.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants3} />
                        <motion.img src="/Sponser/knowafest.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants3} />
                        <motion.img src="/Sponser/theCollegeFever.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants3} />
                        <motion.img src="/Sponser/vohCampus.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants3} />
                    </motion.div>
                </motion.div>
                <motion.div className='titleSPonse  mt-10 flex flex-col justify-center items-center'
                    variants={variants2}
                    initial='initial'
                    whileInView='animate'
                >
                    <motion.h3 className='text-2xl md:text-4xl' variants={variants2}>Partners</motion.h3>
                    <motion.div className='flex flex-wrap md:w-[70%] my-10 justify-center items-center gap-10' variants={variants2}>
                        <motion.img src="/Sponser/aptrion.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/aptron.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/bankofbaroda.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/blueDiamond.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/blueSapphire.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/brunch.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/buyHatke.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/cafeRegal.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/careerLauncher.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/carhp.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/cetra.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/cocaCola.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/codeChef.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/dalchini.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/dipsters.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/domainoPizza.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/DUbeat.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/etenIas.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/indiaOil.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/kfc.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/zebronics.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/yamaha.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/turtle.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/rapido.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                        <motion.img src="/Sponser/radioDhoom.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants2} />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Page

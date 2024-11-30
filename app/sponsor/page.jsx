"use client"
import React from 'react'

import { delay, motion } from 'framer-motion'
import { BsDownload } from 'react-icons/bs';

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
                    <h3 className='text-2xl md:text-4xl' variants={variants}>Be Our Sponsor</h3>
                    <p className='text-center px-5 lg:w-[70vw] py-8'>
                        Be at the forefront of innovation! Support Ojass, the Techno-Management
                        Fest of NIT Jamshedpur, where creativity meets cutting-edge technology.
                        By sponsoring us, you align your brand with groundbreaking innovations,
                        vibrant competitions, and a community of future leaders. Partner with
                        us to drive progress, inspire excellence, and be a part of the legacy
                        that shapes tomorrow.
                    </p>
                    <p className='text-center px-5 lg:w-[70vw] py-8'>For more details, we’ve attached our comprehensive brochure. We look forward to having you as a valued partner in this exhilarating venture!</p>
                    <div className="m-6 flex flex-col items-center">
                        <h1 className="text-lg sm:text-2xl mb-2">Brochure</h1>
                        <a download='brouchre' target='_blank' href='https://drive.google.com/file/d/1TX9WoQPsOf7UKtfadHtC5nxNu1Oy0igT/view?usp=sharing' className='text-white my-4'>
                            <BsDownload size={50} />
                        </a>
                    </div>
                </div>


                <motion.div className='titleSPonse  mt-10 flex flex-col justify-center items-center'
                    variants={variants2}
                    initial='initial'
                    whileInView='animate'
                >
                    <motion.h3 className='text-2xl md:text-4xl' variants={variants2}>Our Past Sponser & Partners</motion.h3>
                    <motion.div className='flex w-full flex-wrap my-10 justify-center items-center gap-10' variants={variants}>
                        <motion.img src="/Sponser/bigCola.webp" alt="" className='w-36 md:w-44 h-32 md:h-36' variants={variants} />
                        <motion.img src="/Sponser/juice.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants} />
                        <motion.img src="/Sponser/shudhJal.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants} />
                        <motion.img src="/Sponser/tataGlucoPlus.webp" alt="" className='w-36 md:w-44 h-32 md:h-40' variants={variants} />
                    </motion.div>
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
            </motion.div>
        </div>
    )
}

export default Page

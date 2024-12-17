"use client"
import Link from 'next/link'
import { useContext } from 'react'
import { BsTelephone } from 'react-icons/bs'
import { MdLocationPin, MdMail } from 'react-icons/md'

export default function Foter() {

    return (
        <footer className="body-font " style={{ background: 'linear-gradient(rgba(0, 0, 0, 0.919),rgba(109, 109, 109, 0.133))', boxShadow: '0px 0.01px 5px rgba(24, 22, 22, 0.155)' }} >
            <div className="container px-5 pt-16 mx-auto" >
                <div className="flex flex-wrap md:text-left text-center order-first">
                    <div className="lg:w-1/3 md:w-1/2 justify-center lg:items-start items-center lg:pl-16 w-full sm:px-4 flex flex-col" >
                        <h2 className="title-font font-medium text-white tracking-widest mb-3 text-xl px-2" >OJASS'25</h2>
                        <p className='text-sm w-[350px] px-2'>Ojass, NIT Jamshedpur's annual national-level Techno-Management Festival, stands as
                            the second largest event of its kind in Eastern India. With a staggering turnout of
                            over 8000+ footfall including students, professionals, educators, and
                            artists from top colleges across the nation.</p>
                    </div>
                    {/* <div className="lg:w-1/4 md:w-1/2 w-full px-4 flex flex-col justify-center items-center lg:pl-20">
                        <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3 uppercase lg:text-lg" >About</h2>
                        <nav className="list-none mb-10 text-slate-50 text-center">
                            <p> We participate in SAE Collegiate competitions like BAJA SAEINDIA & BAJA SAE International.</p>
                        </nav>
                    </div> */}

                    <div className="lg:w-1/4 md:w-1/2 w-full px-4 flex flex-col justify-center items-center md:ml-12 my-5 lg:my-0 ">

                        <nav className="list-none mt-5">
                            <li>
                                <p className="text-gray-50  lg:text-base text-sm text-center flex justify-center items-center" ><MdLocationPin size={35} /> <span> National Institute of Technology Jamshedpur, <br /> Adityapur, Jamshedpur, Jharkhand 831014 </span></p>
                            </li>
                            <li>
                                <p className="text-gray-50  lg:text-base text-sm flex gap-x-5 my-3 items-center justify-center" ><BsTelephone size={25} /><span>+91 8863832703</span></p>
                            </li>
                            <li>
                                <p className="text-gray-50  lg:text-base text-sm flex gap-x-5 my-3 items-center justify-center" ><MdMail size={25} /><span>ojass@nitjsr.ac.in</span> </p>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 w-full sm:px-4 flex flex-col justify-center items-center" >
                        <h2 className="title-font font-medium text-white tracking-widest mb-3 text-xl" >Quick Link</h2>

                        <div className="w-full lg:w-3/4 lg:ml-16 sm:px-4 flex justify-center" >
                            <nav className="list-none w-full mb-5 text-sm lg:text-base flex flex-col gap-2 ">
                                <li>
                                    <Link href='/' className="text-gray-50 hover:text-red-500 cursor-pointer " >Home</Link>
                                </li>
                                <li>
                                    <Link href='/event' className="text-gray-50 hover:text-red-500 cursor-pointer" >Events</Link>
                                </li>
                                <li>
                                    <Link href='/shipping-and-delivery' className="text-gray-50 hover:text-red-500 cursor-pointer" >Shipping Policy</Link>
                                </li>

                            </nav>
                            <nav className="list-none w-96 mb-5 text-sm lg:text-base flex flex-col gap-2 ">
                                <li>
                                    <Link href='/privacy-policy' className="text-gray-50 hover:text-red-500 cursor-pointer " >Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link href='/terms-and-condition' className="text-gray-50 hover:text-red-500 cursor-pointer" >Term & Condition</Link>
                                </li>
                                <li>
                                    <Link href='/cancellation-and-refund-policy' className="text-gray-50 hover:text-red-500 cursor-pointer" >cancel & Refund</Link>
                                </li>

                            </nav>
                        </div>
                    </div>
                </div>
                <div className='flex md:flex-row flex-col justify-between'>
                    <div className='lg:text-lg text-white flex pt-5 justify-center md:pt-0 md:justify-normal'>
                        <p >Designed&Develop By: <a href="" className='text-red-500'>Prem Raj</a> </p>
                    </div>
                    <div className='lg:text-lg text-white flex pt-5 justify-center md:pt-0 md:justify-normal'>
                        <p >Visitors : <span className='text-red-500'>45327</span> </p>
                    </div>
                </div>
            </div>

            {/* <div className="bg-gray-200"> */}
            <div className="container px-5 py-3 mx-auto flex items-center justify-center sm:flex-row flex-col">
                <Link href={'/'} className='flex'>
                    <div className="flex ">
                        <h1 className=' text-2xl font-bold text-white  px-2 py-1 rounded' >OJASS</h1>
                    </div>
                </Link>
                <p className="text-sm text-gray-50 sm:ml-6 sm:mt-0 mt-4" >© 2024 NIT Jamshedpur —
                    <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-100 ml-1" target="_blank" >www.ojass.org</a>
                </p>
                {/* <span className="inline-flex sm:ml-auto mr-20 sm:mt-0 mt-4 justify-center sm:justify-start">
                        <a href='https://www.facebook.com/teamdaksh.nitjsr/' target='_blank' className="text-gray-50 hover:text-red-500 cursor-pointer">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            </svg>
                        </a>
                        
                        <a href="https://www.instagram.com/team.daksh/" target='_blank' className="ml-3 text-gray-50 hover:text-red-500 cursor-pointer">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                            </svg>
                        </a>
                        <a href='https://in.linkedin.com/company/teamdaksh' target='_blank' className="ml-3 text-gray-50 hover:text-red-500 cursor-pointer">
                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} className="w-5 h-5" viewBox="0 0 24 24">
                                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                <circle cx={4} cy={4} r={2} stroke="none" />
                            </svg>
                        </a>
                    </span> */}
            </div>
            {/* </div> */}
        </footer>
    )
}

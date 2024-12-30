import React from 'react'
import Image from 'next/image';

const page = () => {
    return (
        <>
            <div className="w-full min-h-[100vh] sm:mt-0 lg:pt-14 pt-20 bg-[url('/bghero.webp')] bg-center bg-cover bg-no-repeat bg-fixed">
                <div className='min-h-[100vh] -mt-20 relative  w-full flex flex-col items-center justify-center'
                    style={{
                        background: 'linear-gradient(to bottom, rgba(2, 2, 2, 0.633),rgba(2, 2, 2, 0.633))'
                    }}
                >
                    <div className='pt-44 w-full flex justify-center items-center pb-10 lg:pb-14'>
                        <Image src="/alpha.webp" width={400} height={100} alt="about" className='w-72 md:w-[35%]' />
                    </div>
                    <div className="flex flex-wrap items-center justify-center lg:px-32 w-full">
                        <div className="w-full px-4 mb-10 lg:w-1/2 flex justify-center lg:mb-0">
                            <Image src="/ojassalpha.webp" width={400} height={100} alt="about" className='w-[350px] md:w-[550px] h-[315px] md:h-[415px] rounded-3xl' />
                        </div>
                        <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 "


                        >
                            <h2
                                className="py-3 pl-2 mb-4 text-2xl font-bold text-gray-200 border-l-4 border-white 00 " >
                                About
                            </h2>
                            <p className="mb-4 text-base leading-7 text-gray-300 " >
                                OJASS Alpha is an exclusive multi-disciplinary competition
                                designed for students from classes 6 to 12, aimed at fostering
                                creativity, innovation, and teamwork. This one-of-a-kind event
                                invites young minds to tackle exciting challenges across various
                                domains, encouraging critical thinking and pushing boundaries.
                            </p>
                            <p className="mb-4 text-base leading-7 text-gray-300 " >
                                Participants also get the chance to witness OJASS’25, Eastern
                                India’s Second-Largest Techno-Management Fest, featuring workshops,
                                exhibitions, guest lectures by industry experts, and cultural evenings - all FREE OF COST!
                            </p>

                            <div className='flex flex-wrap lg:text-xl text-xl md:text-base items-baseline gap-7'>
                                <a href="https://forms.gle/1DBYtixNwjwmNLqX8" target='_blank' rel="noopener noreferrer">
                                    <button className="px-5 py-1 text-base rounded-full border-2 bg-white/10 hover:bg-white/15">
                                        Register Here
                                    </button>
                                </a>
                                <a href="https://docs.google.com/document/d/1GOsQm2Ra5AUS0zGtPIi-uClS38qIhNk7" target='_blank' rel="noopener noreferrer">
                                    <button className="px-5 py-1 text-base rounded-full border-2 bg-white/10 hover:bg-white/15">
                                        Rule Book
                                    </button>
                                </a>
                            </div>


                        </div>
                    </div>

                   

                    <div className="flex flex-col items-center justify-center w-full lg:py-8">
                        <h2 className='lg:text-4xl text-2xl my-8 underline font-semibold'>Competition Structure</h2>
                        <div className="flex flex-wrap gap-8 lg:gap-16 items-center justify-center lg:px-20 px-3 w-full py-8">
                            <div className='lg:w-2/5 flex flex-col gap-3'>
                                <p>1. Online Test (Preliminary Round)</p>
                                <p>- Date: 25th January 2025</p>
                                <p>- Mode: Online</p>
                                <p>- Details :</p>
                                <p>
                                    Teams will participate in an engaging online quiz, where the combined efforts of all team members will determine their cumulative score. This preliminary round will select the top 50 teams to compete in the grand finale.
                                </p>
                            </div>
                            <div className='lg:w-2/5 flex flex-col gap-3 '>
                                <p>2. On-Campus Finale</p>
                                <p>- Date: 14th–16th February 2025</p>
                                <p>- Venue: NIT Jamshedpur</p>
                                <p>- Mode: Offline</p>
                                <p>- Details:</p>
                                <p>
                                    Finalists will compete in a series of multidisciplinary sub-events conducted during OJASS’25, Eastern India’s Second-Largest Techno-Management Fest.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className='lg:text-4xl text-2xl text-center my-8 underline font-semibold'>Eligibility :</h2>
                        <p className='lg:text-3xl text-lg px-3'>Open to teams of 3-4 students from classes 6 to 12. </p>

                    </div>

                    <div className='flex flex-col justify-center items-center pb-10'>
                        <h2 className='lg:text-4xl text-2xl my-8 underline font-semibold'>Events Include</h2>
                        <div className='flex flex-wrap lg:gap-10 gap-y-4 gap-x-2 justify-center lg:px-10 px-2'>
                            <button className="w-40 lg:w-44 px-5 py-1 text-base rounded-full border-2 bg-white/10">
                                Robo Assembly
                            </button>
                            <button className="w-40 lg:w-44 px-5 py-1 text-base rounded-full border-2 bg-white/10">
                                Debate
                            </button>
                            <button className="w-40 lg:w-44 px-5 py-1 text-base rounded-full border-2 bg-white/10">
                                Waste to Best
                            </button>
                            <button className="w-40 lg:w-44 px-5 py-1 text-base rounded-full border-2 bg-white/10">
                                Startup Pitch
                            </button>
                            <button className="w-40 lg:w-44 px-5 py-1 text-base rounded-full border-2 bg-white/10">
                                Coding Combat
                            </button>
                            <button className="w-40 lg:w-44 px-5 py-1 text-base rounded-full border-2 bg-white/10">
                                Chess
                            </button>
                            <button className="w-40 lg:w-44 px-5 py-1 text-base rounded-full border-2 bg-white/10">
                                Water Rocket
                            </button>
                            <button className="w-40 lg:w-44 px-5 py-1 text-base rounded-full border-2 bg-white/10">
                                Breadboard Challenge
                            </button>
                        </div>
                    </div>

                    <div className='w-full lg:pl-60 px-4'>
                        <h2 className='lg:text-4xl text-2xl my-8 underline font-semibold'>Why Participate</h2>
                        <div className='flex flex-col gap-3 lg:w-[80%]'>
                            <p>Unlock your potential across multiple disciplines.Collaborate, innovate, and compete with some of India’s brightest young minds.</p>
                            <p>Gain exposure to creative problem-solving and real-world challenges. Immerse yourself in the vibrant atmosphere of OJASS’25, featuring:</p>
                            <p>Workshops on cutting-edge technologies. Live demonstrations of innovative projects. </p>
                            <p>Expert talks by industry leaders. Electrifying cultural performances and more!  </p>
                            <p>The winning teams will receive trophies, certificates of excellence, and national-level recognition, making this a valuable addition to their academic and extracurricular achievements.</p>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-center lg:mt-16 mt-10 gap-5 px-3 w-full pb-10'>
                        <h2 className='lg:text-4xl text-3xl font-semibold'>Prize & Recognition</h2>
                        <div className='flex flex-col lg:justify-center lg:items-center gap-2 font-medium text-lg bg-white/15 p-6 rounded-lg md:w-[50%] w-80'>
                            <p>Participants stand a chance to win:   </p>
                            <p>- Prizes worth ₹50,000.</p>
                            <p>- Goodies, certificates, merchandise, and much more! </p>
                            {/* <p>Second Runner Up :</p> */}
                            <p>- Participation certificates for all finalists.</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default page

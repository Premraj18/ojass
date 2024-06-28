"use client"
import React, { useState } from 'react'

const Page = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name == '' || email == '' || message == '') {
            alert("Please fill all the credentials!")
        }
        else {
            alert("message sent successfully");
            setName('');
            setEmail('');
            setMessage('');
        }

    }

    return (
        <>
            <div className="w-full min-h-[100vh] sm:mt-0 lg:pt-14 pt-20 bg-[url('/img8.jpeg')] bg-center bg-cover bg-no-repeat bg-fixed">
                <div className='min-h-[100vh] -mt-20 relative  w-full flex flex-col items-center justify-center'
                    style={{
                        background: 'linear-gradient(to bottom, rgba(2, 2, 2, 0.633),rgba(2, 2, 2, 0.633))'
                    }}
                >
                    {/* <h2 className='text-5xl text-center mt-20 underline'>Team Ojass</h2> */}
                    <div className='pt-48 w-full flex justify-center items-center'>
                        <img src="/contacttext.png" alt="" className='w-[80%] lg:w-1/3' />
                    </div>
                    {/* <div className='flex justify-center px-5'>
                        <p className='text-center my-10 lg:w-[50%]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, ut corrupti sint libero repellendus voluptas, fugit animi error, modi cupiditate nulla illum sequi.</p>
                    </div> */}
                    <div className='flex flex-col text-center items-center justify-center px-5 gap-10 mt-10'>
                        {/* <h2 className='text-5xl tracking-wider font-medium'>Get In Touch</h2> */}
                        <p className='md:w-[70%] mt-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, voluptates reprehenderit atque dolorum obcaecati quis, veritatis molestias iusto vero, sunt facere unde deleniti ipsam et sapiente quam aperiam totam numquam.</p>

                        <div className='flex flex-wrap items-center justify-center md:gap-40 gap-10 md:mt-10'>
                            <div className="flex flex-col items-center justify-center text-center">
                                <span className="p-3 text-white rounded-full bg-white/15 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </span>

                                <h2 className="mt-4 text-lg font-medium text-gray-400 ">Email</h2>
                                <p className="mt-2 text-gray-300 ">Our friendly team is here to help.</p>
                                <p className="mt-2 text-white ">hello@merakiui.com</p>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center">
                                <span className="p-3 text-white rounded-full bg-white/15 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                </span>

                                <h2 className="mt-4 text-lg font-medium text-gray-400 ">Location</h2>
                                <p className="mt-2 text-gray-300 ">Come say hello at our office HQ.</p>
                                <p className="mt-2 text-white ">100 Smith Street Collingwood VIC 3066 AU</p>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center">
                                <span className="p-3 text-white rounded-full bg-white/15 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </span>
                                <h2 className="mt-4 text-lg font-medium text-gray-400 ">Phone</h2>
                                <p className="mt-2 text-gray-300 ">Mon-Fri from 8am to 5pm.</p>
                                <p className="mt-2 text-white ">+1 (555) 000-0000</p>
                            </div>

                        </div>
                        <div>

                        </div>
                    </div>

                    <div className=' w-full flex flex-col items-center justify-center pb-20'>
                        <h3 className='text-2xl font-medium my-10'>Find us on map</h3>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.6863772192432!2d86.14154107508409!3d22.77701737934658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e4daa475a5cd%3A0xd87b53fadcd771a1!2sNational%20Institute%20of%20Technology%2C%20Jamshedpur!5e0!3m2!1sen!2sjp!4v1718941681102!5m2!1sen!2sjp"
                            width="80%"
                            height="450"
                            style={{ border: '0' }}
                            allowFullScreen=""
                            className='rounded-xl shadow-xl'
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">

                        </iframe>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page


// {/* <div className='w-[30%] h-[60vh] border rounded-3xl bg-white/10'>
//                         <form onSubmit={handleSubmit} className='p-10 w-full shadow-lg rounded-3xl'>
//                             <div className="-mx-2 md:items-center md:flex">
//                                 <div className="flex-1 px-2">
//                                     <input type="text" placeholder="Name" className="block w-full px-5 py-2.5 mt-2 text-gray-300 placeholder-gray-200 bg-black border-gray-200 rounded-lg"
//                                         value={name}
//                                         onChange={(e) => setName(e.target.value)}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="mt-4">
//                                 <input type="email" placeholder="E-mail address" className="block w-full px-5 py-2.5 mt-2 text-gray-300 placeholder-gray-200 bg-black border-gray-200 rounded-lg"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </div>

//                             <div className="w-full mt-4">
//                                 <textarea className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-300 placeholder-gray-200 bg-black border-gray-200 rounded-lg md:h-40 " placeholder="Message"
//                                     value={message}
//                                     onChange={(e) => setMessage(e.target.value)}
//                                 />
//                             </div>

//                             <button type='submit' className="w-40 px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white border rounded-3xl hover:bg-white/10">
//                                 Send message
//                             </button>
//                         </form>
//  </div> */}
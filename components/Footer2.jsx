"use client"
import Link from 'next/link'
import { BsTelephone } from 'react-icons/bs'
import { MdLocationPin, MdMail } from 'react-icons/md'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { BsYoutube } from 'react-icons/bs'
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from 'next/image'
import toast from 'react-hot-toast'

export default function Footer2() {
    const [refreshCount, setRefreshCount] = useState(0);

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    useEffect(() => {
        const currentCount = parseInt(Cookies.get("refreshCount") || "0", 10);
        const newCount = currentCount + 1;
        setRefreshCount(newCount);
        Cookies.set("refreshCount", newCount);
    }, []);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (name == '' || message == '' || email == '' || phone == '') {
            toast.error("Please fill all the credentials!")
            return;
        }
        if(phone.length != 10){
            toast.error("Please enter valid phone number");
            return;
        }

        const formData = new FormData();
        formData.append("name", name)
        formData.append("name", email)
        formData.append("name", phone)
        formData.append("message", message)

        formData.append("access_key", "86cad20b-6450-456f-9d68-d07e99061062");
        // 3e4907d6-f1d4-46b2-89e5-74232098d23a
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            toast.success("message sent successfully");
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
        } else {
            console.log("Error", data);
            toast.error(data.message);
        }
    };

    return (
        <footer className="relative" style={{ background: 'linear-gradient(rgba(0, 0, 0, 0.919),rgba(109, 109, 109, 0.133))' }}>
            <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* About Section */}
                    <div className="flex flex-col justify-center">
                        <Link href="/" className="flex items-center mb-4">
                            <Image width={400} height={100} src="/logo.webp" alt="OJASS Logo" className="w-16 h-16" />
                            <h2 className="text-2xl font-bold text-white ml-2">OJASS'25</h2>
                        </Link>
                        <p className="mt-4 max-w-md text-gray-300 text-sm">
                            Ojass, NIT Jamshedpur's annual national-level Techno-Management Festival,
                            stands as the second largest event of its kind in Eastern India. With a
                            staggering turnout of over 8000+ footfall including students, professionals,
                            educators, and artists from top colleges across the nation.
                        </p>

                        {/* Social Links */}
                        <div className="mt-6 flex gap-4">
                            <a target='_blank' href="https://www.facebook.com/Ojassnitjamshedpur/" className="text-gray-300 hover:text-white transition-colors">
                                <FaFacebookF size={20} />
                            </a>
                            <a target='_blank' href="https://www.youtube.com/@OJASS.NITJSR" className="text-gray-300 hover:text-white transition-colors">
                                <BsYoutube size={20} />
                            </a>
                            <a target='_blank' href="https://www.instagram.com/ojass.nitjsr/" className="text-gray-300 hover:text-white transition-colors">
                                <FaInstagram size={20} />
                            </a>
                            <a target='_blank' href="https://www.linkedin.com/company/ojassnitjsr/" className="text-gray-300 hover:text-white transition-colors">
                                <FaLinkedinIn size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-wrap justify-center md:grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 md:grid-cols-2 lg:mt-4">
                        <div className='flex flex-wrap'>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-6">Quick Links</h3>
                                <nav className="flex flex-col space-y-3">
                                    <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                                    <Link href="/event" className="text-gray-300 hover:text-white transition-colors">Events</Link>
                                    <Link href="/ourteam" className="text-gray-300 hover:text-white transition-colors">Our Team</Link>
                                    <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</Link>
                                </nav>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-6">Legal</h3>
                                <nav className="flex flex-col space-y-3">
                                    <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
                                    <Link href="/terms-and-condition" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link>
                                    <Link href="/cancellation-and-refund-policy" className="text-gray-300 hover:text-white transition-colors">Refund Policy</Link>
                                    <Link href="/shipping-and-delivery" className="text-gray-300 hover:text-white transition-colors">Shipping Policy</Link>
                                </nav>
                            </div>
                            <div>
                                <div className='flex justify-center items-center mt-4'>
                                    <button onClick={openModal} className='w-full p-2 border bg-white/15 rounded-full hover:bg-white/20 transition-colors'>
                                        Drop Your Query
                                    </button>
                                </div>
                                {/* Modal */}
                                {isOpen && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                                        <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg">
                                            <h2 className="text-xl font-bold mb-4 text-black">Drop Your Query</h2>
                                            <div className="p-4 bg-dark-blue rounded-lg text-gray-800">
                                                <input type="text" className="w-full p-2 mb-2 border border-blue-500 rounded-lg bg-light-blue" placeholder="Your Name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                                <input type="email" className="w-full p-2 mb-2 border border-blue-500 rounded-lg bg-light-blue" placeholder="Your email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <input type="number" minLength={10} maxLength={10} className="w-full p-2 mb-2 border border-blue-500 rounded-lg bg-light-blue" placeholder="Your Number"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                                <textarea className="w-full p-2 border border-blue-500 rounded-lg bg-light-blue" rows="4" placeholder="Your query"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                ></textarea>
                                                <button
                                                    onClick={handleSubmit}
                                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-800 focus:outline-none"
                                                >
                                                    Submit
                                                </button>

                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={closeModal}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-white mb-6">Contact Us</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <MdLocationPin className="text-gray-300 text-xl flex-shrink-0 mt-1" />
                                    <p className="text-gray-300">
                                        National Institute of Technology Jamshedpur,
                                        Adityapur, Jamshedpur, Jharkhand 831014
                                    </p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <BsTelephone className="text-gray-300" />
                                    <p className="text-gray-300">+91 8863832703</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <MdMail className="text-gray-300" />
                                    <p className="text-gray-300">ojass@nitjsr.ac.in</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-gray-700 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-300 mb-4 md:mb-0 text-center md:text-left">
                            <p>Designed & Developed By: <span className="text-red-500">Prem Raj, Aditya Vikram & Ayush Singh</span></p>
                        </div>
                        <div className="text-gray-300">
                            <p>Visitors: <span className="text-red-500">{51753 + refreshCount}</span></p>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-gray-300 text-sm">
                        © 2024 NIT Jamshedpur — <a href="https://ojass.org" className="hover:text-white">www.ojass.org</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

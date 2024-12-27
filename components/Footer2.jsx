"use client"
import Link from 'next/link'
import { BsTelephone } from 'react-icons/bs'
import { MdLocationPin, MdMail } from 'react-icons/md'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { BsYoutube } from 'react-icons/bs'
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Footer2() {
    const [refreshCount, setRefreshCount] = useState(0);

    useEffect(() => {
        const currentCount = parseInt(Cookies.get("refreshCount") || "0", 10);
        const newCount = currentCount + 1;
        setRefreshCount(newCount);
        Cookies.set("refreshCount", newCount);
    }, []);

    return (
        <footer className="relative" style={{ background: 'linear-gradient(rgba(0, 0, 0, 0.919),rgba(109, 109, 109, 0.133))' }}>
            <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* About Section */}
                    <div className="flex flex-col justify-center">
                        <Link href="/" className="flex items-center mb-4">
                            <img src="/logo.webp" alt="OJASS Logo" className="w-16 h-16" />
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
                    <div className="flex flex-wrap justify-center md:grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 md:grid-cols-3 lg:mt-4">
                        
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
                            <p>Visitors: <span className="text-red-500">{45362 + refreshCount}</span></p>
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

"use client"
// icons
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
} from 'react-icons/hi2';
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

// nav data
export const navData = [
  { name: 'Home', path: '/', icon: <HiHome /> },
  { name: 'About', path: '/about', icon: <HiUser /> },
  { name: 'Services', path: '/services', icon: <HiRectangleGroup /> },
  { name: 'Gallery', path: '/gallery', icon: <HiViewColumns /> },
  {
    name: 'Sponser',
    path: '/sponser',
    icon: <HiChatBubbleBottomCenterText />,
  },
  {
    name: 'Contact',
    path: '/contact',
    icon: <HiEnvelope />,
  },
];

import Link from 'next/link';

import { usePathname } from 'next/navigation'
import { useState } from 'react';

const Nav = () => {
  const pathname = usePathname();
  console.log(pathname)

  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 50) {
      setHidden(true);
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.header className="w-full fixed top-0 z-50 py-3 sm:px-10 px-5 flex justify-between items-center bg-transparent"
      variants={{
        visible: { background: 'transparent' },
        hidden: { background: 'linear-gradient(rgba(109, 109, 109, 0.133),rgba(0, 0, 0, 0.919))', boxShadow: '0px 0.01px 5px rgba(24, 22, 22, 0.155)' },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.1, }}
    >
      <nav className='flex w-full screen-max-width justify-center items-center'>
        <img src='/ojasslogo.png' alt="Apple" className='w-20 ' />
        <div className='flex flex-1 justify-center max-sm:hidden'>
          {navData.map((link, index) => {
            return (
              <Link
                className={`text-gray-300`}
                href={link.path}
                key={index}>
                <div className={`${link.path === pathname && 'text-white border rounded-full'}  transition-all hover:text-white text-center flex px-5 py-1 justify-center items-center`}>
                  {link.icon}
                  <div className='px-1 cursor-pointer '>
                    <span className=''>{link.name}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        <div className='flex items-baseline text-white gap-7 max-sm:justify-end max-sm:flex-1'>
          <button className='border p-1 px-2 bg-white/15 rounded-full'>Sign up</button>
        </div>
      </nav>
    </motion.header>
  )
};

export default Nav;

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
import { MdEmojiEvents } from "react-icons/md";
import { RxCross2 } from 'react-icons/rx'
import { FiMenu } from "react-icons/fi";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

// nav data
export const navData = [
  { name: 'Home', path: '/', icon: <HiHome /> },
  { name: 'Event', path: '/event', icon: <MdEmojiEvents /> },
  { name: 'Our Team', path: '/ourteam', icon: <HiRectangleGroup /> },
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
import { useRef, useState } from 'react';

const Nav = () => {
  const pathname = usePathname();
  // console.log(pathname)

  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 50) {
      setHidden(true);
    } else {
      setHidden(false)
    }
  })


  const ref = useRef();

  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }

  return (
    <motion.header className="w-full fixed top-0 z-50 py-3 sm:px-10 px-5 flex justify-between items-center bg-transparent"
      variants={{
        visible: { background: 'transparent' },
        hidden: { background: 'linear-gradient(rgba(109, 109, 109, 0.133),rgba(0, 0, 0, 0.919))', boxShadow: '0px 0.01px 5px rgba(24, 22, 22, 0.155)' },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.1, }}
    >
      <nav className='flex w-full screen-max-width md:justify-center justify-between items-center'>
        <img src='/ojasslogo.webp'  className='w-20 ' />
        <div className='flex flex-1 justify-center max-md:hidden'>
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
        <div className='md:flex items-baseline text-white gap-7 max-sm:justify-end max-sm:flex-1 hidden '>
          <button className='border p-1 px-4 bg-white/15 rounded-full'>Sign up</button>
        </div>

        {/* Mobile view */}

        <div onClick={toggleCart} className='cursor-pointer md:hidden font-semibold md:absolute md:right-0 md:mx-8 md:mt-0'>
          <button className={``}><FiMenu size={30} /></button>
        </div>
        <div ref={ref} className="w-full md:hidden h-[100vh] sideCart bg-black absolute top-0 right-0 py-10 transition-transform transform translate-x-full ">
          <span onClick={toggleCart} className="absolute top-8 right-4 cursor-pointer"><RxCross2 size={30} /></span>
          <div className='flex flex-col border-t-2 py-5 justify-center items-center mt-12 gap-10'>
            <div className='flex flex-col gap-y-5 justify-center'>
              {navData.map((link, index) => {
                return (
                  <Link
                    className={`text-gray-300`}
                    href={link.path}
                    key={index}>
                    <div className={`${link.path === pathname && 'text-white border rounded-full'}  transition-all hover:text-white text-center flex px-5 py-1 justify-center items-center`}>
                      {link.icon}
                      <div className='px-1 cursor-pointer ' onClick={toggleCart}>
                        <span className=''>{link.name}</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
            <div className='flex lg:text-xl text-xl md:text-base items-baseline gap-7 max-sm:justify-end max-sm:flex-1'>
              <div to='/sponser'>
                <button className={`px-5 py-1 text-base rounded-full border-2 bg-white/10 hover:text-black`} >Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  )
};

export default Nav;

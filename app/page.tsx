"use client";
import React from "react";
import Hero from '@/components/Hero'
import About from '@/components/About'
import Media from '@/components/Media'
import Event from '@/components/Event'


export default function Home() {
  return (
    <>
      <Media/>
      <div className="">
        <Hero />
        {/* <About/> */}
        {/* <Event/> */}
      </div>
    </>
  );
}

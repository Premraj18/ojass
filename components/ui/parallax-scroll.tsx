"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/cn";
import InstagramEmbed from "../InstagramEmbeded"

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, (2 * third - 2));
  const thirdPart = images.slice(2 * third - 2);

  return (
    <div
      id="scroll"
      className={cn("h-[50rem] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      {/* <h2 className='text-center tracking-wider text-7xl pt-10'>Gallery</h2> */}
      <div className='pt-10 flex w-full justify-center items-center'>
        <img src="/gallerytext.webp" alt="" className='w-60 md:w-1/4 md:pt-16 pt-10' />
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start  max-w-8xl mx-auto gap-20 pt-10 px-10"
        ref={gridRef}
      >
        <div className="grid gap-16">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }} // Apply the translateY motion value here
              key={"grid-1" + idx}
            >
              <img
                src={el}
                className="h-80 w-full border md:object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-16">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
              <img
                src={el}
                className="h-80 w-full border md:object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-16">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
              <img
                src={el}
                className="h-80 w-full border md:object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className='flex flex-col md:flex-row px-8 md:justify-evenly justify-center items-center -mt-28 mb-5 gap-3 '>
        <iframe className='w-[350px] md:w-[550px] h-[315px] md:h-[415px] rounded-3xl' src="https://www.youtube.com/embed/v025irxdSmk?si=QualeiZb-NDBwE_D" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <InstagramEmbed embedUrl="https://www.instagram.com/reel/C5m5dVUvSSA/?utm_source=ig_embed&amp;utm_campaign=loading" />
      </div>
      <div className='flex flex-col md:flex-row px-8 md:justify-evenly justify-center items-center  mt-10 mb-5 gap-3'>
        <iframe className='w-[350px] md:w-[550px] h-[315px] md:h-[415px] rounded-3xl' src="https://www.youtube.com/embed/HTBQUfxH7iw?si=dMoZms4wbwb_wMpQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <InstagramEmbed embedUrl="https://www.instagram.com/reel/C5vzK4uSH9D/?utm_source=ig_embed&amp;utm_campaign=loading" />
      </div>
    </div>
  );
};

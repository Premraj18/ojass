"use client";
import Image from 'next/image';
import Link from 'next/link';
import GlimpseCard from './glimseCard'

const Data = [
    { id: "1", imgUrl: "/gimg1.webp" },
    { id: "2", imgUrl: "/gimg2.webp" },
    { id: "3", imgUrl: "/gimg3.webp" },
    { id: "4", imgUrl: "/gimg4.webp" },
];

const Glimpse = () => {
    return (
        <div className="w-full min-h-[90vh] pt-10 md:pt-0">
            <div className="h-full w-full justify-center items-center pb-20 flex flex-col">
                <div className="mb-10">
                    <Image  src="/glimpsetext.webp" alt="glimse" width={400} height={100} />
                </div>
                <div className="w-full flex flex-wrap justify-center items-center gap-10 my-10">
                    <GlimpseCard/>
                </div>
                <div>
                    <Link href="/gallery">
                        <div className="border text-white p-2 px-5 rounded-full cursor-pointer hover:bg-white/15">
                            Explore
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Glimpse;

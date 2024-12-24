"use client";
import Image from 'next/image';
import Link from 'next/link';

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
                    <Image src="/glimpsetext.webp" alt="" width={400} height={100} />
                </div>
                <div className="w-full flex flex-wrap justify-center items-center gap-10 my-10">
                    {Data.map((e) => (
                        <div key={e.id} className="w-72 h-80 relative bg-white/10 rounded-xl p-4 px-6">
                            <div className="border w-full h-full py-2">
                                <div className='border absolute w-[256px] h-[271px] right-4 '>
                                    <Image
                                        src={e.imgUrl}
                                        alt={`Image ${e.id}`}
                                        width={256}
                                        height={271}
                                        className="w-full h-full object-cover px-2"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
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

import React from 'react'

const Page = () => {
    return (
        <div className="w-full min-h-[100vh] sm:mt-0 lg:pt-14 pt-20 bg-[url('/img1.jpg')] bg-center bg-cover bg-no-repeat bg-fixed">
            <div className='mt-20 flex flex-col justify-center items-center'>
                <h2 className='text-5xl underline'>Our Sponser And Partners</h2>
                <div className='titleSPonse  mt-10 flex flex-col justify-center items-center'>
                    <h3 className='text-4xl'>Title Sponser</h3>
                    <img src="/sponserimg1.png" alt="" className='w-[60%]'/>
                </div>
                <div className='titleSPonse  mt-10 flex flex-col justify-center items-center'>
                    <h3 className='text-4xl'>Associate Title Sponser</h3>
                    <img src="/sponserimg2.png" alt="" className='w-[60%] my-10 mt-20'/>
                </div>
                <div className='titleSPonse  mt-10 flex flex-col justify-center items-center'>
                    <h3 className='text-4xl'>Bevarage Sponser</h3>
                    <div className='flex w-full my-10 justify-center items-center gap-10'>
                        <img src="/Sponser/bigCola.webp" alt="" className='w-40 h-36'/>
                        <img src="/Sponser/juice.webp" alt="" className='w-40 h-40'/>
                        <img src="/Sponser/shudhJal.webp" alt="" className='w-40 h-40'/>
                        <img src="/Sponser/tataGlucoPlus.webp" alt="" className='w-40 h-40'/>
                    </div>
                </div>
                <div className='titleSPonse  mt-10 flex flex-col justify-center items-center'>
                    <h3 className='text-4xl'>Media Sponser</h3>
                    <div className='flex flex-wrap w-full my-10 justify-center items-center gap-10'>
                        <img src="/Sponser/bigCola.webp" alt="" className='w-40 h-40'/>
                        <img src="/Sponser/juice.webp" alt="" className='w-40 h-40'/>
                        <img src="/Sponser/shudhJal.webp" alt="" className='w-40 h-40'/>
                        <img src="/Sponser/tataGlucoPlus.webp" alt="" className='w-40 h-40'/>
                        <img src="/Sponser/bigCola.webp" alt="" className='w-40 h-40'/>
                        <img src="/Sponser/juice.webp" alt="" className='w-40 h-40'/>
                        <img src="/Sponser/shudhJal.webp" alt="" className='w-40 h-40'/>
                        <img src="/Sponser/tataGlucoPlus.webp" alt="" className='w-40 h-40'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page

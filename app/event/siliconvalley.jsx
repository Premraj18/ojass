"use client"
import CardEvent from './Cardevent';
import Data from "./event.json"

const SiliconValley = () => {
    return (
        <>
            <div className=" w-[95%] h-[70vh] cursor-pointer text-white p-6 rounded-[0.8rem] scale-95 bg-white/10 border-gray-200 border-[2px] shadow-md">
                <h2 className="text-center text-3xl lg:text-5xl mb-5">SiliconValley</h2>
                <CardEvent data={Data[1]}/>
            </div>
        </>
    )
}

export default SiliconValley

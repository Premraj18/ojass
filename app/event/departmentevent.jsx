"use client"
import CardEvent from './Cardevent';
import Data from "./event.json"


const department = () => {
    return (
        <>
            <div className=" w-[95%] h-[80vh] md:h-[90vh] cursor-pointer flex flex-col gap-5 justify-center text-white p-6 rounded-[0.8rem] scale-95 bg-white/10 border-gray-200 border-[1px] shadow-md">
                <h2 className="text-center text-3xl font-bold lg:text-5xl mb-5">Department Event</h2>
                <CardEvent data={Data[5]}/>
            </div>
        </>
    )
}

export default department

"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Data from '../../event.json'
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';

const Page = () => {
  const router = useRouter();
  const eve = useParams();
  const i = eve.num;
  const j = eve.subnum;
  const dataeve = Data[i][j];
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleRegister = () => {
    // If not logged in, redirect to login
    if (!user) {
      router.push('/login');
      return;
    }

    if (!user.paid) {
      toast.error('Please complete your registration payment first');
      return;
    }

    // Redirect to dashboard/events for registration
    router.push('/dashboard/events');
    toast.success('Please complete your registration in the Events section');
  };

  if (loading) return null;

  const isRegistered = user?.events?.includes(dataeve.id);
  const isTeamEvent = parseInt(dataeve.teamSizeMin) > 1;

  const getRegistrationButton = () => {
    if (!user) {
      return (
        <button
          onClick={() => router.push('/login')}
          className="px-5 py-1 text-base rounded-full border-2 bg-white/10 hover:text-black cursor-pointer"
        >
          Login to Register
        </button>
      );
    }

    if (isRegistered) {
      return (
        <div className="px-5 py-1 text-base rounded-full border-2 bg-green-500/20 text-green-300">
          Already Registered
        </div>
      );
    }

    return (
      <button
        onClick={handleRegister}
        disabled={!user.paid}
        className={`px-5 py-1 text-base rounded-full border-2 ${
          user.paid 
            ? 'bg-white/10 hover:text-black cursor-pointer' 
            : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
        }`}
      >
        {user.paid ? `Register ${isTeamEvent ? 'Team' : 'Now'}` : 'Complete Registration First'}
      </button>
    );
  };

  return (
    <>
      <section className="flex items-center w-full font-poppins bg-[url('/subeve2.jpeg')] bg-center bg-cover bg-no-repeat bg-fixed">
        <div className="justify-center flex-1 w-full mx-auto md:px-6 pt-28 pb-20"
          style={{
            background: 'linear-gradient(to bottom, rgba(2, 2, 2, 0.533),rgba(2, 2, 2, 0.533))'
          }}
        >
          <div className="px-4 mb-10 md:text-center md:mb-20">
            <div className='flex justify-center'>
              <h2 className='lg:text-5xl text-3xl font-semibold font-serif'>{dataeve.name}</h2>
            </div>
          </div>
          <div className="flex flex-wrap  items-center justify-center lg:px-32 w-full">
            <div className="w-full px-4 mb-10 lg:w-1/2 flex justify-center lg:mb-0">
              <Image src={dataeve.img} width={400} height={100} alt="img" className='w-[350px] md:w-[430px] h-[315px] md:h-[400px] rounded-3xl object-cover' />
            </div>
            <div className="w-full px-4 lg:pl-10 mb-10 lg:w-1/2 lg:mb-0 ">
              <h2
                className="py-3 pl-2 mb-4 text-3xl font-bold text-gray-200 border-l-4 border-white 00 ">
                Description
              </h2>
              <p className="mb-4 text-base leading-7 md:w-3/4 text-gray-300 ">
                {dataeve.description}
              </p>
              <div className='flex flex-wrap lg:text-xl text-xl md:text-base items-baseline gap-7'>
                {getRegistrationButton()}
                <a href={dataeve.rulebookurl} target='_blank' rel="noopener noreferrer">
                  <button className="px-5 py-1 text-base rounded-full border-2 bg-white/10 hover:text-black">
                    Rule Book
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center lg:mt-16 gap-5 px-3'>
            <h2 className='text-4xl font-semibold'>Prize Worth</h2>
            <div className='flex flex-col justify-center items-center gap-2 font-medium text-lg bg-white/15 p-6 rounded-lg md:w-96 w-80'>
              <p>Total : {dataeve.prizes.total} </p>
              <p>Winner : {dataeve.prizes.winner}</p>
              <p>First Runner Up : {dataeve.prizes.first_runner_up}</p>
              <p>Second Runner Up : {dataeve.prizes.second_runner_up}</p>
              <p>Certificates to all Participants</p>
            </div>
          </div>
          <div className='flex flex-col mt-16 gap-5'>
            <h2 className='text-4xl text-center font-semibold'>Details</h2>
            {dataeve.details?.map((data, idx) => (
              <div key={idx} className='lg:px-20'>
                <p className='font-medium text-lg px-3 lg:px-40'>- {data}</p>
              </div>
            ))}
          </div>
          <div className='flex flex-col justify-center items-center'>
            <div className='md:w-3/4 mx-3 flex flex-col justify-center items-center mt-16 gap-5 bg-white/15 p-6 rounded-lg'>
              <h2 className='text-4xl font-semibold'>Rules</h2>
              <div className='flex flex-col justify-center gap-2 font-medium text-lg'>
                {dataeve.rules?.map((data, idx) => (
                  <p key={idx}>{idx + 1}. {data}</p>
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center gap-5 mt-8 md:text-3xl text-xl px-2'>
            <p className='text-center'>Event Head : {dataeve.event_head.name}</p>
            <p className='text-center'>Contact No : {dataeve.event_head.Phone}</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Page

import React from 'react'
import NewProgressBtn from './NewProgressBtn'
import BarsIcon from './icons/BarsIcon'
import ProgressCheckIcon from './icons/ProgressCheckIcon'
import ProgressClockIcon from './icons/ProgressClockIcon'
import UserProfileIcon from './icons/UserProfileIcon'

function BottomBar() {
    return (
        <>
            <NewProgressBtn />
            <div className='fixed z-30 max-w-[600px] w-full left-1/2 -translate-x-1/2 bottom-0 top-auto h-14 bg-slate-800 grid grid-cols-5 gap-0'>
                <button className='col-span-1 flex justify-center items-center text-white'>
                    <span className='fill-white'>
                        <BarsIcon />
                    </span>
                </button>

                <button className='col-span-1 flex justify-center items-center text-white'>
                    <span className='fill-white relative'>
                        <ProgressClockIcon />
                        <div className='absolute -bottom-1 left-[75%] min-w-[1rem] px-1 rounded-full bg-yellow-500 text-black flex justify-center items-center text-[10px]'>7</div>
                    </span>
                </button>

                <div className='col-span-1'></div>

                <button className='col-span-1 flex justify-center items-center text-white'>
                    <span className='fill-white relative'>
                        <ProgressCheckIcon />
                        <div className='absolute -bottom-1 left-[75%]  min-w-[1rem] px-1 rounded-full bg-emerald-700 text-white flex justify-center items-center text-[10px]'>0</div>
                    </span>
                </button>
                <button className='col-span-1 flex justify-center items-center text-white'>
                    <span className='w-7'>
                        <UserProfileIcon />
                    </span>
                </button>


            </div>
        </>
    )
}

export default BottomBar
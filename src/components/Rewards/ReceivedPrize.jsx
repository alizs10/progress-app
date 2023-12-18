import React from 'react'
import StarIcon from '../icons/StarIcon'

function ReceivedPrize() {
    return (
        <div className='p-3 rounded-2xl shadow-md shadow-gray-900 from-yellow-600 via-yellow-400 to-yellow-200 bg-gradient-to-r'>
            <div className="flex items-center justify-between">
                <div className="flex gap-x-2">
                    <div className="w-6 h-6 text-slate-800"><StarIcon /></div>
                    <span className="text-lg text-slate-800 font-bold">Prize one</span>
                </div>

                <div className="rounded-xl py-[3px] px-[12px] text-xs capitalize text-white font-bold bg-slate-800 shadow-sm shadow-black">3 Progresses</div>
            </div>
        </div>

    )
}

export default ReceivedPrize
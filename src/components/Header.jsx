import React from 'react'
import RewardIcon from './icons/RewardIcon'

function Header() {
    return (
        <div className='h-12 flex justify-between items-center p-3 m-3 bg-slate-800 rounded-xl'>
            <h1 className='text-lg text-white'>Progresses</h1>
            <button className='fill-yellow-400'>
                <RewardIcon />
            </button>
        </div>
    )
}

export default Header
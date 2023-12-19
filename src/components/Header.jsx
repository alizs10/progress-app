import React from 'react'
import RewardIcon from './icons/RewardIcon'
import useAppStore from '../../store/app-store'

function Header() {

    const { openRewards } = useAppStore()

    return (
        <div className='h-12 flex justify-between items-center p-3 m-3 bg-slate-800 rounded-xl shadow-sm shadow-black'>
            <h1 className='text-xl font-bold text-white'>Progresses</h1>
            <button onClick={openRewards} className='fill-yellow-400'>
                <RewardIcon />
            </button>
        </div>
    )
}

export default Header
import React from 'react'
import RewardIcon from '../icons/RewardIcon'
import PlusIcon from '../icons/PlusIcon'

function Header({ handleOpenNewGoalWindow }) {

    function handleNewGoalBtn() {
        handleOpenNewGoalWindow()
    }


    return (
        <div className='h-12 flex justify-between items-center px-3 my-5 bg-slate-800 rounded-xl sticky top-0 z-50'>
            <div className='flex gap-x-2 items-start'>
                <span className='fill-yellow-400'><RewardIcon /></span>
                <h1 className='text-xl font-bold text-white'>
                    Goals & Rewards
                    <span className='ml-2 text-xs text-yellow-400'>10</span>
                </h1>

            </div>
            <button className='px-2 py-1 text-white rounded-xl bg-emerald-600 flex gap-x-2 shadow-black shadow-md'>

                <div onClick={handleNewGoalBtn} className='w-6'><PlusIcon /></div>

            </button>
        </div>
    )
}

export default Header
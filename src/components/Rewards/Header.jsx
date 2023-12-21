import React from 'react'
import RewardIcon from '../icons/RewardIcon'
import PlusIcon from '../icons/PlusIcon'
import ArrowLeftIcon from '../icons/ArrowLeftIcon'
import useAppStore from '../../../store/app-store'

function Header({ handleOpenNewGoalWindow }) {

    const { closeRewards } = useAppStore()
    function handleNewGoalBtn() {
        handleOpenNewGoalWindow()
    }


    return (
        <div className='h-12 flex justify-between items-center p-3 mx-3 my-5 bg-slate-800 shadow-sm shadow-black rounded-xl sticky top-0 z-50'>
            <div className='flex gap-x-2 items-start'>
                <button onClick={closeRewards} className='text-white mr-2'><ArrowLeftIcon /></button>
                <span className='fill-yellow-400'><RewardIcon /></span>
                <h1 className='text-xl font-bold text-white'>
                    Goals & Rewards
                </h1>

            </div>
            <button onClick={handleNewGoalBtn} className='px-2 py-1 text-white rounded-xl bg-emerald-600 flex gap-x-2'>

                <div className='w-6'><PlusIcon /></div>

            </button>
        </div>
    )
}

export default Header
import React, { useState } from 'react'
import PrizeCongratsWindow from './PrizeCongratsWindow'
import { AnimatePresence } from 'framer-motion'
import useProgressesStore from '../../../store/progresses-store'

function Goal({ goal }) {

    let targeted = goal.targets.filter(t => t.status)
    let percent = Math.floor(targeted.length / goal.targets.length * 100)

    const [congratsVis, setCongratsVis] = useState(false)
    const { updateGoal, addPrize } = useProgressesStore()
    function handleGetPrize() {
        if (goal.status && !goal.isPrized) {
            updateGoal({ _id: goal._id, isPrized: true })
            addPrize({
                _id: new Date().getTime(),
                prize: goal.prize,
                goal
            })
        }
        setCongratsVis(true)
    }

    function handleCloseCongratsWindow() {
        setCongratsVis(false)
    }
    return (
        <div className='p-3 rounded-3xl shadow-sm shadow-black from-blue-950 via-violet-950 from-10% via-50% to-90% to-transparent bg-gradient-to-r flex flex-col gap-y-6'>

            <div className="flex justify-between item-start">

                <div className="flex gap-x-2 items-center">
                    <span className='text-lg font-bold text-white capitalize line-clamp-1'>{goal.title}</span>

                    {percent === 100 ? (<div className="rounded-xl py-[3px] px-[12px] text-xs capitalize text-black font-bold bg-emerald-400 shadow-sm shadow-black">done</div>) : (<div className="rounded-xl py-[3px] px-[12px] text-[10px] text-white bg-gray-900 shadow-sm shadow-black">{targeted.length}/{goal.targets.length}</div>)}
                </div>
                <button onClick={handleGetPrize} disabled={percent == 100 ? false : true} className='px-2 py-1 text-xs text-black rounded-3xl bg-yellow-400 disabled:opacity-40'>
                    <span>{goal.isPrized ? 'Received' : 'Get Prize'}</span>
                </button>
            </div>
            {percent < 100 && (
                <div className="flex items-center justify-between">
                    <div className='w-[88%] h-fit relative border-2 border-emerald-400 rounded-full p-[2px] overflow-hidden'>
                        <div style={{ right: 100 - percent + '%' }} className="absolute inset-0 bg-emerald-400"></div>
                    </div>
                    <div className="flex justify-end min-w-fit w-[10%] text-emerald-400">
                        <div className="flex flex-col leading-none items-center gap-y-[1px]">
                            <span className="text-2xl font-bold">{percent}</span>
                            <span className='text-[10px]'>percent</span>
                        </div>
                    </div>
                </div>
            )}

            <AnimatePresence>

                {congratsVis && (

                    <PrizeCongratsWindow prize={goal.prize} handleClose={handleCloseCongratsWindow} />

                )}
            </AnimatePresence>


        </div>

    )
}

export default Goal
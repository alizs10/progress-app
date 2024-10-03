import React, { useEffect, useState } from 'react'
import NewProgressBtn from './NewProgressBtn'
import ProgressCheckIcon from './icons/ProgressCheckIcon'
import ProgressClockIcon from './icons/ProgressClockIcon'
import useProgressesStore from '../../store/progresses-store'
import { AnimatePresence } from 'framer-motion'
import NewProgressWindow from './NewProgressWindow'
import ListIcon from './icons/ListIcon'

function BottomBar() {

    const { selectedLabel, showProgresses, data, showProgressesType } = useProgressesStore()

    const [countData, setCountData] = useState({ inProgress: 0, completed: 0 })

    const [newProgressWindowVis, setNewProgressWindowVis] = useState(false)

    useEffect(() => {

        let allCount = data.length;
        let undoneCount = 0;
        let doneCount = 0;

        data.map(pg => {
            let passedSteps = pg.steps.filter(st => st.status)
            if (passedSteps.length === pg.steps.length) {
                doneCount++;
            }
        })

        undoneCount = allCount - doneCount;

        setCountData({ inProgress: undoneCount, completed: doneCount, all: allCount })

    }, [data, showProgressesType])

    return (
        <section className='relative'>
            <AnimatePresence>
                <NewProgressBtn handleClick={() => setNewProgressWindowVis(true)} />
            </AnimatePresence>

            <div className='fixed z-40 max-w-[600px] w-full left-1/2 -translate-x-1/2 bottom-0 top-auto h-14 bg-slate-800 grid grid-cols-2 gap-0'>



                {/* <button
                    onClick={() => showProgresses({ labelId: selectedLabel, pgType: 1 })}
                    className={`col-span-1 flex z-40 justify-center items-center text-white ${showProgressesType === 1 && 'bg-gray-700'}`}>
                    <span className='relative w-6 fill-white'>
                        <ListIcon />
                        <div className='absolute -bottom-1 left-[75%] min-w-[1rem] px-1 rounded-full bg-blue-600 text-white flex justify-center items-center text-[10px]'>{countData.all}</div>
                    </span>
                </button> */}
                <button
                    onClick={() => showProgresses({ labelId: selectedLabel, pgType: 0 })}
                    className={`col-span-1 flex z-40 justify-center items-center text-white ${showProgressesType === 0 && 'bg-gray-700'}`}>
                    <span className='relative fill-white'>
                        <ProgressClockIcon />
                        <div className='absolute -bottom-1 left-[75%] min-w-[1rem] px-1 rounded-full bg-yellow-500 text-black flex justify-center items-center text-[10px]'>{countData.inProgress}</div>
                    </span>
                </button>


                <button
                    onClick={() => showProgresses({ labelId: selectedLabel, pgType: 2 })}
                    className={`col-span-1 flex z-40 justify-center items-center text-white ${showProgressesType === 2 && 'bg-gray-700'}`}>
                    <span className='relative fill-white'>
                        <ProgressCheckIcon />
                        <div className='absolute -bottom-1 left-[75%]  min-w-[1rem] px-1 rounded-full bg-emerald-700 text-white flex justify-center items-center text-[10px]'>{countData.completed}</div>
                    </span>
                </button>

                {/* <button
                    onClick={() => showProgresses({ labelId: selectedLabel, pgType: 2 })}
                    className={`col-span-1 flex z-40 justify-center items-center text-white ${showProgressesType === 2 && 'bg-gray-700'}`}>
                    <span className='relative fill-white'>
                        <ProgressCheckIcon />
                        <div className='absolute -bottom-1 left-[75%]  min-w-[1rem] px-1 rounded-full bg-emerald-700 text-white flex justify-center items-center text-[10px]'>{countData.completed}</div>
                    </span>
                </button> */}



            </div>

            <AnimatePresence>
                {newProgressWindowVis && (

                    <NewProgressWindow handleClose={() => setNewProgressWindowVis(false)} />

                )}
            </AnimatePresence>
        </section>
    )
}

export default BottomBar
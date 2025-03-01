import React, { useEffect, useState } from 'react'
import NewProgressBtn from './NewProgressBtn'
import useProgressesStore from '../../store/progresses-store'
import { AnimatePresence } from 'framer-motion'
import NewProgressWindow from './NewProgressWindow'
import { CircleCheckBig, CircleDashed, Home, Medal } from 'lucide-react'

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

            <div className='fixed top-auto right-auto z-40 grid grid-cols-5 gap-2 min-w-[300px] -translate-x-1/2 left-1/2 bottom-3 h-14'>

                <div className="grid grid-cols-4 col-span-4 px-3 overflow-hidden bg-gray-800 rounded-full">
                    <button
                        onClick={() => { }}
                        className={`col-span-1 flex z-40 justify-center items-center ${showProgressesType === 0 ? 'text-emerald-600' : 'text-white'}`}>
                        <Home className='size-6' />
                    </button>
                    <button
                        onClick={() => showProgresses({ labelId: selectedLabel, pgType: 0 })}
                        className={`col-span-1 px-5 flex z-40 justify-center items-center ${showProgressesType === 0 ? 'text-emerald-600' : 'text-white'}`}>
                        <span className='relative'>
                            <CircleDashed className='size-6' />
                            {/* <div className='absolute -bottom-3 left-1/2 -translate-x-1/2 min-w-[1rem] px-1 rounded-full bg-yellow-500 text-black flex justify-center items-center text-[10px]'>{countData.inProgress}</div> */}
                        </span>
                    </button>
                    <button
                        onClick={() => showProgresses({ labelId: selectedLabel, pgType: 2 })}
                        className={`col-span-1 px-5 flex z-40 justify-center items-center ${showProgressesType === 2 ? 'text-emerald-600' : 'text-white'}`}>
                        <span className='relative'>
                            <CircleCheckBig className='size-6' />
                            {/* <div className='absolute -bottom-3 left-1/2 -translate-x-1/2  min-w-[1rem] px-1 rounded-full bg-emerald-700 text-white flex justify-center items-center text-[10px]'>{countData.completed}</div> */}
                        </span>
                    </button>
                    <button
                        onClick={() => showProgresses({ labelId: selectedLabel, pgType: 0 })}
                        className={`col-span-1 flex z-40 justify-center items-center ${showProgressesType === 0 ? 'text-emerald-600' : 'text-white'}`}>
                        <span className='relative'>
                            <Medal className='size-6' />
                            {/* <div className='absolute -bottom-3 left-1/2 -translate-x-1/2 min-w-[1rem] px-1 rounded-full bg-yellow-500 text-black flex justify-center items-center text-[10px]'>{countData.inProgress}</div> */}
                        </span>
                    </button>

                </div>
                <div className="col-span-1">
                    <AnimatePresence>
                        <NewProgressBtn handleClick={() => setNewProgressWindowVis(true)} />
                    </AnimatePresence>

                </div>


                {/* <button
                    onClick={() => showProgresses({ labelId: selectedLabel, pgType: 1 })}
                    className={`col-span-1 flex z-40 justify-center items-center ${showProgressesType === 1 && 'text-600'}`}>
                    <span className='relative w-6 fill-white'>
                        <ListIcon />
                        <div className='absolute -bottom-3 left-1/2 -translate-x-1/2 min-w-[1rem] px-1 rounded-full bg-blue-600 text-white flex justify-center items-center text-[10px]'>{countData.all}</div>
                    </span>
                </button> */}

                {/* <button
                    onClick={() => showProgresses({ labelId: selectedLabel, pgType: 2 })}
                    className={`col-span-1 flex z-40 justify-center items-center ${showProgressesType === 2 && 'text-600'}`}>
                    <span className='relative fill-white'>
                        <ProgressCheckIcon />
                        <div className='absolute -bottom-3 left-1/2 -translate-x-1/2  min-w-[1rem] px-1 rounded-full bg-emerald-700 text-white flex justify-center items-center text-[10px]'>{countData.completed}</div>
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
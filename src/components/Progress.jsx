import React, { useEffect } from 'react'
import ClockIcon from './icons/ClockIcon'
import ArrowUturnRightIcon from './icons/ArrowUturnRightIcon'
import CheckIcon from './icons/CheckIcon'
import useProgressesStore from '../../store/progresses-store'
import { useSwipeable } from 'react-swipeable'
import { configs } from '../../lib/swipeable'
import moment from 'moment'
import { deadlineToMoment } from '../../helpers/helpers'

function Progress({ progress }) {

    const { stepForward, stepBackward, setEditingProgress } = useProgressesStore()

    // swipeable
    const handlers = useSwipeable({
        onSwipedRight: handleSwipeRight,
        onSwipedLeft: handleSwipeLeft,
        onTap: handleOpenEditor,
        ...configs,
    });

    function handleSwipeRight() {
        stepForward(progress._id)
    }

    function handleSwipeLeft() {
        stepBackward(progress._id)
    }

    function handleOpenEditor() {
        setEditingProgress(progress)
    }

    let reversedSteps = [...progress.steps].reverse()
    let passedSteps = reversedSteps.filter(st => st.status)
    let pg = Math.floor((passedSteps.length / progress.steps.length) * 100);
    console.log(passedSteps)
    let lastStep = passedSteps[passedSteps.length - 1]
    let nextStep = reversedSteps[passedSteps.length]

    return (
        <div {...handlers} className={`col-span-2 relative rounded-xl h-32 p-3 shadow-md overflow-hidden shadow-black/70 pg-container-theme-${progress.theme}`}>
            <div style={{ width: `${pg}%` }} className={`transition-all duration-300 absolute inset-0 z-10 right-auto h-32 pg-bar-theme-${progress.theme} rounded-xl`}></div>


            <div className='absolute inset-0 z-20 p-3 flex flex-col gap-y-1 h-32'>
                <div className='flex justify-between items-start'>
                    <div className='flex flex-col gap-y-3'>
                        <span className='font-bold text-2xl  line-clamp-1'>{progress.title}</span>
                        <div className='flex flex-col gap-y-1'>

                            <div className='flex flex-nowrap gap-x-1'>

                                {lastStep && (

                                    <div className='flex gap-x-1 items-center'>
                                        <span className='w-[14px] text-emerald-700'>
                                            <CheckIcon />
                                        </span>
                                        <span className='text-[10px]'>
                                            {lastStep?.title}
                                        </span>
                                    </div>

                                )}
                                {lastStep && nextStep && (
                                    <span className='text-[10px]'>|</span>
                                )}
                                {nextStep && (
                                    <div className='flex gap-x-1 items-center'>
                                        <span className='w-[14px] text-red-600'>
                                            <ArrowUturnRightIcon />
                                        </span>
                                        <span className='text-[10px]'>
                                            {nextStep?.title}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className='flex gap-x-1 items-center'>
                                <span className='w-[14px] clock'>
                                    <ClockIcon />
                                </span>
                                <span className='text-[10px]'>
                                    {progress.deadline ? (moment(deadlineToMoment(progress.deadline)).toNow(true) + ' left') : "all the time in the world"}
                                </span>
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-col gap-y-3'>
                        <span className='font-bold text-5xl'>{pg}<span className='ml-1 text-[14px]'>%</span></span>
                        {passedSteps.length === progress.steps.length ? (
                            <span className='text-xs ml-auto'>completed</span>
                        ) : (
                            <span className='text-xs ml-auto'>{passedSteps.length}/{progress.steps.length}<span className='ml-1 text-[10px]'>steps</span></span>
                        )}

                    </div>

                </div>

                <div className='flex flex-nowrap gap-x-1 mt-auto'>
                    {reversedSteps.map(st => <div key={st._id} style={{ width: `${100 / progress.steps.length}%` }} className={`h-[2px] rounded-full ${st.status ? 'bg-black' : 'bg-gray-500'}`}></div>)}
                </div>
            </div>
        </div>
    )
}

export default Progress
import React, { useEffect } from 'react'
import ClockIcon from './icons/ClockIcon'
import ArrowUturnRightIcon from './icons/ArrowUturnRightIcon'
import CheckIcon from './icons/CheckIcon'
import useProgressesStore from '../../store/progresses-store'
import { useSwipeable } from 'react-swipeable'
import { configs } from '../../lib/swipeable'
import moment from 'moment'
import { deadlineToMoment } from '../../helpers/helpers'
import ProgressOptions from './ProgressOptions'
import { useLongPress } from 'use-long-press'
import PinIcon from './icons/PinIcon'
import ProgressImportance from './ProgressImportance'
import { AnimatePresence, motion } from 'framer-motion'

function Progress({ progress, index }) {

    const { stepForward, stepBackward, setViewingProgress, setViewingProgressVis, progressInFocus, setProgressInFocus, focusMode, setFocusMode, labels, importanceValues } = useProgressesStore()

    // swipeable
    const handlers = useSwipeable({
        onSwipedRight: handleSwipeRight,
        onSwipedLeft: handleSwipeLeft,
        onTap: handleOpenViewer,
        ...configs,
    });

    function handleSwipeRight() {
        stepForward(progress._id)
    }

    function handleSwipeLeft() {
        stepBackward(progress._id)
    }

    function handleOpenViewer() {
        if (focusMode) return
        setViewingProgress(progress)
        setViewingProgressVis(true)
    }

    let reversedSteps = [...progress.steps].reverse()
    let passedSteps = reversedSteps.filter(st => st.status)
    let pg = Math.floor((passedSteps.length / progress.steps.length) * 100);
    let lastStep = passedSteps[passedSteps.length - 1]
    let nextStep = reversedSteps[passedSteps.length]

    let progressLabel = labels.filter(lb => lb._id === progress.label)[0]
    let progressImportance = importanceValues.filter(imp => imp._id === progress.importance)[0]

    const bind = useLongPress(() => {

        setProgressInFocus(progress)
        setFocusMode(true)

    })

    return (


        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: focusMode && progressInFocus && progressInFocus._id === progress._id ? 1.03 : 1 }}
            exit={{ scale: 0 }}
            transition={{ bounce: 'none', duration: '.3' }}
            className={`relative col-span-2 h-32 ${focusMode && progressInFocus && progressInFocus._id === progress._id ? 'z-[99999]' : 'z-[9999]'}`}>
            <AnimatePresence>
                {focusMode && progressInFocus && progressInFocus._id === progress._id && (
                    <ProgressOptions progress={progress} progressIndex={index} />
                )}
            </AnimatePresence>
            <div {...bind()} {...handlers} className={`select-none relative overflow-hidden transition-all duration-300 rounded-3xl h-full p-3 shadow-md shadow-black/70 pg-container-theme-${progress.theme} ${focusMode && progressInFocus && progressInFocus._id === progress._id && `outline-theme-${progress.theme}`}`}>



                <div style={{ width: `${pg}%` }} className={`transition-all duration-300 absolute inset-0 z-10 right-auto h-32 pg-bar-theme-${progress.theme} rounded-3xl`}></div>


                <div className='absolute inset-0 z-20 p-3 flex flex-col gap-y-1 h-32'>
                    <div className='flex justify-between items-start'>
                        <div className='flex flex-col gap-y-3'>
                            <div className='flex gap-x-2 items-center'>
                                {progress.pin && (
                                    <div className='w-8 p-1 bg-white aspect-square rounded-full flex justify-center items-center'>
                                        <div className='w-5 fill-black'>
                                            <PinIcon />
                                        </div>
                                    </div>
                                )}
                                <span className='font-bold text-2xl  line-clamp-1'>{progress.title}</span>
                            </div>
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
                        <div className='flex flex-col gap-y-1'>
                            <span className='font-bold text-5xl'>{pg}<span className='ml-1 text-[14px]'>%</span></span>
                            {passedSteps.length === progress.steps.length ? (
                                <span className='text-xs ml-auto'>completed</span>
                            ) : (
                                <span className='text-xs ml-auto'>{passedSteps.length}/{progress.steps.length}<span className='ml-1 text-[10px]'>steps</span></span>
                            )}
                            <div className='ml-auto flex flex-nowrap gap-x-1'>
                                <ProgressImportance importance={progressImportance} />
                                <div className={`py-[1px] px-2 rounded-3xl bg-gray-500 text-[10px] text-white`}>{progressLabel.name}</div>
                            </div>
                        </div>

                    </div>

                    <div className='flex flex-nowrap gap-x-1 mt-auto'>
                        {reversedSteps.map(st => <div key={st._id} style={{ width: `${100 / progress.steps.length}%` }} className={`h-[2px] rounded-full ${st.status ? 'bg-black' : 'bg-gray-500'}`}></div>)}
                    </div>


                </div>

            </div>
        </motion.div>
    )
}

export default Progress
import React, { useEffect } from 'react'
import ClockIcon from './icons/ClockIcon'
import ArrowUturnRightIcon from './icons/ArrowUturnRightIcon'
import CheckIcon from './icons/CheckIcon'
import CircleProgressBar from './CircleProgressBar'
import { configs } from '../../lib/swipeable';
import { useSwipeable } from 'react-swipeable'
import useProgressesStore from '../../store/progresses-store'
import moment from 'moment'
import { deadlineToMoment } from '../../helpers/helpers'
import { useLongPress } from 'use-long-press'
import ProgressOptions from './ProgressOptions'
import PinIcon from './icons/PinIcon'
import { AnimatePresence, motion } from 'framer-motion'
import ProgressImportance from './ProgressImportance'

function MiniProgress({ progress, index }) {


    const { stepForward, stepBackward, setViewingProgress, setViewingProgressVis, progressInFocus, focusMode, setFocusMode, setProgressInFocus, labels, importanceValues, updatePossibleTarget } = useProgressesStore()

    let reversedSteps = [...progress.steps].sort((a, b) => a.number - b.number)
    let passedSteps = reversedSteps.filter(st => st.status)
    let pg = Math.floor((passedSteps.length / progress.steps.length) * 100);
    let lastStep = passedSteps[passedSteps.length - 1]
    let nextStep = reversedSteps[passedSteps.length]


    let progressLabel = labels.filter(lb => lb._id === progress.label)[0]
    let progressImportance = importanceValues.filter(imp => imp._id === progress.importance)[0]

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

    const bind = useLongPress(() => {

        setProgressInFocus(progress)
        setFocusMode(true)
    })

    useEffect(() => {

        if (progress.status) {
            updatePossibleTarget(progress)
        }

    }, [progress.status])


    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: focusMode && progressInFocus && progressInFocus._id === progress._id ? 1.03 : 1 }}
            exit={{ scale: 0 }}
            transition={{ bounce: 'none', duration: '.3' }}
            {...bind()} {...handlers} className={`col-span-1 aspect-square flex flex-col gap-0 relative rounded-xl p-2 shadow-md shadow-black/70 select-none progress-bar-base-theme-${progress.theme} ${focusMode && progressInFocus && progressInFocus._id === progress._id && `outline-theme-${progress.theme} z-[99999]`}`}>

            <AnimatePresence>
                {focusMode && progressInFocus && progressInFocus._id === progress._id && (
                    <ProgressOptions progress={progress} progressIndex={index} />
                )}
            </AnimatePresence>
            {progress.pin ? (
                <div className='flex items-start justify-between'>
                    <h1 className='text-xl font-bold line-clamp-2'>{progress.title}</h1>
                    <div className='w-8 min-w-[2rem] bg-white aspect-square rounded-full flex justify-center items-center'>
                        <div className='w-5 fill-black'>
                            <PinIcon />
                        </div>
                    </div>
                </div>
            ) : (
                <div className=''>
                    <h1 className='text-2xl font-bold line-clamp-2'>{progress.title}</h1>
                </div>
            )}

            <div className='flex items-center justify-between w-full pl-1 mt-auto'>

                <div className='flex flex-col gap-y-[2px] w-2/3'>

                    {lastStep && (

                        <div className='flex items-center gap-x-1'>
                            <span className='w-4 text-emerald-700'>
                                <CheckIcon />
                            </span>
                            <span className='text-[10px] line-clamp-1'>
                                {lastStep.title !== '' ? lastStep.title : `step ${lastStep.number}`}
                            </span>
                        </div>

                    )}

                    {nextStep && (
                        <div className='flex items-center gap-x-1'>
                            <span className='w-4 text-red-600'>
                                <ArrowUturnRightIcon />
                            </span>
                            <span className='text-[10px] line-clamp-1'>
                                {nextStep.title !== '' ? nextStep.title : `step ${nextStep.number}`}
                            </span>
                        </div>
                    )}

                    <div className='flex items-center gap-x-1'>
                        <span className='w-[14px] clock'>
                            <ClockIcon />
                        </span>
                        <span className='text-[10px] line-clamp-1'>
                            {progress.deadline ? (moment(deadlineToMoment(progress.deadline)).toNow(true) + ' left') : "not set"}
                        </span>
                    </div>

                    <div className='flex flex-nowrap gap-x-1'>
                        <ProgressImportance importance={progressImportance} />
                        <div className={`py-[1px] px-2 rounded-3xl bg-gray-500 text-[10px] text-white`}>{progressLabel.name}</div>
                    </div>

                </div>

                <div className='flex flex-col w-1/3 gap-0 mt-auto'>
                    <div className='w-full text-xs'>
                        <CircleProgressBar themeIndex={progress.theme} percentage={pg} />
                    </div>
                    {passedSteps.length === progress.steps.length ? (
                        <span className='mx-auto text-xs'>done</span>
                    ) : (
                        <span className='text-[10px] mx-auto'>{passedSteps.length}/{progress.steps.length}</span>
                    )}

                </div>

            </div>


        </motion.div>
    )
}

export default MiniProgress
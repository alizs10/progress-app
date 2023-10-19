import React from 'react'
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

function MiniProgress({ progress, index }) {


    const { stepForward, stepBackward, setEditingProgress, progressInFocus, setProgressInFocus } = useProgressesStore()

    let reversedSteps = [...progress.steps].reverse()
    let passedSteps = reversedSteps.filter(st => st.status)
    let pg = Math.floor((passedSteps.length / progress.steps.length) * 100);
    let lastStep = passedSteps[passedSteps.length - 1]
    let nextStep = reversedSteps[passedSteps.length]


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
        if (progressInFocus) return
        setEditingProgress(progress)
    }

    const bind = useLongPress(() => {

        setProgressInFocus(progress)

    })

    return (
        <div {...bind()} {...handlers} className={`col-span-1 aspect-square flex flex-col gap-0 relative rounded-xl p-3 shadow-md shadow-black/70 select-none progress-bar-base-theme-${progress.theme} ${progressInFocus && progressInFocus._id === progress._id && `outline-theme-${progress.theme} z-[99999] scale-[103%]`}`}>

            {progressInFocus && progressInFocus._id === progress._id && (
                <ProgressOptions progressIndex={index} />
            )}
            <div>
                <h1 className='font-bold text-2xl line-clamp-2'>{progress.title}</h1>
            </div>

            <div className='mt-auto flex justify-between items-center pl-1'>

                <div className='flex flex-col gap-y-1'>

                    {lastStep && (

                        <div className='flex gap-x-1 items-center'>
                            <span className='w-[14px] text-emerald-700'>
                                <CheckIcon />
                            </span>
                            <span className='text-[12px]  line-clamp-1'>
                                {lastStep?.title}
                            </span>
                        </div>

                    )}

                    {nextStep && (
                        <div className='flex gap-x-1 items-center'>
                            <span className='w-[14px] text-red-600'>
                                <ArrowUturnRightIcon />
                            </span>
                            <span className='text-[12px] line-clamp-1'>
                                {nextStep?.title}
                            </span>
                        </div>
                    )}

                    <div className='flex gap-x-1 items-center'>
                        <span className='w-[14px] clock'>
                            <ClockIcon />
                        </span>
                        <span className='text-[10px]'>
                            {progress.deadline ? (moment(deadlineToMoment(progress.deadline)).toNow(true) + ' left') : "not set"}
                        </span>
                    </div>

                </div>

                <div className='mt-auto flex flex-col gap-0'>
                    <CircleProgressBar themeIndex={progress.theme} percentage={pg} />
                    {passedSteps.length === progress.steps.length ? (
                        <span className='text-xs mx-auto'>done</span>
                    ) : (
                        <span className='text-[10px] mx-auto'>{passedSteps.length}/{progress.steps.length}</span>
                    )}

                </div>

            </div>


        </div>
    )
}

export default MiniProgress
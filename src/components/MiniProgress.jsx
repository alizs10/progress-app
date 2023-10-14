import React from 'react'
import ClockIcon from './icons/ClockIcon'
import ArrowUturnRightIcon from './icons/ArrowUturnRightIcon'
import CheckIcon from './icons/CheckIcon'
import CircleProgressBar from './CircleProgressBar'

function MiniProgress({ progress }) {


    let passedSteps = progress.steps.filter(st => st.status)
    let pg = Math.floor((passedSteps.length / progress.steps.length) * 100);
    let lastStep = passedSteps[passedSteps.length - 1]
    let nextStep = progress.steps[passedSteps.length]

    return (
        <div className={`col-span-1 flex flex-col gap-0 aspect-square relative rounded-xl p-3 shadow-md shadow-black/70 progress-bar-base-theme-${progress.theme} overflow-hidden`}>


            <div>
                <h1 className='font-bold text-2xl line-clamp-3'>{progress.title}</h1>
            </div>

            <div className='mt-auto flex justify-between items-center pl-1'>

                <div className='flex flex-col gap-y-1'>

                    {lastStep && (

                        <div className='flex gap-x-1 items-center'>
                            <span className='w-[14px] text-emerald-700'>
                                <CheckIcon />
                            </span>
                            <span className='text-[12px]'>
                                {lastStep?.title}
                            </span>
                        </div>

                    )}

                    {nextStep && (
                        <div className='flex gap-x-1 items-center'>
                            <span className='w-[14px] text-red-600'>
                                <ArrowUturnRightIcon />
                            </span>
                            <span className='text-[12px]'>
                                {nextStep?.title}
                            </span>
                        </div>
                    )}

                    <div className='flex gap-x-1 items-center'>
                        <span className='w-[14px] clock'>
                            <ClockIcon />
                        </span>
                        <span className='text-[10px]'>
                            {progress.deadline ? '' : "not set"}
                        </span>
                    </div>

                </div>

                <CircleProgressBar themeIndex={progress.theme} percentage={pg} />

            </div>


        </div>
    )
}

export default MiniProgress
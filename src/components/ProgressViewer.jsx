import React, { useEffect } from 'react'
import useProgressesStore from '../../store/progresses-store';
import { deadlineToMoment } from '../../helpers/helpers';
import CircleProgressBar from './CircleProgressBar';
import ArrowUturnRightIcon from './icons/ArrowUturnRightIcon';
import CheckIcon from './icons/CheckIcon';
import moment from 'moment';
import ArrowUturnLeftIcon from './icons/ArrowUturnLeftIcon';
import ChevronDoubleRightIcon from './icons/ChevronDoubleRightIcon';

function ProgressViewer() {

    useEffect(() => {
        // this will disable the scroll if our back page was scrollable
        document.body.classList.add("overflow-hidden");
        // when you close the modal, remove this class 
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const { viewingProgress, setViewingProgress } = useProgressesStore()

    let reversedSteps = [...viewingProgress.steps].reverse()
    let passedSteps = reversedSteps.filter(st => st.status)
    let pg = Math.floor((passedSteps.length / viewingProgress.steps.length) * 100);
    let lastStep = passedSteps[passedSteps.length - 1]
    let nextStep = reversedSteps[passedSteps.length]


    function handleCloseViewer() {
        setViewingProgress(null)
    }
    return (
        <section className='relative'>
            <div className={`fixed w-full max-w-[600px] h-full overflow-y-scroll left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[99999] flex flex-col gap-y-2 bg-slate-900 p-5`}>


                <div className='flex flex-col gap-y-8'>

                    <div className='flex'>
                        <h1 className='text-3xl font-bold leading-relaxed text-white'>{viewingProgress.title}</h1>
                    </div>

                    <div className='mt-2 grid grid-cols-2 gap-4'>

                        <div className='col-span-1 rounded-3xl p-5 border-2 border-red-300 relative'>
                            <label className='absolute top-0 left-1/2 -translate-x-1/2 px-3 -translate-y-1/2 bg-slate-900 text-base text-red-300'>Importance</label>
                            <div className='px-3 py-2 text-center text-sm font-bold text-white bg-red-600 rounded-3xl'>HIGH</div>
                        </div>
                        <div className='col-span-1 rounded-3xl p-5 border-2 border-gray-300 relative'>
                            <label className='absolute top-0 left-1/2 -translate-x-1/2 px-3 -translate-y-1/2 bg-slate-900 text-base text-gray-300'>Label</label>
                            <div className='px-3 py-2 text-center text-sm font-bold text-black bg-gray-300 rounded-3xl'>Work</div>
                        </div>
                    </div>

                    <div className={`rounded-3xl p-5 border-2 pg-viewer-border-theme-${viewingProgress.theme} relative`}>
                        <label className={`absolute top-0 left-1/2 -translate-x-1/2 px-3 -translate-y-1/2 bg-slate-900 text-base pg-viewer-text-theme-${viewingProgress.theme}`}>Deadline</label>
                        {viewingProgress.deadline ? (
                            <div className={`flex justify-between items-center pg-viewer-text-theme-${viewingProgress.theme}`}>
                                <p className={`font-bold text-lg`}>{viewingProgress.deadline.split('-').join('/')}</p>
                                <div className='w-6'>
                                    <ChevronDoubleRightIcon />
                                </div>
                                <p className={`font-bold text-lg`}>{moment(deadlineToMoment(viewingProgress.deadline)).toNow(true) + ' left'}</p>
                            </div>
                        ) : (<p className='text-emerald-600 text-xl'>You've got all the time in the world</p>)}


                    </div>


                    <div className='flex justify-between items-start bg-slate-800 rounded-3xl p-2  pl-4'>
                        <div className='self-center flex flex-col gap-y-2 text-white'>

                            {lastStep && (
                                <div className='flex gap-x-2 items-center text-emerald-600'>
                                    <span className='w-6 '>
                                        <CheckIcon />
                                    </span>
                                    <span className='text-lg line-clamp-1'>
                                        {lastStep.title}
                                    </span>
                                </div>)}
                            {nextStep && (
                                <div className='flex gap-x-2 items-center text-red-600'>
                                    <span className='w-6'>
                                        <ArrowUturnRightIcon />
                                    </span>
                                    <span className='text-lg line-clamp-1'>
                                        {nextStep.title}
                                    </span>
                                </div>
                            )}
                            <span className=''>{passedSteps.length} Done, {reversedSteps.length - passedSteps.length} Left</span>
                        </div>
                        <div className='w-1/2 text-5xl'>
                            <CircleProgressBar percentage={pg} themeIndex={viewingProgress.theme} />
                        </div>
                    </div>


                    <div className='flex flex-col gap-y-2 pb-10'>
                        <h1 className='text-2xl text-white'>Steps <span className={`text-lg font-bold pg-viewer-text-theme-${viewingProgress.theme}`}>{reversedSteps.length}</span></h1>

                        <div className='mt-4 flex flex-col'>

                            {reversedSteps.map((st, index) => {


                                return (
                                    <>
                                        <div className='flex flex-nowrap gap-x-4 items-center'>
                                            <div className={`w-5 h-5 aspect-square rounded-full bg-transparent outline outline-4 pg-viewer-outline-theme-${viewingProgress.theme}`}></div>
                                            <p className='text-white text-base line-clamp-1'>{st.title}</p>
                                        </div>
                                        {index !== (reversedSteps.length - 1) && (
                                            <div className={`w-1 h-10 ml-[0.5rem] pg-viewer-bg-theme-${viewingProgress.theme}`}></div>
                                        )}
                                    </>
                                )


                            })}



                        </div>

                    </div>
                </div>
            </div>
            <button
                onClick={handleCloseViewer}
                className='fixed z-[99999] shadow-md shadow-black bottom-10 right-8 w-14 flex justify-center items-center aspect-square rotate-45 rounded-md bg-gray-700'>
                <span className='w-6 -rotate-45 text-white'>
                    <ArrowUturnLeftIcon />
                </span>
            </button>
        </section>
    )
}

export default ProgressViewer
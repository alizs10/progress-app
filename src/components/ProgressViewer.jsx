import React, { useEffect } from 'react'
import useProgressesStore from '../../store/progresses-store';
import { deadlineToMoment } from '../../helpers/helpers';
import CircleProgressBar from './CircleProgressBar';
import ArrowUturnRightIcon from './icons/ArrowUturnRightIcon';
import CheckIcon from './icons/CheckIcon';
import moment from 'moment';
import ArrowUturnLeftIcon from './icons/ArrowUturnLeftIcon';
import ChevronDoubleRightIcon from './icons/ChevronDoubleRightIcon';
import { motion } from 'framer-motion'

function ProgressViewer() {

    useEffect(() => {
        // this will disable the scroll if our back page was scrollable
        document.body.classList.add("overflow-hidden");
        // when you close the modal, remove this class 
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const { viewingProgress, setViewingProgressVis, labels, importanceValues } = useProgressesStore()

    let reversedSteps = [...viewingProgress.steps].sort((a, b) => a.number - b.number)
    let passedSteps = reversedSteps.filter(st => st.status)
    let pg = Math.floor((passedSteps.length / viewingProgress.steps.length) * 100);
    let lastStep = passedSteps[passedSteps.length - 1]
    let nextStep = reversedSteps[passedSteps.length]

    let progressLabel = labels.filter(lb => lb._id === viewingProgress.label)[0]
    let progressImportance = importanceValues.filter(imp => imp._id === viewingProgress.importance)[0]

    function handleCloseViewer() {
        setViewingProgressVis(false)
    }
    return (
        <section className='relative'>
            <motion.div
                initial={{ x: '100%', y: '-50%', opacity: 0 }}
                animate={{ x: '-50%', opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ bounce: 'none', duration: '.3' }}
                className={`fixed w-full max-w-[600px] h-full z-[99999] overflow-y-scroll left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col gap-y-2 bg-slate-900 p-5`}>
                <div className='flex flex-col gap-y-8'>

                    <div className='flex'>
                        <h1 className='text-3xl font-bold leading-relaxed text-white'>{viewingProgress.title}</h1>
                    </div>

                    <div className='grid grid-cols-2 gap-4 mt-2'>

                        <div className={`col-span-1 rounded-3xl p-5 border-2 pg-imp-border-${progressImportance._id} relative`}>
                            <label className='absolute top-0 px-3 text-base -translate-x-1/2 -translate-y-1/2 left-1/2 bg-slate-900'>Importance</label>
                            <div className={`px-3 py-2 text-center text-sm font-bold text-white pg-imp-${progressImportance._id} rounded-3xl`}>{progressImportance.name}</div>
                        </div>
                        <div className='relative col-span-1 p-5 border-2 border-gray-300 rounded-3xl'>
                            <label className='absolute top-0 px-3 text-base text-gray-300 -translate-x-1/2 -translate-y-1/2 left-1/2 bg-slate-900'>Label</label>
                            <div className='px-3 py-2 text-sm font-bold text-center text-black bg-gray-300 rounded-3xl'>{progressLabel.name}</div>
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
                        ) : (<p className={`text-xl pg-viewer-text-theme-${viewingProgress.theme}`}>You've got all the time in the world</p>)}


                    </div>


                    <div className='flex items-start justify-between p-2 pl-4 bg-slate-800 rounded-3xl'>
                        <div className='flex flex-col self-center text-white gap-y-2'>

                            {lastStep && (
                                <div className='flex items-center gap-x-2 text-emerald-600'>
                                    <span className='w-6 '>
                                        <CheckIcon />
                                    </span>
                                    <span className='text-lg line-clamp-1'>
                                        {lastStep.title !== '' ? lastStep.title : `step ${lastStep.number}`}
                                    </span>
                                </div>)}
                            {nextStep && (
                                <div className='flex items-center text-red-600 gap-x-2'>
                                    <span className='w-6'>
                                        <ArrowUturnRightIcon />
                                    </span>
                                    <span className='text-lg line-clamp-1'>
                                        {nextStep.title !== '' ? nextStep.title : `step ${nextStep.number}`}
                                    </span>
                                </div>
                            )}
                            <span className=''>{passedSteps.length} Done, {reversedSteps.length - passedSteps.length} Left</span>
                        </div>
                        <div className='w-1/2 text-5xl'>
                            <CircleProgressBar percentage={pg} themeIndex={viewingProgress.theme} />
                        </div>
                    </div>


                    <div className='flex flex-col pb-10 gap-y-2'>
                        <h1 className='text-2xl text-white'>Steps <span className={`text-lg font-bold pg-viewer-text-theme-${viewingProgress.theme}`}>{reversedSteps.length}</span></h1>

                        <div className='flex flex-col mt-4'>

                            {reversedSteps.map((st, index) => {
                                return (
                                    <div key={st._id}>
                                        <div className='flex items-center flex-nowrap gap-x-4'>
                                            <div className={`w-5 h-5 relative aspect-square rounded-full bg-transparent outline outline-4 pg-viewer-outline-theme-${viewingProgress.theme}`}>
                                                {st.status && (<div className={`absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 w-3 pg-viewer-text-theme-${viewingProgress.theme}`}>
                                                    <CheckIcon />
                                                </div>)}
                                            </div>
                                            <p className='text-base text-white line-clamp-1'>{st.title !== '' ? st.title : `step ${st.number}`}</p>
                                        </div>
                                        {index !== (reversedSteps.length - 1) && (
                                            <div className={`w-1 h-10 ml-[0.5rem] pg-viewer-bg-theme-${viewingProgress.theme}`}></div>
                                        )}
                                    </div>
                                )


                            })}



                        </div>

                    </div>
                </div>
            </motion.div>
            <div className='fixed inset-0 left-1/2 -translate-x-1/2 w-full z-[99999] pointer-events-none max-w-[600px]'>
                <motion.button
                    initial={{ scale: 0, rotate: 45 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ bounce: 'none', duration: '.3' }}
                    onClick={handleCloseViewer}
                    className='fixed z-[99999] shadow-md shadow-black pointer-events-auto bottom-10 right-8 w-14 flex justify-center items-center aspect-square rotate-45 rounded-md bg-gray-700'>
                    <span className='w-6 text-white -rotate-45'>
                        <ArrowUturnLeftIcon />
                    </span>
                </motion.button>
            </div>
        </section>
    )
}

export default ProgressViewer
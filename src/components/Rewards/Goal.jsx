import React, { useRef, useState } from 'react'
import PrizeCongratsWindow from './PrizeCongratsWindow'
import { AnimatePresence } from 'framer-motion'
import useProgressesStore from '../../../store/progresses-store'
import { useSwipeable } from 'react-swipeable'
import { configs } from '../../../lib/swipeable'
import { motion } from 'framer-motion'
import TrashIcon from '../icons/TrashIcon'
import EditIcon from '../icons/EditIcon'
import DeleteGoalWindow from './DeleteGoalWindow'
import { useNotificationsStore } from '../../../store/notification-store'
import EditGoalWindow from './EditGoalWindow'

function Goal({ goal }) {

    let targeted = goal.targets.filter(t => t.status)
    let percent = Math.floor(targeted.length / goal.targets.length * 100)

    const [congratsVis, setCongratsVis] = useState(false)
    const { updateGoal, addPrize, deleteGoal } = useProgressesStore()
    const { addNotification, removeNotification } = useNotificationsStore()

    function handleGetPrize() {
        console.log("get prize")
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

    const [optionsVis, setOptionsVis] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)


    function expandGoal() {
        setIsExpanded(true)
    }
    function shrinkGoal() {
        setIsExpanded(false)
    }

    function onSwipedRight() {
        setOptionsVis(false)
    }
    function onSwipedLeft() {
        setOptionsVis(true)
    }

    function onTap({ event }) {
        if (event.target !== getPrizeBtnRef.current) {
            isExpanded ? shrinkGoal() : expandGoal()
        }
    }

    // swipeable
    const handlers = useSwipeable({
        onSwipedLeft,
        onSwipedRight,
        onTap,
        ...configs,
    });

    const getPrizeBtnRef = useRef()

    const [editGoalWindowVis, setEditGoalWindowVis] = useState(false)
    const [deleteGoalWindowVis, setDeleteGoalWindowVis] = useState(false)

    function handleConfirmDelete() {

        deleteGoal(goal._id)
        setDeleteGoalWindowVis(false)

        let newNotify = {
            _id: Date.now(),
            index: 0,
            message: 'goal deleted permanently!',
            status: 1
        }
        addNotification(newNotify)
        setTimeout(() => {
            removeNotification(newNotify._id)
        }, 3000)
    }

    function handleCancelDelete() {
        setDeleteGoalWindowVis(false)
    }
    function handleCloseEditWindow() {
        setEditGoalWindowVis(false)
        setOptionsVis(false)
    }
    return (
        <div className='relative'>
            <AnimatePresence>
                {editGoalWindowVis && (<EditGoalWindow goal={goal} handleClose={handleCloseEditWindow} />)}
            </AnimatePresence>
            <AnimatePresence>
                {deleteGoalWindowVis && (<DeleteGoalWindow goal={goal} handleConfirm={handleConfirmDelete} handleCancel={handleCancelDelete} />)}
            </AnimatePresence>
            <AnimatePresence>

                {optionsVis && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: '0' }}
                        exit={{ x: '100%' }}
                        transition={{ bounce: 'none' }}
                        className="absolute inset-0 left-[70%] z-0 flex justify-end items-center gap-x-2">
                        <button onClick={() => setEditGoalWindowVis(true)} className="rounded-full p-2 shadow-lg shadow-black bg-yellow-50 hover:bg-yellow-100 transition-all duration-300">
                            <div className="w-6 h-6 text-yellow-600"><EditIcon /></div>
                        </button>
                        <button onClick={() => setDeleteGoalWindowVis(true)} className="rounded-full p-2 shadow-lg shadow-black bg-red-50 hover:bg-red-100 transition-all duration-300">
                            <div className="w-6 h-6 text-red-600"><TrashIcon /></div>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                animate={{ x: optionsVis ? '-30%' : '0' }}
                transition={{ bounce: 'none' }}
                {...handlers}

                className='p-3 z-20 rounded-3xl select-none shadow-sm shadow-black from-blue-950 via-violet-950 from-10% via-50% to-90% to-transparent bg-gradient-to-r flex flex-col'>

                <div className="flex justify-between item-start my-2">
                    <div className="flex gap-x-2 items-center">
                        <h2 className='text-lg font-bold text-white capitalize line-clamp-1'>{goal.title}</h2>
                        {goal.status && (
                            <div className="h-fit rounded-xl py-[3px] px-[12px] text-xs capitalize text-black font-bold bg-emerald-400 shadow-sm shadow-black">done</div>
                        )}
                    </div>

                    <button ref={getPrizeBtnRef} onClick={handleGetPrize} disabled={goal.status ? false : true} className='px-2 py-1 text-xs text-black rounded-3xl bg-yellow-400 disabled:opacity-40'>
                        {goal.isPrized ? 'Received' : 'Get Prize'}
                    </button>
                </div>

                <AnimatePresence initial={false}>
                    {isExpanded && (

                        <motion.div
                            key="content"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { opacity: 1, height: "auto" },
                                collapsed: { opacity: 0, height: 0 }
                            }}
                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="flex flex-col gap-y-2 ">
                            {goal.targets.map(target => (
                                <div
                                    key={target._id}
                                    className='flex gap-x-2 items-center'>
                                    <div className={`rounded-sm border-2 border-emerald-600 flex w-3 h-3 ${target.status && 'bg-emerald-400'}`}></div>
                                    <span className='text-gray-200  text-xs'>{target.title}</span>
                                </div>
                            ))}

                        </motion.div>
                    )}
                </AnimatePresence>
                {percent < 100 && (
                    <div className="flex flex-col gap-y-1 items-center justify-between mt-2">
                        <div className="w-full flex justify-between items-center">
                            <div className="h-fit rounded-xl py-[3px] px-[12px] text-[10px] text-white bg-gray-900 shadow-sm shadow-black">{targeted.length}/{goal.targets.length}</div>
                            <div className="w-full flex justify-end min-w-fit text-emerald-400">
                                <div className="leading-none">
                                    <span className="text-2xl font-bold">{percent}<span className='ml-1 text-[10px]'>%</span></span>
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-fit relative border-2 border-emerald-400 rounded-full p-[2px] overflow-hidden'>
                            <div style={{ right: 100 - percent + '%' }} className="absolute inset-0 bg-emerald-400"></div>
                        </div>
                    </div>
                )}




            </motion.div>
            <AnimatePresence>

                {congratsVis && (

                    <PrizeCongratsWindow prize={goal.prize} handleClose={handleCloseCongratsWindow} />

                )}
            </AnimatePresence>
        </div>

    )
}

export default Goal
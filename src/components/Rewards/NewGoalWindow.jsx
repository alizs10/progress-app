import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import XIcon from '../icons/XIcon'
import CheckboxInput from '../ui/CheckboxInput'
import useProgressesStore from '../../../store/progresses-store'

function NewGoalWindow({ handleClose, handleCreateNewGoal }) {
    const [errors, setErrors] = useState({})
    const titleRef = useRef()
    const prizeRef = useRef()

    const [checkedItems, setCheckedItems] = useState([])

    function toggleCheckbox(itemId) {
        setCheckedItems(prevState => {
            if (!prevState.includes(itemId)) {
                return [...prevState, itemId]
            } else {
                return prevState.filter(id => itemId !== id)
            }
        })
    }

    const { data: progresses, addGoal } = useProgressesStore()

    function handleCreateNewGoal() {
        let newGoalObj = {
            _id: new Date().getTime(),
            title: titleRef.current.value,
            prize: prizeRef.current.value,
            isPrized: false
        }

        let selectedProgresses = progresses.filter(pg => checkedItems.includes(pg._id))

        newGoalObj.targets = selectedProgresses

        addGoal(newGoalObj)
        handleClose()

    }

    return (
        <motion.div
            initial={{ backdropFilter: 'blur(4px) opacity(0)' }}
            animate={{ backdropFilter: 'blur(4px) opacity(1)' }}
            exit={{ backdropFilter: 'blur(4px) opacity(0)' }}
            transition={{ bounce: 'none', duration: '.3' }}
            onClick={handleClose}
            className='fixed inset-0 z-[999999] backdrop-blur-sm'>

            <motion.div
                initial={{ scale: 0, x: "-50%", y: '-50%' }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ bounce: 'none', duration: '.3' }}
                onClick={e => e.stopPropagation()}
                className='fixed flex flex-col gap-y-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden shadow-md shadow-black w-[80vw] bg-slate-800 max-w-[480px]'>
                <div className='p-5 flex justify-between items-center'>
                    <h1 className='text-white text-xl font-bold'>New Goal</h1>
                    <div className='w-fit cursor-pointer bg-slate-900 rounded-xl p-1'>
                        <div
                            onClick={handleClose}
                            className='w-5 text-red-600'>
                            <XIcon />
                        </div>
                    </div>
                </div>

                <div className='px-5 grid grid-cols-2 gap-y-4'>
                    <div className='col-span-2 flex flex-col gap-y-1'>
                        <input ref={titleRef} type="text" className={`text-input ${errors?.title && 'outline outline-2 outline-red-600'}`} placeholder='Title' />
                        {errors?.title && (<span className='text-xs text-red-600'>{errors.title}</span>)}
                    </div>
                    <div className='col-span-2 flex flex-col gap-y-1'>
                        <input ref={prizeRef} type="text" className={`text-input ${errors?.prize && 'outline outline-2 outline-red-600'}`} placeholder='Prize' />
                        {errors?.prize && (<span className='text-xs text-red-600'>{errors.prize}</span>)}
                    </div>
                    <div className="col-span-2 flex flex-col gap-y-2">
                        <h2 className='text-md text-gray-400'>List of progresses</h2>

                        {progresses.map(pg => (
                            <div key={pg._id} className="flex items-center gap-x-2">
                                <CheckboxInput handleToggle={() => toggleCheckbox(pg._id)} value={checkedItems.includes(pg._id)} />
                                <label onClick={() => toggleCheckbox(pg._id)} className="select-none text-lg text-white flex gap-x-2 items-center">
                                    {pg.title}
                                </label>
                            </div>
                        ))}



                    </div>


                </div>


                <button
                    onClick={handleCreateNewGoal}
                    className='m-5 py-2 rounded-xl bg-emerald-600 text-white text-lg'>
                    Create
                </button>

            </motion.div>

        </motion.div >
    )
}

export default NewGoalWindow
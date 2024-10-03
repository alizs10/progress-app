import React, { useEffect, useRef, useState } from 'react'
import XIcon from './icons/XIcon';
import CheckBox from './CheckBox';
import InfoIcon from './icons/InfoIcon';
import ThemeSelector from './ThemeSelector';
import useProgressesStore from '../../store/progresses-store';
import { zValidate } from '../../helpers/helpers';
import { progressSchema } from '../../helpers/progressValidations';
import Dropdown from './Dropdown';
import { useNotificationsStore } from '../../store/notification-store';
import { motion } from 'framer-motion'

function NewProgressWindow({ handleClose }) {

    useEffect(() => {
        // this will disable the scroll if our back page was scrollable
        document.body.classList.add("overflow-hidden");
        // when you close the modal, remove this class 
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const { addNotification, removeNotification } = useNotificationsStore()
    const { addProgress, labels, importanceValues } = useProgressesStore()

    let labelsOptions = labels.map(lb => ({ name: lb.name, value: lb._id }))
    let importanceOptions = importanceValues.map(imp => ({ name: imp.name, value: imp._id }))

    const themes = [0, 1, 2, 3, 4, 5]
    const [progressTheme, setProgressTheme] = useState(0)
    const [progressLabel, setProgressLabel] = useState(0)
    const [progressImportance, setProgressImportance] = useState(0)
    const [themeSelectorVis, setThemeSelectorVis] = useState(false)
    const [hasDeadline, setHasDeadline] = useState(false)
    const [errors, setErrors] = useState({})

    function toggleHasDeadline() {
        setHasDeadline(prevState => !prevState)
    }

    function handleOpenThemeSelector() {
        setThemeSelectorVis(true)
    }

    function handleOpenThemeSelector() {
        setThemeSelectorVis(true)
    }
    function handleSelectTheme(index) {
        setProgressTheme(index)
        setThemeSelectorVis(false)
    }

    function handleChangeLabel(labelId) {
        setProgressLabel(labelId)
    }
    function handleChangeImportance(importanceId) {
        setProgressImportance(importanceId)
    }

    function handleCreateNewProgress() {

        let newPg = {
            _id: new Date().getTime(),
            title: titleRef.current.value,
            steps: [],
            deadline: hasDeadline ? deadlineRef.current.value : false,
            pin: false,
            label: progressLabel,
            importance: progressImportance,
            theme: progressTheme
        }

        while (newPg.steps.length < stepsRef.current.value) {
            newPg.steps.push({ _id: newPg._id + newPg.steps.length + 1, title: '', number: parseInt(stepsRef.current.value - newPg.steps.length), status: false })
        }

        let { hasError, errors: validationErrors } = zValidate(progressSchema, newPg)

        if (!hasError) {
            addProgress(newPg)
            handleClose()

            let newNotify = {
                _id: Date.now(),
                index: 0,
                message: "progress created successfully",
                status: 0
            }
            addNotification(newNotify)
            setTimeout(() => {
                removeNotification(newNotify._id)
            }, 3000)

        } else {
            setErrors(validationErrors)

            let newNotify = {
                _id: Date.now(),
                index: 0,
                message: "error while creating progress",
                status: 1
            }
            addNotification(newNotify)
            setTimeout(() => {
                removeNotification(newNotify._id)
            }, 3000)
        }

    }

    let d = new Date;
    let tomorrow = `${d.getFullYear()}-${d.getMonth() + 1 < 10 ? '0' + d.getMonth() + 1 : d.getMonth() + 1}-${d.getDate() + 1}`


    const titleRef = useRef()
    const stepsRef = useRef()
    const deadlineRef = useRef()

    return (
        <motion.div
            initial={{ backdropFilter: 'blur(4px) opacity(0)' }}
            animate={{ backdropFilter: 'blur(4px) opacity(1)' }}
            exit={{ backdropFilter: 'blur(4px) opacity(0)' }}
            transition={{ bounce: 'none', duration: '.3' }}
            onClick={handleClose}
            className='fixed inset-0 z-[9999] flex justify-center items-center'>
            {themeSelectorVis && (
                <ThemeSelector themes={themes} progressTheme={progressTheme} handleSelectTheme={handleSelectTheme} />
            )}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ bounce: 'none', duration: '.3' }}
                onClick={e => e.stopPropagation()}
                className='flex flex-col gap-y-4 rounded-xl overflow-hidden shadow-md shadow-black w-[80vw] bg-slate-800 max-w-[480px]'>
                <div className='flex items-center justify-between p-5 pb-0'>
                    <h1 className='text-xl font-bold text-white'>New Progress</h1>
                    <div className='p-1 bg-red-600 rounded-full cursor-pointer w-fit'>
                        <div
                            onClick={handleClose}
                            className='w-5 text-white'>
                            <XIcon />
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-2 p-5 gap-y-2'>
                    <div className='flex flex-col col-span-2 gap-y-1'>
                        <label className='text-sm text-white'>Title</label>
                        <input ref={titleRef} type="text" className={`text-input ${errors?.title && 'outline outline-2 outline-red-600'}`} placeholder='Progress title' />
                        {errors?.title && (<span className='text-xs text-red-600'>{errors.title}</span>)}
                    </div>
                    <div className='flex flex-col col-span-2 gap-y-1'>
                        <label className='text-sm text-white'>Steps</label>
                        <input ref={stepsRef} type="number" className={`text-input ${errors?.steps && 'outline outline-2 outline-red-600'}`} placeholder='10' defaultValue={1} min={1} max={100} />
                        {errors?.steps && (<span className='text-xs text-red-600'>{errors.steps}</span>)}
                    </div>
                    <div className='flex items-center justify-between col-span-2 mt-2'>
                        <label className='text-sm text-white'>Label</label>
                        <div className='w-1/2'>
                            <Dropdown options={labelsOptions} value={progressLabel} handleChange={handleChangeLabel} />
                        </div>
                    </div>
                    <div className='flex items-center justify-between col-span-2 mt-2'>
                        <label className='text-sm text-white'>Importance</label>
                        <div className='w-1/2'>
                            <Dropdown options={importanceOptions} value={progressImportance} handleChange={handleChangeImportance} />
                        </div>
                    </div>
                    <div className='flex items-center justify-between col-span-2 mt-2'>
                        <label className='text-sm text-white'>Deadline</label>
                        <CheckBox handleToggle={toggleHasDeadline} value={hasDeadline} />
                    </div>
                    {hasDeadline && (
                        <div className='flex flex-col col-span-2 gap-y-1'>
                            <label className='text-sm text-white'>Deadline</label>
                            <input ref={deadlineRef} type="date" className={`text-input ${errors?.deadline && 'outline outline-2 outline-red-600'}`} min={tomorrow} defaultValue={tomorrow} />
                            {errors?.deadline && (<span className='text-xs text-red-600'>{errors.deadline}</span>)}
                        </div>
                    )}
                    <div className='flex items-center justify-between col-span-2 mt-2'>
                        <label className='text-sm text-white'>Theme</label>
                        <div
                            onClick={handleOpenThemeSelector}
                            className={`w-8 aspect-square border-2 border-gray-500 pg-bar-theme-${progressTheme} rounded-full`}></div>
                    </div>


                    <div className='flex items-center col-span-2 text-xs text-white'>
                        <span className='w-5 mr-2 text-gray-200'>
                            <InfoIcon />
                        </span>
                        <span>define steps later in progress editor if you want.</span>
                    </div>

                </div>


                <button
                    onClick={handleCreateNewProgress}
                    className='py-2 mt-auto text-lg text-white bg-emerald-600'>
                    Create
                </button>

            </motion.div>

        </motion.div>
    )
}

export default NewProgressWindow
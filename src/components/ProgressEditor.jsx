import React, { useEffect, useRef, useState } from 'react'
import CheckBox from './CheckBox';
import TrashIcon from './icons/TrashIcon';
import XIcon from './icons/XIcon';
import ThemeSelector from './ThemeSelector';
import useProgressesStore from '../../store/progresses-store';
import { zValidate } from '../../helpers/helpers';
import { progressSchema } from '../../helpers/progressValidations';
import DeleteProgressConfirmationWindow from './DeleteProgressConfirmationWindow';

function ProgressEditor() {

    useEffect(() => {
        // this will disable the scroll if our back page was scrollable
        document.body.classList.add("overflow-hidden");
        // when you close the modal, remove this class 
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const { editingProgress, setEditingProgress, updateProgress, setDeleteConfirmationVis } = useProgressesStore()

    const themes = [0, 1, 2, 3, 4, 5]
    const [progressTheme, setProgressTheme] = useState(editingProgress.theme)
    const [themeSelectorVis, setThemeSelectorVis] = useState(false)
    const [hasDeadline, setHasDeadline] = useState(editingProgress.deadline ? true : false)
    const [wantsDefineSteps, setWantsDefineSteps] = useState(false)
    const [steps, setSteps] = useState(editingProgress.steps)
    const [errors, setErrors] = useState({})
    const [stepsCount, setStepsCount] = useState(editingProgress.steps.length)

    let d = new Date;
    let tomorrow = `${d.getFullYear()}-${d.getMonth() + 1 < 10 ? '0' + d.getMonth() + 1 : d.getMonth() + 1}-${d.getDate() + 1}`


    const titleRef = useRef()
    const deadlineRef = useRef()

    useEffect(() => {

        if (wantsDefineSteps && stepsCount !== steps.length) {
            let diff = Math.abs(stepsCount - steps.length)
            if (stepsCount > steps.length) {
                // we add the diff
                let addableSteps = []
                while (addableSteps.length < diff) {
                    addableSteps.push({ _id: Date.now() + Math.random() * 1000, title: '', status: false })
                }
                setSteps(prevState => [...addableSteps, ...prevState])

            } else {
                // we sub the diff
                setSteps(prevState => [...prevState].reverse().slice(0, -diff).reverse())
            }
        }

    }, [stepsCount, wantsDefineSteps])

    useEffect(() => {

        if (!wantsDefineSteps && stepsCount !== steps.length) {
            setStepsCount(steps.length)
        }

    }, [steps, wantsDefineSteps])

    function toggleHasDeadline() {
        setHasDeadline(prevState => !prevState)
    }

    function toggleWantsDefineSteps() {
        setWantsDefineSteps(prevState => !prevState)
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

    function addStep() {
        let newSt = {
            _id: new Date().getTime(),
            title: '',
            status: false
        }

        setSteps(prevState => ([newSt, ...prevState]))
    }

    function removeStep(stId) {
        let filteredSteps = steps.filter(st => st._id !== stId)

        setSteps(filteredSteps)
    }

    function handleUpdateStep(stId, value) {
        let stepsIns = [...steps]
        let stepIndex = stepsIns.findIndex(st => st._id === stId)
        stepsIns[stepIndex].title = value

        setSteps(stepsIns)
    }

    function handleCloseEditor() {
        setEditingProgress(null)
    }

    function handleSaveProgress() {
        let updatedProgress = {
            _id: editingProgress._id,
            title: titleRef.current.value,
            theme: progressTheme,
            deadline: hasDeadline ? deadlineRef.current.value : false,
            steps: wantsDefineSteps ? steps : []
        }

        if (!wantsDefineSteps) {
            while (updatedProgress.steps.length < stepsCount) {
                updatedProgress.steps.push({ _id: updatedProgress._id + updatedProgress.steps.length + 1, title: 'step ' + parseInt(stepsCount - updatedProgress.steps.length), status: false })
            }
        }

        let { hasError, errors: validationErrors } = zValidate(progressSchema, updatedProgress)

        if (hasError) {
            setErrors(validationErrors)
            return
        }
        setErrors({})

        // we should update progress
        updateProgress(updatedProgress)
        handleCloseEditor()
    }


    function handleDeleteBtn() {
        setDeleteConfirmationVis(true)
    }

    return (
        <div className='fixed w-full max-w-[600px] h-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[99999] flex flex-col gap-y-2 bg-slate-800 p-5 overflow-y-scroll'>
            {themeSelectorVis && (
                <ThemeSelector themes={themes} progressTheme={progressTheme} handleSelectTheme={handleSelectTheme} />
            )}


            <div className='flex justify-between items-center'>
                <div className='flex gap-x-4 items-center'>
                    <button
                        onClick={handleCloseEditor}
                        className='px-3 py-1 text-sm text-white bg-gray-700 rounded-full'>back</button>
                    <h1 className='text-xl text-white font-bold'>Editor</h1>
                </div>
                <div className='flex gap-x-2 items-center'>

                    <button
                        onClick={handleDeleteBtn}
                        className='p-[6px] text-white font-bold bg-red-600 rounded-full'>
                        <div className='w-4'><TrashIcon /></div>
                    </button>
                    <button
                        onClick={handleSaveProgress}
                        className='px-3 py-1 text-sm text-white font-bold bg-emerald-600 rounded-full'>save</button>
                </div>
            </div>

            <div className='mt-8 flex flex-col gap-y-2'>
                <div className='col-span-2 flex flex-col gap-y-1'>
                    <input ref={titleRef} defaultValue={editingProgress.title} type="text" className={`text-input ${errors?.title && 'outline outline-2 outline-red-600'}`} placeholder='Progress title' />
                    {errors?.title && (<span className='text-xs text-red-600'>{errors.title}</span>)}
                </div>

                <div className='mt-2 col-span-2 flex items-center justify-between'>
                    <label className='text-sm text-white'>Deadline</label>
                    <CheckBox handleToggle={toggleHasDeadline} value={hasDeadline} />
                </div>
                {hasDeadline && (
                    <div className='mt-2 flex flex-col gap-y-1'>
                        <input ref={deadlineRef} type="date" className={`text-input ${errors?.deadline && 'outline outline-2 outline-red-600'}`} min={tomorrow} defaultValue={tomorrow} />
                        {errors?.deadline && (<span className='text-xs text-red-600'>{errors.deadline}</span>)}
                    </div>
                )}
                <div className='mt-2 col-span-2 flex items-center justify-between'>
                    <label className='text-sm text-white'>Theme</label>
                    <div
                        onClick={handleOpenThemeSelector}
                        className={`w-8 aspect-square border-2 border-gray-500 pg-bar-theme-${progressTheme} rounded-full`}></div>
                </div>

                <div className='mt-2 col-span-2 flex items-center justify-between'>
                    <label className='text-sm text-white'>Define Steps</label>
                    <CheckBox handleToggle={toggleWantsDefineSteps} value={wantsDefineSteps} />
                </div>

                {wantsDefineSteps ? (

                    <div className='mt-4 flex flex-col gap-y-2'>

                        <div className='flex justify-between items-center'>
                            <h2 className='text-base text-white font-bold'>Steps <span className='text-xs text-red-600'>{steps.length}</span></h2>
                            <button
                                onClick={addStep}
                                className='px-3 py-1 text-sm text-white font-bold bg-emerald-600 rounded-full'>add</button>
                        </div>


                        <div className='flex flex-col gap-y-1'>
                            <div className='col-span-2 flex flex-col gap-y-2'>
                                {steps.map(st => (
                                    <div key={st._id} className='grid grid-cols-6 gap-x-2'>
                                        <input
                                            onChange={e => handleUpdateStep(st._id, e.target.value)}
                                            value={st.title}
                                            type="text" className={`col-span-5 text-input ${errors?.title && 'outline outline-2 outline-red-600'}`} placeholder='step title' />
                                        <div className='col-span-1 flex justify-end mt-auto'>
                                            <button
                                                onClick={() => removeStep(st._id)}
                                                className='w-fit p-1 h-fit text-red-600 font-bold bg-red-100 rounded-full'>
                                                <div className='w-5'>
                                                    <XIcon />
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='mt-2 flex flex-col gap-y-1'>
                        <label className='text-sm text-white'>Steps</label>
                        <input type="number" value={stepsCount} onChange={e => setStepsCount(e.target.value)} className={`text-input ${errors?.steps && 'outline outline-2 outline-red-600'}`} placeholder='10' defaultValue={steps.length} min={1} max={100} />
                        {errors?.steps && (<span className='text-xs text-red-600'>{errors.steps}</span>)}
                    </div>
                )}

            </div>

        </div>
    )
}

export default ProgressEditor
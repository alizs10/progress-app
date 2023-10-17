import React, { useEffect, useRef, useState } from 'react'
import XIcon from './icons/XIcon';
import CheckBox from './CheckBox';
import InfoIcon from './icons/InfoIcon';
import ThemeSelector from './ThemeSelector';
import useProgressesStore from '../../store/progresses-store';

function NewProgressWindow({ handleClose }) {

    useEffect(() => {
        // this will disable the scroll if our back page was scrollable
        document.body.classList.add("overflow-hidden");
        // when you close the modal, remove this class 
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const { addProgress } = useProgressesStore()

    const themes = [0, 1, 2, 3, 4, 5]
    const [progressTheme, setProgressTheme] = useState(0)
    const [themeSelectorVis, setThemeSelectorVis] = useState(false)
    const [hasDeadline, setHasDeadline] = useState(false)

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

    function handleCreateNewProgress() {
        // _id, title, theme, deadline, steps
        // steps: _id, title, status

        let newPg = {
            _id: new Date().getTime(),
            title: titleRef.current.value,
            steps: [],
            deadline: hasDeadline ? deadlineRef.current.value : false,
            theme: progressTheme
        }

        while (newPg.steps.length < stepsRef.current.value) {
            newPg.steps.push({ _id: newPg._id + newPg.steps.length + 1, title: 'step ' + parseInt(newPg.steps.length + 1), status: false })
        }


        addProgress(newPg)
        handleClose()
    }

    let d = new Date;
    let tomorrow = `${d.getFullYear()}-${d.getMonth() + 1 < 10 ? '0' + d.getMonth() + 1 : d.getMonth() + 1}-${d.getDate() + 1}`


    const titleRef = useRef()
    const stepsRef = useRef()
    const deadlineRef = useRef()

    return (
        <div
            onClick={handleClose}
            className='fixed inset-0 z-[900] backdrop-blur-sm'>
            {themeSelectorVis && (
                <ThemeSelector themes={themes} progressTheme={progressTheme} handleSelectTheme={handleSelectTheme} />
            )}
            <div
                onClick={e => e.stopPropagation()}
                className='fixed flex flex-col gap-y-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden shadow-md shadow-black w-[80vw] bg-slate-800 max-w-[480px]'>
                <div className='p-5 pb-0 flex justify-between items-center'>
                    <h1 className='text-white text-xl font-bold'>New Progress</h1>
                    <div className='w-fit cursor-pointer bg-red-600 rounded-full p-1'>
                        <div
                            onClick={handleClose}
                            className='w-5 text-white'>
                            <XIcon />
                        </div>
                    </div>
                </div>

                <div className='p-5 grid grid-cols-2 gap-y-2'>
                    <div className='col-span-2 flex flex-col gap-y-1'>
                        <label className='text-sm text-white'>Title</label>
                        <input ref={titleRef} type="text" className='text-input' placeholder='Progress title' />
                    </div>
                    <div className='col-span-2 flex flex-col gap-y-1'>
                        <label className='text-sm text-white'>Steps</label>
                        <input ref={stepsRef} type="number" className='text-input' placeholder='10' defaultValue={1} min={1} max={100} />
                    </div>
                    <div className='mt-2 col-span-2 flex items-center justify-between'>
                        <label className='text-sm text-white'>Deadline</label>
                        <CheckBox handleToggle={toggleHasDeadline} value={hasDeadline} />
                    </div>
                    {hasDeadline && (
                        <div className='col-span-2 flex flex-col gap-y-1'>
                            <label className='text-sm text-white'>Steps</label>
                            <input ref={deadlineRef} type="date" className='text-input' min={tomorrow} defaultValue={tomorrow} />
                        </div>
                    )}
                    <div className='mt-2 col-span-2 flex items-center justify-between'>
                        <label className='text-sm text-white'>Theme</label>
                        <div
                            onClick={handleOpenThemeSelector}
                            className={`w-8 aspect-square border-2 border-gray-500 pg-bar-theme-${progressTheme} rounded-full`}></div>
                    </div>

                    <div className='col-span-2 text-white text-xs flex items-center'>
                        <span className='w-5 text-gray-200 mr-2'>
                            <InfoIcon />
                        </span>
                        <span>define steps later in progress editor if you want.</span>
                    </div>

                </div>


                <button
                    onClick={handleCreateNewProgress}
                    className='mt-auto bg-emerald-600 text-white text-lg py-2'>
                    Create
                </button>

            </div>

        </div >
    )
}

export default NewProgressWindow
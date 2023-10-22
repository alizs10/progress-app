import React, { useState } from 'react'
import PinIcon from './icons/PinIcon'
import EditIcon from './icons/EditIcon'
import TrashIcon from './icons/TrashIcon'
import useProgressesStore from '../../store/progresses-store'
import PinSlash from './icons/PinSlash'

function ProgressOptions({ progress, progressIndex }) {

    const { viewMode, setDeleteConfirmationVis, setProgressInFocus, setEditingProgress, updateProgress } = useProgressesStore()

    function handleTogglePin() {
        let updatableProgress = {
            _id: progress._id,
            pin: !progress.pin
        }

        updateProgress(updatableProgress)
        setProgressInFocus(null)
    }

    function handleDeleteBtn() {
        setDeleteConfirmationVis(true)
    }

    function handleEditProgress() {
        setEditingProgress(progress)
        setProgressInFocus(null)
    }

    return (
        <div className={`absolute ${viewMode === 0 ? ('bottom-0 translate-y-[120%] left-1/2 -translate-x-1/2') : (progressIndex % 2 === 0 ? 'flex-col bottom-2 right-0 translate-x-[120%]' : 'flex-col bottom-2 left-0 -translate-x-[120%]')} z-[9999] flex  gap-2`}>
            <button
                onClick={handleTogglePin}
                className='w-fit p-3 flex gap-x-2 items-center rounded-full bg-gray-300 fill-gray-700 text-lg text-center'>
                <div className='w-6'>
                    {progress.pin ? (<PinSlash />) : (<PinIcon />)}
                </div>
            </button>
            <button
                onClick={handleEditProgress}
                className='w-fit p-3 flex gap-x-2 items-center rounded-full bg-yellow-100 text-yellow-600 text-lg text-center'>
                <div className='w-6'>
                    <EditIcon />
                </div>
            </button>
            <button
                onClick={handleDeleteBtn}
                className='w-fit p-3 flex gap-x-2 items-center rounded-full bg-red-100 text-red-600 text-lg text-center'>
                <div className='w-6'>
                    <TrashIcon />
                </div>
            </button>
        </div>
    )
}

export default ProgressOptions
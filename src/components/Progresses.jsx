import React, { useEffect, useState } from 'react'
import Progress from './Progress'
import RowsIcon from './icons/RowsIcon'
import GridIcons from './icons/GridIcons'
import MiniProgress from './MiniProgress'
import useProgressesStore from '../../store/progresses-store'
import ProgressEditor from './ProgressEditor'
import FocusMode from './FocusMode'
import DeleteProgressConfirmationWindow from './DeleteProgressConfirmationWindow'

function Progresses() {


    const { viewMode, toggleViewMode, data, progresses, showUnDoneProgresses, showProgressesType, editingProgress, progressInFocus, setProgressInFocus, deleteConfirmationVis } = useProgressesStore()

    let progressesTypeStr;

    switch (showProgressesType) {
        case 0:
            progressesTypeStr = 'In Progresses'
            break;
        case 1:
            progressesTypeStr = 'All Progresses'
            break;
        case 2:
            progressesTypeStr = 'Completed Progresses'
            break;

        default:
            progressesTypeStr = 'All Progresses'
            break;
    }


    useEffect(() => {
        showUnDoneProgresses()

    }, [data])






    return (
        <div className='p-3 rounded-lg'>


            {editingProgress && (
                <ProgressEditor />
            )}
            <div className='mx-3 flex justify-between items-start'>
                <span className='text-gray-300 text-sm'>{progressesTypeStr} <span className='text-red-600 text-[12px]'>({progresses.length})</span></span>
                <button onClick={toggleViewMode} className='text-gray-500 text-xs fill-white flex justify-center items-center'>
                    {viewMode === 0 ? (
                        <GridIcons />
                    ) : (
                        <RowsIcon />
                    )}
                </button>
            </div>

            {progressInFocus && (<FocusMode />)}
            {deleteConfirmationVis && <DeleteProgressConfirmationWindow progress={progressInFocus} />}

            <div className='mt-4 grid grid-cols-2 gap-3 pb-20'>


                {progresses.map((pg, index) => viewMode === 1 ? <MiniProgress key={pg._id} index={index} progress={pg} /> : <Progress key={pg._id} index={index} progress={pg} />)}

            </div>
        </div>
    )
}

export default Progresses
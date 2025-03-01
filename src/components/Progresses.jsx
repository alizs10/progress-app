import React, { useEffect, useState } from 'react'
import Progress from './Progress'
import RowsIcon from './icons/RowsIcon'
import GridIcons from './icons/GridIcons'
import MiniProgress from './MiniProgress'
import useProgressesStore from '../../store/progresses-store'
import ProgressEditor from './ProgressEditor'
import FocusMode from './FocusMode'
import DeleteProgressConfirmationWindow from './DeleteProgressConfirmationWindow'
import ProgressViewer from './ProgressViewer'
import LabelsBar from './LabelsBar'
import NewLabelWindow from './NewLabelWindow'
import { AnimatePresence } from 'framer-motion'
import { Dot, Grid, LayoutGrid, StretchHorizontal } from 'lucide-react'
import Labels from './lables/Labels'

function Progresses() {


    const { viewMode, toggleViewMode, data, progresses, showProgresses, showProgressesType, editingProgressVis, progressInFocus, focusMode, deleteConfirmationVis, viewingProgressVis, selectedLabel } = useProgressesStore()

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
        showProgresses({ labelId: selectedLabel, pgType: showProgressesType })

    }, [data])


    let otherProgresses = progresses.filter(pg => !pg.pin && !pg.status)
    let pinnedProgresses = progresses.filter(pg => pg.pin && !pg.status)
    let completedProgresses = progresses.filter(pg => pg.status)


    const [newLabelWindowVis, setNewLabelWindowVis] = useState(false)

    return (
        <div className='mx-3 mt-6'>

            <Labels
                newLabelWindowVis={newLabelWindowVis}
                setNewLabelWindowVis={setNewLabelWindowVis}
            />

            {progresses.length === 0 ? (
                <div className='flex items-center justify-center p-10 text-xl text-gray-500'>
                    Add your first progress
                </div>
            ) : (
                <>

                    <AnimatePresence>
                        {editingProgressVis && (
                            <ProgressEditor />
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {viewingProgressVis && (
                            <ProgressViewer />
                        )}
                    </AnimatePresence>



                    <div className='flex items-start justify-between mx-3'>
                        <span className='flex flex-row items-center text-sm text-gray-300'>
                            <Dot className='size-5' />
                            {progressesTypeStr}
                            <span className='text-red-600 text-[12px]'>({progresses.length})</span></span>
                        <button onClick={toggleViewMode} className='flex items-center justify-center text-xs text-gray-500 fill-white'>
                            {viewMode === 0 ? (
                                <LayoutGrid className='size-5' />
                            ) : (
                                <StretchHorizontal className='size-5' />
                            )}
                        </button>
                    </div>
                    <AnimatePresence>
                        {focusMode && (<FocusMode />)}
                    </AnimatePresence>
                    <AnimatePresence>
                        {deleteConfirmationVis && <DeleteProgressConfirmationWindow progress={progressInFocus} />}
                    </AnimatePresence>

                    <AnimatePresence>
                        {pinnedProgresses.length > 0 && (

                            <div className='flex flex-col mx-3 mt-4 gap-y-2'>
                                <span className='text-sm text-gray-300'>
                                    <Dot className='size-5' />
                                    Pinned <span className='text-red-600 text-[12px]'>({pinnedProgresses.length})</span></span>
                                <div className='grid grid-cols-2 gap-3'>
                                    {pinnedProgresses.map((pg, index) => viewMode === 1 ? <MiniProgress key={pg._id} index={index} progress={pg} /> : <Progress key={pg._id} index={index} progress={pg} />)}
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {showProgressesType === 2 && completedProgresses.length > 0 && (

                            <div className='flex flex-col mx-3 mt-4 gap-y-2'>
                                <div className='grid grid-cols-2 gap-3'>
                                    {completedProgresses.map((pg, index) => viewMode === 1 ? <MiniProgress key={pg._id} index={index} progress={pg} /> : <Progress key={pg._id} index={index} progress={pg} />)}
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {showProgressesType !== 2 &&
                            (
                                <div className='flex flex-col mx-3 mt-4 gap-y-2'>
                                    <span className='flex flex-row items-center text-sm text-gray-300'>
                                        <Dot className='size-5' />
                                        Others <span className='text-red-600 text-[12px]'>({otherProgresses.length})</span></span>
                                    <div className='grid grid-cols-2 gap-3'>
                                        <AnimatePresence>
                                            {otherProgresses.map((pg, index) => viewMode === 1 ? <MiniProgress key={pg._id} index={index} progress={pg} /> : <Progress key={pg._id} index={index} progress={pg} />)}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {showProgressesType === 1 && (

                            <div className='flex flex-col mx-3 mt-4 gap-y-2'>
                                <span className='text-sm text-gray-300'>Completed <span className='text-red-600 text-[12px]'>({completedProgresses.length})</span></span>
                                <div className='grid grid-cols-2 gap-3'>
                                    {completedProgresses.map((pg, index) => viewMode === 1 ? <MiniProgress key={pg._id} index={index} progress={pg} /> : <Progress key={pg._id} index={index} progress={pg} />)}
                                </div>
                            </div>
                        )}
                    </AnimatePresence>

                </>
            )}



        </div>
    )
}

export default Progresses
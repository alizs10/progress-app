import React, { useState } from 'react'
import Progress from './Progress'
import RowsIcon from './icons/RowsIcon'
import GridIcons from './icons/GridIcons'
import MiniProgress from './MiniProgress'
import useProgressesStore from '../../store/progresses'

function Progresses() {

    const [viewMode, setViewMode] = useState(0)
    const { progresses } = useProgressesStore()

    return (
        <div className='p-3 rounded-lg'>
            <div className='mx-3 flex justify-between items-start'>
                <span className='text-gray-500 text-xs'>All Progresses <span className='text-red-600 text-[10px]'>({progresses.length})</span></span>
                <button onClick={() => setViewMode(prevState => prevState === 0 ? 1 : 0)} className='text-gray-500 text-xs fill-white flex justify-center items-center'>
                    {viewMode === 0 ? (
                        <GridIcons />
                    ) : (
                        <RowsIcon />
                    )}
                </button>
            </div>

            <div className='mt-4 grid grid-cols-2 gap-3 pb-20'>


                {progresses.map(pg => viewMode === 1 ? <MiniProgress key={pg._id} progress={pg} /> : <Progress key={pg._id} progress={pg} />)}

            </div>
        </div>
    )
}

export default Progresses
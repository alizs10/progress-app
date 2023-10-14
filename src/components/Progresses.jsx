import React, { useState } from 'react'
import Progress from './Progress'
import RowsIcon from './icons/RowsIcon'
import GridIcons from './icons/GridIcons'
import MiniProgress from './MiniProgress'

function Progresses() {

    const [viewMode, setViewMode] = useState(1)
    const [progresses, setProgresses] = useState([
        {
            _id: 0,
            title: "Read Sofia's world book",
            theme: 0,
            deadline: null,
            steps: [
                {
                    _id: 100,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 1005,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 10055,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 100555,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 1005555,
                    title: 'done',
                    status: true
                },
                {
                    _id: 100464,
                    title: 'undone',
                    status: false
                },
                {
                    _id: 10045498,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 10054548,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 100484,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 1006487777,
                    title: 'step title',
                    status: false
                },
            ]
        },
        {
            _id: 1,
            title: 'Progress 1',
            theme: 2,
            deadline: null,
            steps: [
                {
                    _id: 115450,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 114440,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 11088787,
                    title: 'step title',
                    status: false
                },

                {
                    _id: 11077799,
                    title: 'step title',
                    status: false
                },
            ]
        },
        {
            _id: 6,
            title: 'Progress 6',
            theme: 1,
            deadline: null,
            steps: [
                {
                    _id: 4444160,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 160454545455,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 1608897997,
                    title: 'step title',
                    status: false
                },
            ]
        },
        {
            _id: 7,
            title: 'Progress 7',
            theme: 5,
            deadline: null,
            steps: [
                {
                    _id: 174440,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 1707777777,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 17045488222,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 2222170,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 170222,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 1704,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 17079,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 17044444,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 170121,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 170789,
                    title: 'step title',
                    status: false
                },
            ]
        },
        {
            _id: 8,
            title: 'Progress 8',
            theme: 4,
            deadline: null,
            steps: [
                {
                    _id: 4547180,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 1809898,
                    title: 'step title',
                    status: false
                },
            ]
        },
        {
            _id: 9,
            title: 'Progress 9',
            theme: 3,
            deadline: null,
            steps: [
                {
                    _id: 55522190,
                    title: 'step title',
                    status: true
                },
                {
                    _id: 19048256,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 1908787878999,
                    title: 'step title',
                    status: false
                },
                {
                    _id: 1909996633,
                    title: 'step title',
                    status: false
                },
            ]
        },
        {
            _id: 10,
            title: 'Progress 0',
            theme: 0,
            deadline: null,
            steps: [
                {
                    _id: 15555500,
                    title: 'step title',
                    status: true
                }
            ]
        },
    ])

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
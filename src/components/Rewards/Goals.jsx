import React from 'react'
import Goal from './Goal'

function Goals() {

    let data = [
        {
            _id: 1,
            title: 'my first goal',
            targets: [
                {
                    _id: 1,
                    status: false
                },
                {
                    _id: 2,
                    status: false
                },
            ],
            prize: 'You can have sex',
            isPrized: false
        },
        {
            _id: 2,
            title: 'my second goal',
            targets: [
                {
                    _id: 1,
                    status: true
                },
                {
                    _id: 2,
                    status: false
                },
                {
                    _id: 3,
                    status: false
                },
            ],
            prize: 'You can have chocolate',
            isPrized: false
        },
        {
            _id: 3,
            title: 'my final goal',
            targets: [
                {
                    _id: 1,
                    status: true
                },
                {
                    _id: 2,
                    status: true
                },
                {
                    _id: 2,
                    status: true
                },
            ],
            prize: 'You can be god',
            isPrized: true
        },
    ]


    return (
        <div className='p-3 flex flex-col gap-y-3'>
            {data.map(goal => <Goal key={goal._id} goal={goal} />)}

        </div>
    )
}

export default Goals
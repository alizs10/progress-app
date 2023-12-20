import React from 'react'
import useProgressesStore from '../../store/progresses-store'
import PlusIcon from './icons/PlusIcon'

function LabelsBar({ setNewLabelWindowVis }) {

    const { labels, selectedLabel, selectLabel, showProgresses, showProgressesType } = useProgressesStore()

    function handleSelectLabel(labelId) {
        console.log(labelId);
        showProgresses({ labelId, pgType: showProgressesType })
    }
    return (
        <div className='w-full flex flex-nowrap gap-x-3 pt-1 px-3'>
            <div
                onClick={() => setNewLabelWindowVis(true)}
                className={`px-3 py-1 h-fit cursor-pointer rounded-3xl shadow-md shadow-black bg-gray-700 flex justify-center items-center text-white`}>
                <div className='w-5'>
                    <PlusIcon />
                </div>
            </div>

            <div className='overflow-x-scroll no-scrollbar flex flex-nowrap gap-x-3 pb-3'>


                {labels.map(label => (
                    <div
                        key={label._id}
                        onClick={() => handleSelectLabel(label._id)}
                        className={`px-3 py-1 cursor-pointer rounded-3xl ${label._id === selectedLabel ? 'bg-emerald-600' : 'bg-gray-700'} shadow-md shadow-black text-sm text-white`}>{label.name}</div>
                ))}
            </div>

        </div>
    )
}

export default LabelsBar
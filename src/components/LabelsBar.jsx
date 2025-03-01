import React from 'react'
import useProgressesStore from '../../store/progresses-store'
import PlusIcon from './icons/PlusIcon'
import { Plus } from 'lucide-react';

function LabelsBar({ setNewLabelWindowVis }) {

    const { labels, selectedLabel, selectLabel, showProgresses, showProgressesType } = useProgressesStore()

    function handleSelectLabel(labelId) {
        console.log(labelId);
        showProgresses({ labelId, pgType: showProgressesType })
    }
    return (
        <div className='flex w-full flex-nowrap gap-x-2'>
            <div
                onClick={() => setNewLabelWindowVis(true)}
                className={`px-3 py-1 h-fit cursor-pointer rounded-full bg-gray-800 flex justify-center items-center text-white`}>
                <Plus className='size-5' />
            </div>

            <div className='flex pb-3 overflow-x-scroll no-scrollbar flex-nowrap gap-x-2'>


                {labels.map(label => (
                    <div
                        key={label._id}
                        onClick={() => handleSelectLabel(label._id)}
                        className={`px-3 py-1 cursor-pointer rounded-full ${label._id === selectedLabel ? 'bg-emerald-600' : 'bg-gray-800'} text-sm text-white`}>{label.name}</div>
                ))}
            </div>

        </div>
    )
}

export default LabelsBar
import React from 'react'

function DeleteProgressConfirmationWindow({ progress, handleConfirm, handleCancel }) {
    return (
        <div
            onClick={e => e.stopPropagation()}
            className='p-5 fixed w-[70vw] max-w-[420px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-slate-800 z-[999] shadow-md shadow-black rounded-xl flex flex-col gap-4'>
            <h1 className='text-xl text-white font-bold'>Delete "{progress.title}"?</h1>
            <div className='grid grid-cols-2 gap-x-2'>
                <button
                    onClick={handleConfirm}
                    className='col-span-1 text-center py-2 text-base text-white font-bold bg-red-600 rounded-full'>Delete</button>
                <button
                    onClick={handleCancel}
                    className='col-span-1 text-center py-2 text-base text-white font-bold bg-gray-500 rounded-full'>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteProgressConfirmationWindow
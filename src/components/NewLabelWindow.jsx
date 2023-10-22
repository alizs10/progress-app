import React, { useEffect, useRef, useState } from 'react'
import XIcon from './icons/XIcon';
import useProgressesStore from '../../store/progresses-store';
import { zValidate } from '../../helpers/helpers';
import { labelSchema } from '../../helpers/labelValidations';

function NewLabelWindow({ handleClose }) {

    useEffect(() => {
        // this will disable the scroll if our back page was scrollable
        document.body.classList.add("overflow-hidden");
        // when you close the modal, remove this class 
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const { addLabel } = useProgressesStore()
    const [errors, setErrors] = useState({})


    function handleCreateNewLabel() {

        let newLabel = {
            _id: new Date().getTime(),
            name: nameRef.current.value,
        }

        let { hasError, errors: validationErrors } = zValidate(labelSchema, newLabel)

        if (!hasError) {
            addLabel(newLabel)
            handleClose()
        } else {
            setErrors(validationErrors)
        }

    }


    const nameRef = useRef()

    return (
        <div
            onClick={handleClose}
            className='fixed inset-0 z-[900] backdrop-blur-sm'>

            <div
                onClick={e => e.stopPropagation()}
                className='fixed flex flex-col gap-y-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden shadow-md shadow-black w-[80vw] bg-slate-800 max-w-[480px]'>
                <div className='p-5 pb-0 flex justify-between items-center'>
                    <h1 className='text-white text-xl font-bold'>New Label</h1>
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
                        <label className='text-sm text-white'>Name</label>
                        <input ref={nameRef} type="text" className={`text-input ${errors?.name && 'outline outline-2 outline-red-600'}`} placeholder='Label name' />
                        {errors?.name && (<span className='text-xs text-red-600'>{errors.name}</span>)}
                    </div>


                </div>


                <button
                    onClick={handleCreateNewLabel}
                    className='mt-auto bg-emerald-600 text-white text-lg py-2'>
                    Add
                </button>

            </div>

        </div >
    )
}

export default NewLabelWindow
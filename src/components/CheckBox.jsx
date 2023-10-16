import React from 'react'

function CheckBox({ handleToggle, value }) {

    return (
        <div
            onClick={handleToggle}
            className={`w-10 scale-110 cursor-pointer h-6 rounded-full p-1 transition-all duration-300 ${value == 1 ? 'bg-emerald-600' : 'bg-gray-300'}`}>
            <span className={`w-4 h-full shadow-md block bg-gray-100 rounded-full transition-all duration-300 ${value == 1 && 'ml-4'}`}></span>
        </div>
    )
}

export default CheckBox
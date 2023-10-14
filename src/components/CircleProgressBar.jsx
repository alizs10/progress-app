import React from 'react'

function CircleProgressBar({ themeIndex, percentage }) {

    return (
        <div className='relative flex justify-end h-full'>

            <svg width="70" height="70" viewBox="-25 -25 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(-90deg)" }}>
                <circle r="90" cx="100" cy="100" fill="transparent" className='stroke-black/30' strokeWidth="4" strokeDasharray="565.2px" strokeDashoffset="0"></circle>
                <circle r="90" cx="100" cy="100" className={`progress-bar-theme-${themeIndex}`} strokeWidth="20" strokeLinecap="round" strokeDashoffset="102px" fill="transparent" strokeDasharray="565.2px"></circle>
                <text x="62px" y="120px" className={`progress-bar-percentage-theme-${themeIndex}`} fontSize="71px" fontWeight="bold" style={{ transform: 'rotate(90deg) translate(0px, -196px)' }}>82</text>
            </svg>


        </div>
    )
}

export default CircleProgressBar
import React from 'react'

function CircleProgressBar({ themeIndex, percentage }) {

    let strokeDasharray = 2 * 3.14 * 90

    let strokeDashoffset = strokeDasharray * ((100 - percentage) / 100)

    return (

        <div className='relative w-fit'>
            <svg width="60" height="60" viewBox="-25 -25 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(-90deg)" }}>
                <circle r="90" cx="100" cy="100" fill="transparent" className='stroke-black/30' strokeWidth="4" strokeDasharray="565.2px" strokeDashoffset="0"></circle>
                <circle r="90" cx="100" cy="100" className={`progress-bar-theme-${themeIndex}`} strokeWidth="20" strokeLinecap="round" strokeDashoffset={`${strokeDashoffset}px`} fill="transparent" strokeDasharray={`${strokeDasharray}px`}></circle>
                {/* <text x="35px" y="120px" className={`progress-bar-percentage-theme-${themeIndex}`} fontSize="71px" fontWeight="bold" style={{ transform: 'rotate(90deg) translate(0px, -196px)' }}>{percentage}</text> */}
            </svg>

            <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xl progress-bar-percentage-theme-${themeIndex}`}>{percentage}</span>
        </div>
    )
}

export default CircleProgressBar
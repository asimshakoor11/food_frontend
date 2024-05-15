import React from 'react'
import { Navbar } from './Navbar'

export const Failed = () => {
    return (
        <div>
            <div>
                <Navbar />

            </div>
            <div className='container'>
                <h1 className='fst-italic text-decoration-underline mt-5'>Your Payment Failed.</h1>
                <h2>Try Again</h2>
            </div>
        </div>
    )
}

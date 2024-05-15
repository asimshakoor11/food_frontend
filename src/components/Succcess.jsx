import React from 'react'
import { Navbar } from './Navbar'

export const Succcess = () => {
    return (
        <div>
            <div>
                <Navbar />

            </div>
            <div className='container'>
                <h1 className='fst-italic text-decoration-underline mt-5'>Your Payment was Successfull</h1>
                <h2>Go to My order to confirm</h2>
            </div>
        </div>
    )
}

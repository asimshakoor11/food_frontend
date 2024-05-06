import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Badge from 'react-bootstrap/Badge'

import Model from '../Model'
import Cartt from '../pages/Cartt'
import { useCart } from './ContextReducer'


export const Navbar = () => {

    let data = useCart();

    const navigate = useNavigate()
    const [cartView, setCartView] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem("authtoken");
        navigate("/login")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GooFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                (localStorage.getItem("authtoken")) ?
                                    <li className="nav-item">
                                        <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
                                    </li> : ""
                            }

                        </ul>

                        {
                            (!localStorage.getItem("authtoken")) ?
                                <div className='d-flex'>
                                    <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                    <Link className="btn bg-white text-success mx-1" to="/createuser">Sign Up</Link>
                                </div>

                                :
                                <div>

                                    <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                                        My Cart {" "}
                                        <Badge pill bg='danger'>{data.length}</Badge>
                                    </div>
                                    {
                                        cartView ? <Model onClose={() => { setCartView(false) }}><Cartt /> </Model> : null

                                    }
                                    <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                                        Logout
                                    </div>
                                </div>


                        }

                    </div>
                </div>
            </nav>

        </>
    )
}

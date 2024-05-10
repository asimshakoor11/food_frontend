import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import axios from 'axios'
// import { events } from '../../backend/models/User'

export const Signup = () => {

    const navigate = useNavigate()

    const [credientials, setCredientials] = useState({ name: "", email: "", password: "", geolocation: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credientials.name && credientials.email && credientials.password && credientials.geolocation) {

            await axios.post('http://localhost:5000/api/createuser', {
                name: credientials.name, email: credientials.email, password: credientials.password, location: credientials.geolocation
            }).then(function (response) {
                    alert(response.data.message)

                if (response.data.message == 'Signup Successfull!') {
                    navigate("/login")
                }
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            alert("Fill all the details")
        }
    
    }

    const onChange = (event) => {
        setCredientials({ ...credientials, [event.target.name]: event.target.value })
    }


    return (
        <>
            <div><Navbar /></div>
            <div className="container">
                <h1 className='fst-italic text-decoration-underline mt-5'>Sign Up</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credientials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credientials.email} onChange={onChange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credientials.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credientials.geolocation} onChange={onChange} id="geolocations" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
            <div><Footer /></div>


        </>
    )
}

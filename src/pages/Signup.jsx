import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
// import { events } from '../../backend/models/User'

export const Signup = () => {

    const navigate = useNavigate()

    const [credientials, setCredientials] = useState({name: "", email: "", password: "", geolocation: ""})

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch('https://food-backend-ten.vercel.app/api/createuser',{
             method: "POST",
             headers: {
                'Content-Type': 'application/json'
             },
             body: JSON.stringify({name:credientials.name, email:credientials.email, password:credientials.password, location:credientials.geolocation})
        });
        const json = await response.json()
        console.log(json)

        if(!json.success){
            alert("enter valid credientials")
        }

        if(json.success){
            alert("Sign-up Successful!!")
            navigate("/login")
        }

    }

    const onChange = (event) => {
        setCredientials({...credientials, [event.target.name]: event.target.value})
    }


    return (
        <>
        <div><Navbar/></div>
        <div className="container">
        <h1 className='fst-italic text-decoration-underline mt-5'>Sign Up</h1>

            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input type="text" class="form-control" name='name' value={credientials.name} onChange={onChange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" name='email' value={credientials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" name='password' value={credientials.password} onChange={onChange} id="exampleInputPassword1" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Address</label>
                    <input type="text" class="form-control" name='geolocation' value={credientials.geolocation} onChange={onChange} id="exampleInputPassword1" />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
            </form>
            </div>
        <div><Footer/></div>


        </>
    )
}

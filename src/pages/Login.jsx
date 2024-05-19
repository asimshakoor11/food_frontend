import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';


export const Login = () => {

  const navigate = useNavigate()

  const [credientials, setCredientials] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credientials.email && credientials.password) {

      await axios.post('https://food-backend-ten.vercel.app/api/loginuser', {
        email: credientials.email, password: credientials.password
      }).then(function (response) {
        toast.success(response.data.message);

        if (response.data.message === "Login Successfull") {
          localStorage.setItem("authtoken", response.data.authToken)
          localStorage.setItem("userEmail", credientials.email)
          toast.success("Login Successfull",{duration: 4000});

          navigate("/")
        }
      })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      // alert("Fill the required details")
      toast.error('Fill the required details.');
    }

  }

  const onChange = (event) => {
    setCredientials({ ...credientials, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='Flogin'>
        <div className="container Flogin-inner">
          <h1 className='fst-italic text-decoration-underline text-center'>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credientials.email} onChange={onChange} aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' value={credientials.password} onChange={onChange} id="exampleInputPassword1" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/createuser" className='m-3 btn btn-danger'>I'm new User</Link>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

import React, { useState }  from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'


export const Login = () => {

  const navigate = useNavigate()

  const [credientials, setCredientials] = useState({ email: "", password: ""})

  const handleSubmit = async (e) => {  
    e.preventDefault();
    const response = await fetch('https://food-backend-ten.vercel.app/api/loginuser', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credientials.email, password: credientials.password})
    });
    const json = await response.json()

    if (!json.success) {
      alert("enter valid credientials")
    }

    if (json.success) {
      localStorage.setItem("authtoken", json.authToken)
      localStorage.setItem("userEmail", credientials.email)
      navigate("/")
    }

  }

  const onChange = (event) => {
    setCredientials({ ...credientials, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div className="container">
        <h1 className='fst-italic text-decoration-underline mt-5'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" name='email' value={credientials.email} onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" name='password' value={credientials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>I'm new User</Link>
        </form>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate=useNavigate();
  const handleSubmit= async (event)=>{
    event.preventDefault();
    const email=document.getElementById("inputEmail").value;
    const password=document.getElementById("inputPassword").value;
    console.log(JSON.stringify({email,password}));
    const response=await fetch("http://localhost:5000/api/auth/login",{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({email,password})
    });

    const json = await response.json();
    localStorage.setItem('token',json.authtoken);
    if(json.success){
        navigate("/");
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3 my-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-5">
            <input type="email" className="form-control" id="inputEmail" />
            </div>
        </div>
        <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-5">
            <input type="password" className="form-control" id="inputPassword" />
            </div>
        </div>
        <button type="submit" className="btn btn-primary" >Sign in</button>
    </form>
    </div>
  )
}

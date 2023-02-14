import React,{useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import Spinner from './Spinner';
import noteContext from "../context/noteContext";

function Signup() {
  const [creds,setCreds]=useState({name:"",email:"",password:""});
  const [reqComp,setReqComp]=useState(false);
  const navigate=useNavigate();
  const {updateName}=useContext(noteContext);

  const handleSubmit=async (e)=>{
    e.preventDefault();
    const cpassword=document.getElementById('cpassword').value;
    if(cpassword!==creds['password']){
        alert("passwords dont match");
    }
    else{
        setReqComp(true);
        const response=await fetch('http://localhost:5000/api/auth/signup',{
            method :'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(creds)
        });
        const json=await response.json();
        setReqComp(false);
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            updateName(json.name);
            navigate("/");
        }
    }
  }

  const onChange=(event)=>{
    setCreds({...creds,[event.target.name] : event.target.value});
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-3">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="Name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={3}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="Email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            minLength={8}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {reqComp && <Spinner/>}
    </div>
  );
}

export default Signup;

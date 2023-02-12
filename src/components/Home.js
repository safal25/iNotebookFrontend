import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate=useNavigate();
  useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate("/login");
        }
  });
  
   return (
       <div>
          This is Home page
       </div>
    )

}

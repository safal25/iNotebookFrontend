import React, {useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import AddNote from './AddNote';
import noteContext from '../context/noteContext';
import NoteItem from './NoteItem';

export default function Home() {
  const navigate=useNavigate();
  const {notes,getNotes}=useContext(noteContext);

  useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate("/login");
        }
        else{
            getNotes();
        }
  },[]);
  
   return (
       <div className="container">
          <h1 className="my-3">Add your note here</h1>
          <AddNote/>
          <h1 className="my-3">Recent Notes</h1>
          <div className='row'>
           {notes.slice(0,3).map((element)=>{
             return  <div key={element._id} className='col-md-4'>
                        <NoteItem title={element.title} description={element.description} />    
                    </div>
           })}
         </div>
       </div>
    )

}

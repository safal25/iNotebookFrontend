import React, {useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import AddNote from './AddNote';
import noteContext from '../context/noteContext';
import NoteItem from './NoteItem';


export default function Home() {
  const navigate=useNavigate();
  const name=localStorage.getItem('name');
  const {notes,getNotes}=useContext(noteContext);




  useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate("/login");
        }
        else{
          //added condition so that api is not called every time the page is rendered basically while switching from all notes to home tab
          if(!notes || notes.length===0){
            getNotes();
          }
        }
  },[]);
  
   return (
       <div className="container">
          {name && <h1 className="my-3">Hi {name.split(' ')[0]}, Add your note here</h1>}
          <AddNote/>
          <h1 className="my-3">Recent Notes</h1>
          <div className='row'>
           {notes.slice(0,3).map((element)=>{
             return  <div key={element._id} className='col-md-4'>
                        <NoteItem title={element.title} description={element.description}  />    
                    </div>
           })}
         </div>
       </div>
    )

}

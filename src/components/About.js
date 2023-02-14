import React,{useContext} from 'react'
import noteContext from '../context/noteContext'
import NoteItem from './NoteItem';

export default function About() {
  const {notes,name}=useContext(noteContext);

  return (
    <div className="container">
      <h1 className='my-3'>Hi {name.split(' ')[0]}, here are your Notes</h1>
      <div className='row'>
           {notes.map((element)=>{
             return  <div key={element._id} className='col-md-4 my-3'>
                        <NoteItem title={element.title} description={element.description} />    
                    </div>
           })}
      </div>
    </div>
  )
}

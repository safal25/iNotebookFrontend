import React, { useContext, useRef,useState,useEffect } from 'react'
import noteContext from '../context/noteContext'
import NoteItem from './NoteItem';

export default function About() {
  const name=localStorage.getItem('name');
  const { notes,updateNote,getNotes,deleteNote } = useContext(noteContext);

  const [currentNote,setCurrentNote]=useState({title:"",tag:"",description:""});
  const [currentId,setId]=useState('');


  const myRef = useRef(null);
  const closeRef = useRef(null);

  //added useEffect so that if someone reloads when they are in All Notes section all notes come up
  //without useEffect had to switch back to home tab to reload the notes
  useEffect(()=>{
        if(!notes || notes.length===0){
          getNotes();
        }
  },[]);

  const showModal = (title,tag,description,id) => {
    setCurrentNote({title,tag,description});
    setId(id);
    myRef.current.click();
  }

  const noteDelete=(currId)=>{
    deleteNote(currId);
  }

  const onChange=(e)=>{
    setCurrentNote({...currentNote,[e.target.name]:e.target.value});
  }

  const handleUpdateNote=()=>{
      updateNote(currentId,currentNote);
      closeRef.current.click();
  }

  return (
    <div className="container">
      <h1 className='my-3'>Hi {name.split(' ')[0]}, here are your Notes</h1>
      <button ref={myRef} style={{ display: "none" }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" ref={closeRef} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="my-3 mb-3">
                <label htmlFor="email" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="title"
                  placeholder="Enter your title"
                  minLength={3}
                  value={currentNote.title}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="tag"
                  placeholder="Enter your tag"
                  value={currentNote.tag}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  id="edescription"
                  rows="3"
                  minLength={10}
                  value={currentNote.description}
                  onChange={onChange}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdateNote}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        {notes.map((element) => {
          return <div key={element._id} className='col-md-4 my-3'>
            <NoteItem id={element._id} title={element.title} tag={element.tag} description={element.description} showModal={showModal} noteDelete={noteDelete} />
          </div>
        })}
      </div>
    </div>
  )
}

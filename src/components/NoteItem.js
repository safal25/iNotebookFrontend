import React from 'react'
import { useLocation } from 'react-router-dom';

function NoteItem(props) {
  const location=useLocation();
  const handleEdit=()=>{
    props.showModal(props.title,props.tag,props.description,props.id);
  }

  const handleDelete=()=>{
    props.noteDelete(props.id);
  }

  return (
    <div>
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <div className='d-flex'>
                  {location.pathname==='/about' && <button type="button" data-bs-toggle="modal" className="btn btn-primary btn-sm mx-1 my-1" onClick={handleEdit}>Edit</button>}
                  {location.pathname==='/about' && <button type="button" className="btn btn-danger mx-1 my-1" onClick={handleDelete}>Del</button>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default NoteItem

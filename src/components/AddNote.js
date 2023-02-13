import React, { useContext } from "react";
import noteContext from "../context/noteContext";

function AddNote() {
  const {addNotes}=useContext(noteContext);

  const handleAddNote=()=>{
    let title=document.getElementById("title").value;
    let tag=document.getElementById('tag').value;
    let description=document.getElementById('description').value;
    console.log(`${title} ${description} ${tag}`);
    addNotes(title,tag,description);
    
    document.getElementById("title").value='';
    document.getElementById("tag").value='';
    document.getElementById("description").value='';


  }

  return (
    <div>
      <div className="my-3 mb-3">
        <label htmlFor="email" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="Enter your title"
          minLength={3}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          placeholder="Enter your tag"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Description" className="form-label">
            Description        
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          minLength={10}
        ></textarea>
      </div>
      <button type="button" className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
    </div>
  );
}

export default AddNote;

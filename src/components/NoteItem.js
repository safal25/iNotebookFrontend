import React from 'react'

function NoteItem(props) {
  return (
    <div>
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
            </div>
        </div>
    </div>
  )
}

export default NoteItem

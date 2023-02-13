import React,{useState} from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
    const notesInit=[];
    const [notes,setNotes]=useState(notesInit);
    const host="http://localhost:5000/api/notes";

    const getNotes=async ()=>{
        const response=await fetch(`${host}/fetchnotes`,
        {
            method : 'GET',
            headers : {
                'auth-token' : localStorage.getItem('token')
            }
        });
        const json=await response.json();
        setNotes(json);
    }

    const addNotes=async (title,tag,description)=>{

        const response=await fetch(`${host}/addnotes`,
        {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
            body : JSON.stringify({title,description,tag})
        });

        const json=await response.json();
        if(json.success){
            let newArr=[];
            newArr.push(json.note);
            setNotes(newArr.concat(notes));
        }


    }

    return (
        <NoteContext.Provider value={{notes,getNotes,addNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
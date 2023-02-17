import React,{useState} from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
    const notesInit=[];
    const [notes,setNotes]=useState(notesInit);
    const [failAlert,setFailAlert]=useState(false);

    const host="http://localhost:5000/api/notes";

    const clearNotes=()=>{
        setNotes([]);
    }

    const getNotes=async ()=>{
        const response=await fetch(`${host}/fetchnotes`,
        {
            method : 'GET',
            headers : {
                'auth-token' : localStorage.getItem('token')
            }
        });
        const json=await response.json();
        if(json.success){
            setNotes(json.notes);
        }
        else{
            setFailAlert(true);
            setTimeout(()=>{
                setFailAlert(false);
            },3000);
        }

        console.log('api called');
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
        else{
            setFailAlert(true);
            setTimeout(()=>{
                setFailAlert(false);
            },3000);
        }
    }

    const updateNote=async (id,{title,tag,description})=>{

        const response=await fetch(`${host}/updatenote/${id}`,
        {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
            body : JSON.stringify({title,description,tag})
        });

        const json=await response.json();
        if(json.success){
            let currNotes=JSON.parse(JSON.stringify(notes));
            for(var i=0; i<notes.length; i++){
                if(currNotes[i]._id===id){
                    currNotes[i].tag=tag;
                    currNotes[i].title=title;
                    currNotes[i].description=description;
                    break;
                }
            }
            setNotes(currNotes);
        }
        else{
            setFailAlert(true);
            setTimeout(()=>{
                setFailAlert(false);
            },3000);
        }


    }

    const deleteNote=async (id)=>{

        const response=await fetch(`${host}/deletenote/${id}`,
        {
            method : 'DELETE',
            headers : {
                'auth-token' : localStorage.getItem('token')
            }
        });

        const json=await response.json();
        if(json.success){
            const newNotes=notes.filter((note)=>{return note._id!==id});
            setNotes(newNotes);
        }
        else{
            setFailAlert(true);
            setTimeout(()=>{
                setFailAlert(false);
            },3000);
        }
    }

    return (
        <NoteContext.Provider value={{failAlert,notes,getNotes,addNotes,updateNote,deleteNote,clearNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
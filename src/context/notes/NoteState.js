import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial = [];
    
// GET ALL NOTES
    const getNotes = async ()=>{
// API CALL
      try {
        const response = await fetch(`/api/notes/fetchallnotes`, {
            method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem("token")
              }
          });
          const json = await response.json();
          setNotes(json);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setNotes([]);
      }
    }

// ADD A NOTE
const [notes, setNotes] = useState(notesInitial)

    const addNote = async ( title, description, tag)=>{
// API CALL
      const response = await fetch(`/api/notes/addnote`, {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({title, description, tag})
        });
const note = await response.json();
    setNotes(notes.concat(note))
    }


// DELETE A NOTE    
const deleteNote = async (id)=>{
    const response = 
      await fetch(`/api/notes/deletenote/${id}`, {
        method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        const json = response.json();
    const newNotes = notes.filter((note)=>{return note._id!==id});
    setNotes(newNotes);
    }

// EDIT A NOTE
const editNote = async (id, title, description, tag) => {
  
      const res = await fetch(`/api/notes/updatenote/${id}`, {
      method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ title, description, tag }),
  });
  const json = await res.json();

   let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

return (
    <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
        {props.children}
    </NoteContext.Provider>
    );

};

export default NoteState;
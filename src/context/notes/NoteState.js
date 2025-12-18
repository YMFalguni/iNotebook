import NoteContext from "./noteContext";
import { useState } from "react";
import API_ENDPOINTS from "../../config/apiConfig";

const NoteState = (props)=>{
    const host = process.env.REACT_APP_HOST;
    const notesInitial = [];
// GET ALL NOTES
    const getNotes = async ()=>{
// API CALL
      try {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
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
      const response = await fetch(`${host}/api/notes/addnote`, {
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
      await fetch(`${host}/api/notes/deletenote/${id}`, {
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
  
      const res = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ title, description, tag }),
  });
  const json = await res.json();
  // update local state immutably
  setNotes(notes.map(n => (n._id === id ? { ...n, title, description, tag } : n)));
  return json;
};

return (
    <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
        {props.children}
    </NoteContext.Provider>
    );

};

export default NoteState;
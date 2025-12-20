import NoteContext from "./noteContext";
import { useState } from "react";
import API_ENDPOINTS from "../../config/apiConfig";

const NoteState = (props)=>{
    const notesInitial = [];
    
// GET ALL NOTES
    const getNotes = async ()=>{
// API CALL
      try {
        const response = await fetch(API_ENDPOINTS.GET_NOTES, {
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
      const response = await fetch(API_ENDPOINTS.ADD_NOTE, {
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
    try {
      const response = await fetch(`${API_ENDPOINTS.DELETE_NOTE}/${id}`, {
        method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        if (response.ok) {
          const newNotes = notes.filter((note)=>{return note._id!==id});
          setNotes(newNotes);
        }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
}

// EDIT A NOTE
const editNote = async (id, title, description, tag) => {
  try {
      const res = await fetch(`${API_ENDPOINTS.UPDATE_NOTE}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      if (res.ok) {
        const json = await res.json();
        setNotes(notes.map(n => (n._id === id ? { ...n, title, description, tag } : n)));
        return json;
      }
  } catch (error) {
    console.error('Error updating note:', error);
  }
}

return (
    <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
        {props.children}
    </NoteContext.Provider>
    );

};

export default NoteState;
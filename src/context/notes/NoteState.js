import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props)=>{
    const host = process.env.REACT_APP_HOST || "http://localhost:5000";
    const notesInitial = [];
// GET ALL NOTES
    const getNotes = async ()=>{
// API CALL
        const response = await fetch (`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        const json = await response.json();
        setNotes(json);
    }

// ADD A NOTE
const [notes, setNotes] = useState(notesInitial)

    const addNote = async ( title, description, tag)=>{
// API CALL
        const response = await fetch (`${host}/api/notes/addnote`, {method: 'POST',
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
    const response = await fetch (`${host}/api/notes/deletenote/${id}`, {method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        const json = response.json();
        console.log(json);
    const newNotes = notes.filter((note)=>{return note._id!==id});
    setNotes(newNotes);
    }

// EDIT A NOTE

//  const editNote = async (id , title, description, tag)=>{
// // API CALL
//         const response = await fetch (`${host}/api/notes/updatenote/${id}`, {method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'auth-token': localStorage.getItem("token")
//             },
//             body: JSON.stringify({title, description, tag})
//         });
//         const json = await response.json();
//         console.log(json)
//  let newNotes = JSON.parse(JSON.stringify(notes));
// //Logic to edit in client side
//  for (let index = 0; index < newNotes.length; index++) {
//     const element = newNotes[index];
//     if (element._id === id) {
//         newNotes[index].title = title;
//         newNotes[index].description = description;
//         newNotes[index].tag = tag;
//          break;
//     }
// }
//  console.log(newNotes)
//  setNotes(newNotes);
// }

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
    )

};

export default NoteState;
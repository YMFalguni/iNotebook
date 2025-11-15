// import React, { useState } from 'react'
// import noteContext from '../context/notes/noteContext';
// import { useContext } from 'react';


// const AddNote = (props) => {
//      const context = useContext(noteContext);
//       const {addNote } = context;

//       const [note, setNote] = useState({ title: "", description: "", tag: "" });

//       const handelClick = (e)=>{
//         e.preventDefault();
//         addNote(note.title, note.description, note.tag);
//         setNote({title: "", description: "", tag: ""})
//         props.showAlert ("Note Added successfully","success");
//       }
//       const onChange = (e)=>{ 
//         setNote({...note, [e.target.name]: e.target.value})
//       }
//   return (
//     <div>
//       <div className="container my-3">
//       <h2>Add Your Notes</h2>
//       <form>
//   <div className="mb-3">
//     <label htmlFor="title" className="form-label">Title of Your Note</label>
//     <input value={note.title} type="text" className="form-control" id="title"  name="title" onChange={onChange} minLength={5} required/>
//     <div id="emailHelp" className="form-text"></div>
//   </div>
//   <div className="mb-3">
//     <label htmlFor="description" className="form-label">Description</label>
//     <input value={note.description} type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required/>
//   </div>
//    <div className="mb-3">
//     <label htmlFor="tag" className="form-label">Tag</label>
//     <input value={note.tag} type="text" className="form-control" id="tag" name="tag" onChange={onChange} minLength={5} required/>
//   </div>
//   <button disabled= {note.title.length<5 || note.description.length<5} type="submit" className="btn btn-info" onClick={handelClick}>Add Note</button>
// </form>
// </div>
//     </div>
//   )
// }

// export default AddNote


// ...existing code...

import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = async (e) => {
    e.preventDefault();
    if (note.title.length < 5 || note.description.length < 5) {
      props.showAlert("Title and Description must be at least 5 characters", "warning");
      return;
    }
    await addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note added successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header">Add a new note</div>
      <div className="card-body">
        <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
              className="form-control"
              placeholder="Enter a descriptive title"
              minLength={5}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              className="form-control"
              rows="3"
              placeholder="Write your note..."
              minLength={5}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              className="form-control"
              placeholder="Tag (optional)"
            />
          </div>

          <button
            type="submit"
            className="btn btn-info"
            disabled={note.title.length < 5 || note.description.length < 5}
          >
            <i className="fas fa-plus me-2"></i> Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
// ...existing code...
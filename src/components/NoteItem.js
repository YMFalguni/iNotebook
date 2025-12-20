// import React, { useContext } from "react";
// import noteContext from '../context/notes/noteContext';

// const NoteItem = (props) => {
//    const context = useContext(noteContext);
//       const {deleteNote } = context;
//   const { note, updateNote } = props;
//   return (
//     <div className="col-md-3">
//       <div className="card my-3">
//         <div className="card-body">
//           <div className="d-flex align-items-center">
//             <h5 className="card-title">{note.title}</h5>
//             <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Note deleted successfully", "success");}}></i>
//             <i className="far fa-edit mx-2" onClick = { () => {updateNote(note)}}></i>
//           </div>
//           <p className="card-text">{note.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteItem;


// ...existing code...
import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="card col-md-4 my-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h5 className="card-title mb-1">{note.title}</h5>
            {note.tag && <span className="badge me-2">{note.tag}</span>}
          </div>
          <div className="note-actions">
            <button
              className="btn btn-sm btn-outline-danger me-2"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Note deleted successfully", "success");
              }}
              title="Delete note"
            >
              <i className="far fa-trash-alt"></i>
            </button>
            <button
              className="btn btn-sm btn-outline-info"
              onClick={() => updateNote(note)}
              title="Edit note"
            >
              <i className="far fa-edit"></i>
            </button>
          </div>
        </div>
        <p className="card-text">{note.description}</p>
      </div>
    </div>
  );
};

export default NoteItem;
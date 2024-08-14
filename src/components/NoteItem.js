import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const { note, updateNote } = props;
    const { deleteNote } = useContext(noteContext);

    // Inline styles for the buttons
    const editButtonStyle = {
        color: '#007bff', // Blue color for the edit icon
        border: 'none', // Remove default border
        background: 'none', // Remove default background
        padding: '0', // Adjust padding
        cursor: 'pointer', // Pointer cursor on hover
    };

    const deleteButtonStyle = {
        border: 'none', // Remove default border
        background: 'none', // Remove default background
        padding: '0', // Adjust padding
        cursor: 'pointer', // Pointer cursor on hover
    };

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex justify-content-between">
                        <button style={editButtonStyle} onClick={() => updateNote(note)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button style={deleteButtonStyle} onClick={() => deleteNote(note._id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;

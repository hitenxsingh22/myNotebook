import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    // Handle input change
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag); // Call context function
        setNote({ title: "", description: "", tag: "" }); // Reset form
    };

    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className='my-3' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className='form-label'>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            aria-describedby="titleHelp"
                            value={note.title}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className='form-label'>Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            value={note.description}
                            onChange={onChange}
                            placeholder='minimum length is 5'
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className='form-label'>Tag</label>
                        <input
                            type="text"
                            className="form-control"
                            id="tag"
                            name="tag"
                            value={note.tag}
                            onChange={onChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={note.description.length<5}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNote;

import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const [currentNote, setCurrentNote] = useState(null);
    const modalRef = useRef(null);
    const refClose = useRef(null);

    useEffect(() => {
        getNotes();
    }, [getNotes]);

    const openModal = (note) => {
        setCurrentNote(note);
        setNote({ id: note._id, etitle: note.title, edescription: note.description, etag: note.tag });
        if (modalRef.current) {
            const modal = new window.bootstrap.Modal(modalRef.current);
            modal.show();
        }
    };

    const handleUpdate = async () => {
        await editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate();  // Call handleUpdate to perform the edit
    };

    return (
        <>
            <AddNote />
            <div className="container">
                <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Edit
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='my-3' onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="title" className='form-label'>Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            name="etitle"
                                            aria-describedby="titleHelp"
                                            value={note.etitle}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className='form-label'>Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="description"
                                            name="edescription"
                                            value={note.edescription}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className='form-label'>Tag</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="tag"
                                            name="etag"
                                            value={note.etag}
                                            onChange={onChange}
                                            minLength={5}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" >Update Note</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row my-3">
                    <h2>Your Notes</h2>
                    <div className="container mx-20">
                        {notes.length===0 && 'No Notes To Display'}
                    </div>
                    {notes.map((note) => (
                        <NoteItem key={note._id} updateNote={() => openModal(note)} note={note} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Notes;

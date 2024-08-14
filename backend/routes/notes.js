const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note'); // Updated model name
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get all notes using : GET "api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }); 
        res.json(notes);
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a note using : POST "api/notes/addnote". Login required.
router.post('/addnote', fetchuser, [
    body('title').isLength({ min: 1 }).withMessage('Enter a valid title'),
    body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters long')
], async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('User ID:', req.user.id);

        const { title, description, tag } = req.body;

        // Handle errors, return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation Errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        });

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: update an existing note using : PUT "api/notes/updatenote". Login required.

router.put('/updatenote/:id', fetchuser,  async (req, res) => {
try {
    // destrcuture from req.body
    const {title,description, tag} =req.body;
    
    //Create a newNote object
    const newNote ={}
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag}
    
    //finding the note to be updated and update it
    let note = await Note.findById(req.params.id)
    if(!note){res.status(404).send("Not Found")}
    
    if(note.user.toString() != req.user.id){
        return res.status(401).send('not allowed')
    }
    
    note= await Note.findByIdAndUpdate (req.params.id, {$set: newNote}, {new:true})
    res.json({note})
    
} catch (error) {
    console.log('Error:', error.message);
    res.status(500).send("Internal Server Error");
}


 })



 
// ROUTE 4: delete an existing note using : PUT "api/notes/deletenote". Login required.
router.delete('/deletenote/:id', fetchuser,  async (req, res) => {

    try {
        
        // destrcuture from req.body
        const {title,description, tag} =req.body;
    
     
    
        //finding the note to be deleted and delete it
        let note = await Note.findById(req.params.id)
        if(!note){res.status(404).send("Not Found")}
    
    
        //allow deletion only if valid user
        if(note.user.toString() != req.user.id){
            return res.status(401).send('not allowed')
        }
    
        note= await Note.findByIdAndDelete (req.params.id)
        res.json({"Success": "Note Deleted", note: note})
    
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).send("Internal Server Error");
    }
    
})


module.exports = router;

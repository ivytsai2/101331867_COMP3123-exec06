const noteModel = require('../models/NotesModel');
const express = require("express")
const routes = express.Router()

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
routes.post('/notes', async (req, res) => {
    // Validate request
    const body = req.body
    if (Object.keys(body).length === 0) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to save the note
    const newNote = new noteModel(body)
    try {
        await newNote.save()
        res.status(201).send(newNote)
    } catch (e) {
        res.status(400).send(e.message)
    }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
routes.get('/notes', async (req, res) => {
    //TODO - Write your code here to returns all note
    try{
        const notes = await noteModel.find()
        res.status(200).send(notes)
    } catch (e) {
        res.status(400).send(e.message)
    }
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
routes.get('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to return only one note using noteid
    const id = req.params.noteId
    try {
        const note = await noteModel.findById(id)
        res.status(200).send(note)
    } catch (e) {
        res.status(400).send(`Cannot find note Id ${id}`)
    }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
routes.put('/notes/:noteId', async (req, res) => {
    // Validate request
    const body = req.body
    if (Object.keys(body).length === 0) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to update the note using noteid
    try {
        const updatedNote = await noteModel.findByIdAndUpdate(req.params.noteId, body)
        const note = await updatedNote.save()
        res.status(202).send(note)
    } catch (e) {
        res.status(400).send(e.message)
    }
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
routes.delete('/notes/:noteId', async (req, res) => {
    // Validate request
    //TODO - Write your code here to delete the note using noteid
    try {
        const deletedNote = await noteModel.findByIdAndDelete(req.params.noteId)
        if (!deletedNote) {
            res.status(400).send("No Item Found")
        } 
        res.status(200).send(deletedNote)
    } catch (e) {
        res.status(400).send(e.message)
    }
});

module.exports = routes
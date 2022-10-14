const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated

const noteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: true,
        lowercase: true
    },
    noteDescription: {
        type: String,
        required: true,
        lowercase: true
    },
    priority: {
        type: String,
        enum: ["HIGH", "MEDUIM", "LOW"],
        default: "MEDUIM",
        required: true,
        uppercase: true
    },
    dateAdded: {
        type: Date,
        default: Date.now,
        required: true,
    },
    dateUpdated: Date
})

const Note = mongoose.model("note", noteSchema)
module.exports = Note
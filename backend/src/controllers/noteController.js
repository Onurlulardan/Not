const express = require('express');
const { default: mongoose } = require('mongoose');
const noteModel = require('../models/noteModel');

const createNote = async (req, res) => {

    const {title, desc} = req.body;

    let emptyArea = [];

    if(!title) {
        emptyArea.push('title');
    }

    if(!desc) {
        emptyArea.push('desc')
    }

    if(emptyArea.length > 0) {
        return res.status(400).json({ Errors: 'Alanlar Boş Bırakılamaz!', emptyArea })
    }

    try {
        
        const user_id =  req.user._id;
        const note = await noteModel.create({title, desc, user_id});
        res.status(200).json(note);

    } catch (error) {
        res.status(400).json({Errors: error.message})
    }
}

const getAllNotes = async (req, res) => {
    
    try {

        const user_id = req.user._id;

        const notes = await noteModel.find({user_id}).sort({
            createdAt: -1
        });

        res.status(200).json(notes);

    } catch (error) {
        res.status(400).json({Errors: error.message});
    }
}

const getNoteByID = async (req, res) => {

    const { id } = req.params;

    try {
        
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ Errors: 'Geçersiz ID!' })
        }

        const note = await noteModel.findById(id);

        if(!note) {
            return res.status(404).json({ Errors: 'Not Bulunamadı!'})
        }

        res.status(200).json(note);

    } catch (error) {
        res.status(400).json({ Errors: error.message });
    }
}

const deleteNote = async (req, res) => {

    const { id } = req.params;

    try {
        
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({Errors: 'Geçersiz ID!'})
        }

        const note = await noteModel.findOneAndDelete({_id: id});

        if(!note) {
            return res.status(404).json({Errors: 'Silinecek Not Bulunamadı!'});
        }

        res.status(200).json(note);

    } catch (error) {
        res.status(400).json({Errors: error.message});
    }
}

const updateNote = async (req, res) => {

    const { id } = req.params;

    try {
        
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({Errors: 'Geçersiz ID!'})
        }

        const note = await noteModel.findOneAndUpdate({_id: id}, {
            ...req.body
        }, { new: true });

        if(!note) {
            return res.status(404).json({Errors: 'Güncellenecek Not Bulunamadı!'});
        }

        res.status(200).json(note);

    } catch (error) {
        res.status(400).json({Errors: error.message});
    }
}


module.exports = { createNote, getAllNotes, getNoteByID, deleteNote, updateNote }
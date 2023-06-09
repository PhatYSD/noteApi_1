import mongoose from "mongoose";
import Note from "../models/index.js";
import createHttpError from "http-errors";

export const readNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().exec();

    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const readNote = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await Note.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not Found");
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  const { title, text } = req.body;

  try {
    if (!title) {
      throw createHttpError(400, "Note must have a title");
    }

    const newNote = await Note.create({title, text});

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;
  const { title, text } = req.body;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    if (!title) {
      throw createHttpError(400, "Note must have a title");
    }

    const note = await Note.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not Found");
    }

    note.title = title;
    note.text = text;

    const updateNote = await note.save();

    res.status(200).json(updateNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await Note.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not Found");
    }

    await note.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
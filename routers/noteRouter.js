import express from "express";

import { createNote, deleteNote, readNote, readNotes, updateNote } from "../controllers/noteController.js";

const router = express.Router();

router.get("/reads", readNotes);
router.get("/read/:noteId", readNote);

router.post("/create", createNote);

router.patch("/update/:noteId", updateNote);

router.delete("/delete/:noteId", deleteNote);

export default router;
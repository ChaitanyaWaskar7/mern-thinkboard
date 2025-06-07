import express from "express";
import {
  createNotes,
  deleteNotes,
  getAllNotes,
  updateNotes,
  getNoteByID
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", getNoteByID)

router.post("/", createNotes);

router.delete("/:id", deleteNotes);

router.put("/:id", updateNotes);

export default router;

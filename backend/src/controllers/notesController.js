import Note from "../models/Note.js";
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({createdAt:-1}); //newest first
    res.status(200).json(notes);
  } catch (error) {
    console.log("error:", error.message);
    res.send(500).json({ message: "internal server error" });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ message: "id not found!" });
    res.status(200).json({ message: "note updated successfully" });
  } catch (error) {
    console.log("error:", error.message);
    res.send(500).json({ message: "error in updating note" });
  }
};

export const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "note created ." });
  } catch (error) {
    console.log("error:", error.message);
    res.send(500).json({ message: "error in creating note" });
  }
};

export const getNoteByID = async (req, res) => {
  try {
    const id = req.params.id;

    const findNote = await Note.findById(id);
    if (!findNote) return res.status(404).json({ message: "note not found " });
    res.send(findNote);
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).json({ message: "error in finding note" });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "unable to delete note" });
    }
    res.status(200).json({ message: "note deleted successfully" });
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).json({ message: "error in deleting note" });
  }
};

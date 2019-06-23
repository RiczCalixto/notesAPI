const fs = require("fs");

const getNotes = () => {
  return "Your notes..";
};

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(note => {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({ title: title, body: body });
    saveNotes(notes);
  } else {
    console.log("Unfortunatly there is a note with this title already");
  }
};

const removeNotes = title => {
  const notes = loadNotes();
  const noteToDelete = notes.filter(note => {
    return note.title !== title;
  });

  if (noteToDelete.length !== notes.length) {
    saveNotes(noteToDelete);
    console.log(`This note was deleted: ${title}`);
  } else {
    console.log("There is no such note with that title.");
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const data = JSON.parse(fs.readFileSync("notes.json").toString());
    return data;
  } catch (error) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNotes: removeNotes
};

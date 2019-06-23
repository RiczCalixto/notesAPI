const fs = require("fs");

const getNotes = () => {
  return "Your notes..";
};

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(note => {
    return note.title === title;
  });

  if (duplicateNotes) {
    console.log("Unfortunatly there is a note with this title already");
  } else {
    notes.push({ title: title, body: body });
    saveNotes(notes);
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
  addNotes: addNotes
};

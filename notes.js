const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your notes..";
};

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push({ title: title, body: body });
    console.log(chalk.green(`This note was added: ${title}`));
    saveNotes(notes);
  } else {
    console.log(
      chalk.red("Unfortunatly there is a note with this title already")
    );
  }
};

const removeNotes = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => {
    return note.title !== title;
  });

  if (notesToKeep.length !== notes.length) {
    saveNotes(notesToKeep);
    console.log(chalk.red.inverse(`This note was deleted: ${title}`));
  } else {
    console.log(chalk.blue("There is no such note with that title."));
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

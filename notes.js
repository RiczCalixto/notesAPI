const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your notes..";
};

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
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

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.bold(`Your notes are: `));
  notes.forEach(note => {
    console.log(chalk.bold(`${note.title}`));
  });
};

const readNotes = title => {
  const notes = loadNotes();
  const targetNote = notes.find(note => {
    if (note.title === title) {
      return note;
    } else {
      return false;
    }
  });
  if (!targetNote) {
    console.log(chalk.red("Unable to find note with this title"));
  } else {
    console.log(chalk.yellow.inverse(targetNote.title));
    console.log(targetNote.body);
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
  getNotes,
  addNotes,
  removeNotes,
  listNotes,
  readNotes
};

const notes = require("./notes");
const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");

//Customize yargs version
yargs.version("1.1.0");

//Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Insert note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Insert the body of the note",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  }
});

//Create remove command
yargs.command({
  command: "remove",
  describe: "Remove an existing note",
  builder: {
    title: {
      describe: "Insert the note title that you want to remove",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.removeNotes(argv.title);
  }
});

//Create read command
yargs.command({
  command: "read",
  describe: "read the selected note",
  builder: {
    title: {
      describe: "Read selected note by title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.readNotes(argv.title);
  }
});

//Create list command
yargs.command({
  command: "list",
  describe: "list all notes avaible",
  handler(argv) {
    notes.listNotes(argv);
  }
});

yargs.parse();

const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://jtempleton:${password}@cluster0.2ecpxzj.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: "Jamie Baldwin",
//   number: "925-555-6666",
// });

// person.save().then((result) => {
//   console.log("note saved");
//   mongoose.connection.close();
// });
if (process.argv.length === 3) {
  console.log("Phonebook:");
  console.log("-------");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} : ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 4) {
  console.log("You are missing a name or a number to save");
  process.exit(1);
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then((result) => {
    console.log(
      `Added name: ${person.name} number: ${person.number} to the phonebook.`
    );
    mongoose.connection.close();
  });
}

import "./App.css";
import { useState } from "react";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import PersonSearch from "./components/PersonSearch";

function App() {
  const [persons, setPeople] = useState([
    { name: "Jacob Templeton", number: "925-999-9999", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchedName, setSearchedName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (
      persons.some(
        (person) =>
          person.name.toLowerCase() === personObject.name.toLowerCase()
      )
    ) {
      alert(`${personObject.name} already exists in the phonebook.`);
    } else {
      setPeople(persons.concat(personObject));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchedName(event.target.value);
  };

  const filteredNames = persons.filter((person) =>
    person.name.toLowerCase().includes(searchedName.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Add New Person</h2>

      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Person Search</h2>

      <PersonSearch searchedName={searchedName} handleSearch={handleSearch} />
      <h2>People</h2>
      {filteredNames.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
}

export default App;

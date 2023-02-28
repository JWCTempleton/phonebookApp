import "./App.css";
import { useState, useEffect } from "react";
import AllPeople from "./components/AllPeople";
import PersonForm from "./components/PersonForm";
import PersonSearch from "./components/PersonSearch";
import personService from "./services/persons";

function App() {
  const [persons, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchedName, setSearchedName] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPeople(response);
    });
  }, []);

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
      personService.create(personObject).then((response) => {
        setPeople(persons.concat(personObject));
      });
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

  const handleDelete = (id) => {
    const entry = persons.find((person) => person.id === id);
    if (window.confirm(`Do you want to delete the entry for ${entry.name}?`)) {
      personService.remove(entry.id);
      setPeople(persons.filter((person) => person.id !== id));
    }
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

      <AllPeople filteredNames={filteredNames} handleDelete={handleDelete} />
    </div>
  );
}

export default App;

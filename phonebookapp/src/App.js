import "./App.css";
import { useState, useEffect } from "react";
import AllPeople from "./components/AllPeople";
import PersonForm from "./components/PersonForm";
import PersonSearch from "./components/PersonSearch";
import personService from "./services/persons";
import Notification from "./components/Notification";

function App() {
  const [persons, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchedName, setSearchedName] = useState("");
  const [message, setMessage] = useState(null);

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
    };

    const alreadyAdded = persons.filter(
      (person) => person.name.toLowerCase() === personObject.name.toLowerCase()
    );

    console.log("already added", alreadyAdded);

    if (alreadyAdded.length > 0) {
      if (
        window.confirm(
          `${personObject.name} is already in the phonebook. Replace the old number with new one?`
        )
      ) {
        personService
          .update(alreadyAdded[0].id, personObject)
          .then((response) => {
            const filteredPeople = persons.filter(
              (person) => person.id !== alreadyAdded[0].id
            );
            setPeople([response, ...filteredPeople]);
          })
          .catch((error) => {
            setMessage({
              type: "error",
              message: `Person was already removed from server`,
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPeople(
              persons.filter((person) => person.id !== alreadyAdded[0].id)
            );
          });
      } else {
        return;
      }
    } else {
      personService
        .create(personObject)
        .then((response) => {
          setPeople(persons.concat(response));
          setMessage({
            type: "success",
            message: `${personObject.name} successfully added.`,
          });
          setTimeout(() => {
            setMessage(null);
          }, 3500);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setMessage({
            type: "error",
            message: `${error.response.data.error}`,
          });
          setTimeout(() => {
            setMessage(null);
          }, 3500);
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
      <Notification message={message} />
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

import "./App.css";
import { useState } from "react";

function App() {
  const [persons, setPeople] = useState([{ name: "Jacob Templeton", id: 1 }]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
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
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>People</h2>
      {persons.map((person) => (
        <p key={person.id}>{person.name}</p>
      ))}
    </div>
  );
}

export default App;

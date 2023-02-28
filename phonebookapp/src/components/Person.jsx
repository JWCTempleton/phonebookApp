const Person = ({ person, handleDelete }) => {
  return (
    <p>
      {person.name} : {person.number}{" "}
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </p>
  );
};

export default Person;

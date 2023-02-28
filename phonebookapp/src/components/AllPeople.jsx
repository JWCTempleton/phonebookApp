import Person from "./Person";

const AllPeople = ({ filteredNames, handleDelete }) => {
  return filteredNames.map((person) => (
    <Person key={person.id} person={person} handleDelete={handleDelete} />
  ));
};

export default AllPeople;

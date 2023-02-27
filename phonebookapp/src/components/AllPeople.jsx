import Person from "./Person";

const AllPeople = ({ filteredNames }) => {
  return filteredNames.map((person) => (
    <Person key={person.id} person={person} />
  ));
};

export default AllPeople;

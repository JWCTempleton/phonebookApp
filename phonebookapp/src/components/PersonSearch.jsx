const PersonSearch = ({ searchedName, handleSearch }) => (
  <div>
    name: <input value={searchedName} onChange={handleSearch} />
  </div>
);

export default PersonSearch;

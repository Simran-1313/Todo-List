// Functional component for the search box
const SearchBox = ({ searchQuery, setSearchQuery,className='' }) => {
    return (
      // Input field for searching tasks
      <input
        type="text"
        className={`${className}`}
        placeholder="Search tasks"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    );
  };
  
  export default SearchBox;
  
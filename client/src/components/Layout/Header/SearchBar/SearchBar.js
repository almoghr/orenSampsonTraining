import { useState } from "react";

function SearchBar() {
  const [searchBarVal, setSearchBarVal] = useState("");

  const searchBarChangedHandler = (event) => {
    setSearchBarVal(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchBarVal}
        onChange={searchBarChangedHandler}
        placeholder="search products"
      />
    </div>
  );
}

export default SearchBar;
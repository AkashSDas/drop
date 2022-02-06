import { Search } from "react-iconly";

import styles from "@style/shared/SearchInput.module.scss";

const SearchInput = () => {
  return (
    <div className="flex space-x-4 cursor-pointer">
      <Search />
      <input
        disabled
        type="text"
        name="search"
        placeholder="Search Everything"
        className={`${styles.input} cursor-pointer`}
      />
    </div>
  );
};

export default SearchInput;

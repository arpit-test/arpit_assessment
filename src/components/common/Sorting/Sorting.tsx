import React from "react";
import './Sorting.css';

interface SortingProps {
  onChange: (value: string) => void;
}

const Sorting: React.FC<SortingProps> = ({ onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="sorting-radio">
      <label className="radio-label">
        <input
          type="radio"
          name="sort"
          value="asc"
          onChange={handleChange}
          defaultChecked
        />
        <span className="radio-text">A-Z</span>
      </label>
      <label className="radio-label">
        <input
          type="radio"
          name="sort"
          value="desc"
          onChange={handleChange}
        />
        <span className="radio-text">Z-A</span>
      </label>
    </div>
  );
};

export default Sorting;
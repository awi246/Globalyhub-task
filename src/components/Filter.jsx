import { useState } from 'react';
import pikaSearch from '../assets/pikaSearch.png';

// eslint-disable-next-line react/prop-types
const Filter = ({ onFilter }) => {
  const [name, setName] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onFilter({ name });
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-4 mb-4">
      <input
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center hover:bg-white"
      >
        <img
          src={pikaSearch}
          alt="Search Icon"
          className="ml-2 h-10 w-20"
        />
      </button>
    </form>
  );
};

export default Filter;

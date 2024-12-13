/* eslint-disable */
import { useState, useEffect } from 'react';
import pikaSearch from '../assets/pikaSearch.png';

const Filter = ({ onFilter, genders = [], regions = [], habitats = [] }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');
  const [habitat, setHabitat] = useState('');

  const handleGenderChange = (e) => {
    const val = e.target.value;
    if (val) {
      setRegion('');
      setHabitat('');
    }
    setGender(val);
  };

  const handleRegionChange = (e) => {
    const val = e.target.value;
    if (val) {
      setGender('');
      setHabitat('');
    }
    setRegion(val);
  };

  const handleHabitatChange = (e) => {
    const val = e.target.value;
    if (val) {
      setGender('');
      setRegion('');
    }
    setHabitat(val);
  };

  useEffect(() => {
    onFilter({ name, gender, region, habitat });
  }, [name, gender, region, habitat]);

  return (
    <div className="flex items-center space-x-4 mb-4">
      <select
        value={gender}
        onChange={handleGenderChange}
        className="border p-2 rounded"
      >
        <option value="">All Genders</option>
        {genders.map((g) => (
          <option key={g.name} value={g.name}>
            {g.name}
          </option>
        ))}
      </select>

      <select
        value={region}
        onChange={handleRegionChange}
        className="border p-2 rounded"
      >
        <option value="">All Regions</option>
        {regions.map((r) => (
          <option key={r.name} value={r.name}>
            {r.name}
          </option>
        ))}
      </select>

      <select
        value={habitat}
        onChange={handleHabitatChange}
        className="border p-2 rounded"
      >
        <option value="">All Habitats</option>
        {habitats.map((h) => (
          <option key={h.name} value={h.name}>
            {h.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <div className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center">
        <img
          src={pikaSearch}
          alt="Search Icon"
          className="ml-2 h-10 w-20"
        />
      </div>
    </div>
  );
};

export default Filter;

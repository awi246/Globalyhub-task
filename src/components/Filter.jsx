/* eslint-disable */
import { useState, useEffect } from 'react';
import { Dropdown, Button } from 'antd'; 
import { DownOutlined, CloseOutlined } from '@ant-design/icons';
import { FaMars, FaVenus, FaGlobe, FaTree, FaFilter } from 'react-icons/fa'; 
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

  const onGenderSelect = (value) => {
    handleGenderChange({ target: { value } });
  };

  const onRegionSelect = (value) => {
    handleRegionChange({ target: { value } });
  };

  const onHabitatSelect = (value) => {
    handleHabitatChange({ target: { value } });
  };

  const menu = {
    items: [
      {
        key: 'gender',
        label: (
          <span className="flex items-center">
            <FaMars className="text-purple-500 mr-2" /> Gender
          </span>
        ),
        children: [
          {
            key: 'all-genders',
            label: (
              <span className="flex items-center">
          All Genders
              </span>
            ),
            onClick: () => onGenderSelect(''),
          },
          ...genders.map((g) => {
   
            return {
              key: `gender-${g.name}`,
              label: (
                <span className="flex items-center">
                 {g.name}
                </span>
              ),
              onClick: () => onGenderSelect(g.name),
            };
          }),
        ],
      },
      {
        key: 'region',
        label: (
          <span className="flex items-center">
            <FaGlobe className="mr-2 text-purple-500" /> Region
          </span>
        ),
        children: [
          {
            key: 'all-regions',
            label: (
              <span className="flex items-center">
               All Regions
              </span>
            ),
            onClick: () => onRegionSelect(''),
          },
          ...regions.map((r) => ({
            key: `region-${r.name}`,
            label: (
              <span className="flex items-center">
                 {r.name}
              </span>
            ),
            onClick: () => onRegionSelect(r.name),
          })),
        ],
      },
      {
        key: 'habitat',
        label: (
          <span className="flex items-center">
            <FaTree className="text-purple-500 mr-2" /> Habitat
          </span>
        ),
        children: [
          {
            key: 'all-habitats',
            label: (
              <span className="flex items-center">
                All Habitats
              </span>
            ),
            onClick: () => onHabitatSelect(''),
          },
          ...habitats.map((h) => ({
            key: `habitat-${h.name}`,
            label: (
              <span className="flex items-center">
                {h.name}
              </span>
            ),
            onClick: () => onHabitatSelect(h.name),
          })),
        ],
      },
    ],
  };

  const selectedFilter = gender
    ? { type: 'Gender', value: gender }
    : region
    ? { type: 'Region', value: region }
    : habitat
    ? { type: 'Habitat', value: habitat }
    : null;

  const clearFilter = () => {
    if (gender) {
      setGender('');
    } else if (region) {
      setRegion('');
    } else if (habitat) {
      setHabitat('');
    }
  };

  return (
    <div className="flex flex-wrap items-center space-x-4 mb-4">
      {selectedFilter ? (
        <div className="flex items-center border border-gray-300 p-2 rounded bg-gray-200 max-w-xs truncate">
          <span className="mr-2">
            {selectedFilter.type}: {selectedFilter.value}
          </span>
          <CloseOutlined
            onClick={clearFilter}
            className="cursor-pointer text-red-500"
          />
        </div>
      ) : (
        <Dropdown 
          menu={menu} 
          trigger={['click']} 
          placement="bottomLeft"
          getPopupContainer={trigger => trigger.parentNode} 
        >
          <Button className="border border-gray-300 p-2 rounded flex items-center">
            <FaFilter className="mr-2 text-purple-500" /> Filter <DownOutlined className="ml-1" />
          </Button>
        </Dropdown>
      )}

      <input
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 p-2 rounded flex-grow min-w-0"
      />

      <div className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center">
        <img
          src={pikaSearch}
          alt="Search Icon"
          className="ml-2 h-10 w-20 object-contain"
        />
      </div>
    </div>
  );
};

export default Filter;

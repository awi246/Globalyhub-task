/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonList } from '../store/pokemonSlice';
import PokemonCard from '../components/PokemonCard';
import Filter from '../components/Filter';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';

const PokemonList = () => {
  const dispatch = useDispatch();
  const { list, count, next, previous, status, error } = useSelector((state) => state.pokemon);
  const [offset, setOffset] = useState(0);
  const limit = 1302;
  const [filteredList, setFilteredList] = useState([]);
  const [searchedName, setSearchedName] = useState('');

  useEffect(() => {
    dispatch(getPokemonList({ offset, limit }));
  }, [dispatch, offset]);

  useEffect(() => {
    setFilteredList(list);
  }, [list]);

  const handlePageChange = (direction) => {
    if (direction === 'next' && next) {
      setOffset(offset + limit);
    } else if (direction === 'previous' && previous) {
      setOffset(offset - limit);
    }
  };

  const handleFilter = ({ name }) => {
    setSearchedName(name);
    if (name) {
      const filtered = list.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredList(filtered);
    } else {
      setFilteredList(list);
      setSearchedName('');
    }
  };

  return (
    <div className="w-full min-h-screen relative">
      {status === 'loading' && <Loader />}

      <div className="container mx-auto p-4">
        <Filter onFilter={handleFilter} />

        {status === 'failed' && <p className="text-red-500">{error}</p>}

        {status === 'succeeded' && filteredList.length === 0 && searchedName ? (
          <NotFound searchedName={searchedName} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[90vh] overflow-auto w-full">
            {filteredList.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;

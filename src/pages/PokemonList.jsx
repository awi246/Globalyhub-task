/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonList, getGenders, getRegions, getHabitats } from '../store/pokemonSlice';
import PokemonCard from '../components/PokemonCard';
import Filter from '../components/Filter';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import { fetchGenderDetail, fetchHabitatDetail, fetchRegionDetail, fetchPokedex } from '../api/apiServices';

const PokemonList = () => {
  const dispatch = useDispatch();
  const { list, next, previous, status, error, genders, regions, habitats } = useSelector((state) => state.pokemon);
  const [offset, setOffset] = useState(0);
  const limit = 1302;

  const [filteredList, setFilteredList] = useState([]);
  const [searchedName, setSearchedName] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedHabitat, setSelectedHabitat] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getPokemonList({ offset, limit }));
    dispatch(getGenders());
    dispatch(getRegions());
    dispatch(getHabitats());
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

  const handleFilter = async ({ name, gender, region, habitat }) => {
    setLoading(true);
    setSearchedName(name);
    setSelectedGender(gender);
    setSelectedRegion(region);
    setSelectedHabitat(habitat);

    let updatedList = list;

    if (name && name.trim() !== '') {
      updatedList = updatedList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (gender) {
      const genderId = gender === 'female' ? 1 : gender === 'male' ? 2 : 3;
      const genderRes = await fetchGenderDetail(genderId);
      const speciesDetails = genderRes.data.pokemon_species_details;
      const genderSpeciesNames = speciesDetails.map((d) => d.pokemon_species.name);
      updatedList = updatedList.filter((pokemon) =>
        genderSpeciesNames.includes(pokemon.name.toLowerCase())
      );
    }

    if (habitat) {
      const habitatRes = await fetchHabitatDetail(habitat);
      const habitatSpecies = habitatRes.data.pokemon_species;
      const habitatSpeciesNames = habitatSpecies.map((s) => s.name);
      updatedList = updatedList.filter((pokemon) =>
        habitatSpeciesNames.includes(pokemon.name.toLowerCase())
      );
    }

    if (region) {
      const regionRes = await fetchRegionDetail(region);
      const pokedexes = regionRes.data.pokedexes;
      let regionSpeciesNames = [];
      for (const pd of pokedexes) {
        const pdRes = await fetchPokedex(pd.url);
        const pokemonEntries = pdRes.data.pokemon_entries || [];
        const speciesNames = pokemonEntries.map((e) => e.pokemon_species.name);
        regionSpeciesNames = [...regionSpeciesNames, ...speciesNames];
      }
      regionSpeciesNames = Array.from(new Set(regionSpeciesNames));
      updatedList = updatedList.filter((pokemon) =>
        regionSpeciesNames.includes(pokemon.name.toLowerCase())
      );
    }

    setFilteredList(updatedList);
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen relative">
      {(status === 'loading' || loading) && <Loader />}
      <div className="container mx-auto p-4">
        <Filter
          onFilter={handleFilter}
          genders={genders}
          regions={regions}
          habitats={habitats}
        />
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

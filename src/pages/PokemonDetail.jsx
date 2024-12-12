import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonDetail } from '../store/pokemonSlice';
import Loader from '../components/Loader';

const PokemonDetail = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { selectedPokemon, status, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(getPokemonDetail(name));
  }, [dispatch, name]);

  if (status === 'loading') return <Loader />;
  if (status === 'failed') return <p className="text-center text-red-500 mt-4">{error}</p>;
  if (!selectedPokemon) return null;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => window.history.back()}
        className="mb-4 bg-gray-200 px-4 py-2 rounded"
      >
        Back
      </button>
      <div className="flex flex-col items-center">
        <img
          src={selectedPokemon.sprites.front_default}
          alt={selectedPokemon.name}
          className="w-32 h-32"
        />
        <h2 className="text-3xl capitalize mt-2">{selectedPokemon.name}</h2>
        <div className="mt-4">
          <h3 className="text-xl">Details</h3>
          <ul className="list-disc list-inside">
            <li>Height: {selectedPokemon.height}</li>
            <li>Weight: {selectedPokemon.weight}</li>
            <li>
              Types: {selectedPokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}
            </li>
            <li>
              Abilities: {selectedPokemon.abilities.map((abilityInfo) => abilityInfo.ability.name).join(', ')}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;

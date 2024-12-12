import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonDetail } from '../store/pokemonSlice';
import Loader from '../components/Loader';

const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedPokemon, status, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(getPokemonDetail(name));
  }, [dispatch, name]);

  if (status === 'loading') return <Loader />;
  if (status === 'failed') return <p className="text-center text-red-500 mt-4">{error}</p>;
  if (!selectedPokemon) return null;

  const {
    sprites,
    height,
    weight,
    types,
    abilities,
    base_experience,
    moves,
    game_indices,
    id,
    is_default,
    order,
    past_abilities,
    past_types,
    stats,
    versions,
  } = selectedPokemon;

  const typeColors = {
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-500',
    psychic: 'bg-pink-500',
    ice: 'bg-blue-300',
    dragon: 'bg-indigo-500',
    dark: 'bg-gray-700',
    fairy: 'bg-pink-300',
    normal: 'bg-gray-400',
    fighting: 'bg-orange-600',
    flying: 'bg-indigo-300',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    rock: 'bg-gray-600',
    bug: 'bg-green-600',
    ghost: 'bg-indigo-700',
    steel: 'bg-gray-500',
    default: 'bg-gray-500',
  };

  const renderSprites = () => {
    if (!sprites) return null;

    const spriteCategories = Object.keys(sprites).filter(
      (key) => typeof sprites[key] === 'string' && sprites[key]
    );

    return (
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Sprites</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {spriteCategories.map((key) => (
            <div
              key={key}
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <img
                src={sprites[key]}
                alt={`${name} ${key}`}
                className="w-24 h-24 object-contain"
                loading="lazy"
              />
              <p className="mt-2 text-sm capitalize">{key.replace(/_/g, ' ')}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVersionSprites = () => {
    if (!versions) return null;

    return (
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Version-Specific Sprites</h2>
        {Object.keys(versions).map((generation) => (
          <div key={generation} className="mb-4">
            <h3 className="text-xl font-semibold capitalize mb-2">
              {generation.replace('-', ' ')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Object.keys(versions[generation]).map((versionKey) => {
                const versionData = versions[generation][versionKey];
                if (typeof versionData === 'object' && !Array.isArray(versionData)) {
                  return Object.keys(versionData).map((spriteKey) => (
                    <div
                      key={`${versionKey}-${spriteKey}`}
                      className="flex flex-col items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                      <img
                        src={versionData[spriteKey]}
                        alt={`${name} ${generation} ${versionKey} ${spriteKey}`}
                        className="w-24 h-24 object-contain"
                        loading="lazy"
                      />
                      <p className="mt-2 text-sm capitalize">
                        {versionKey.replace(/_/g, ' ')} {spriteKey.replace(/_/g, ' ')}
                      </p>
                    </div>
                  ));
                }

                if (typeof versionData === 'string') {
                  return (
                    <div
                      key={versionKey}
                      className="flex flex-col items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                      <img
                        src={versionData}
                        alt={`${name} ${generation} ${versionKey}`}
                        className="w-24 h-24 object-contain"
                        loading="lazy"
                      />
                      <p className="mt-2 text-sm capitalize">
                        {versionKey.replace(/_/g, ' ')}
                      </p>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-8">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded shadow flex items-center transition-colors"
        >
          <span className="text-xl">←</span> Back
        </button>

        <div className="flex flex-col items-center">
          <div className="bg-gradient-to-b from-white to-gray-100 p-6 rounded-full shadow-lg">
            <img
              src={sprites.front_default || '/placeholder.png'}
              alt={name}
              className="w-40 h-40 object-contain"
            />
          </div>

          <h1 className="text-5xl capitalize font-bold mt-6">{name}</h1>
          <p className="text-gray-600 text-lg">ID: {id}</p>

          <div className="mt-4 flex space-x-2">
            {types.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className={`px-4 py-2 rounded-full text-white text-sm font-semibold shadow ${
                  typeColors[typeInfo.type.name] || typeColors.default
                }`}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>

          {renderSprites()}

          <div className="w-full mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Height:</span> {height} dm
                </li>
                <li>
                  <span className="font-medium">Weight:</span> {weight} hg
                </li>
                <li>
                  <span className="font-medium">Base Experience:</span> {base_experience}
                </li>
                <li>
                  <span className="font-medium">Default:</span> {is_default ? 'Yes' : 'No'}
                </li>
                <li>
                  <span className="font-medium">Order:</span> {order}
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-4">Abilities</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {abilities.length > 0 ? (
                  abilities.map((abilityInfo) => (
                    <li key={abilityInfo.ability.name} className="capitalize">
                      {abilityInfo.ability.name} {abilityInfo.is_hidden && '(Hidden)'}
                    </li>
                  ))
                ) : (
                  <li>None</li>
                )}
              </ul>
              {past_abilities.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Past Abilities</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {past_abilities.map((pastAbility) => (
                      <li key={pastAbility.ability.name} className="capitalize">
                        {pastAbility.ability.name} {pastAbility.is_hidden && '(Hidden)'}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-purple-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-4">Types</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {types.map((typeInfo) => (
                  <li key={typeInfo.type.name} className="capitalize">
                    {typeInfo.type.name} (Slot: {typeInfo.slot})
                  </li>
                ))}
              </ul>
              {past_types.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Past Types</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {past_types.map((pastType) => (
                      <li key={pastType.type.name} className="capitalize">
                        {pastType.type.name} (Slot: {pastType.slot})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="w-full mt-8 grid grid-cols-1 lg:grid-cols-1 gap-6">
            <div className="bg-teal-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-4">Stats</h2>
              {stats.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {stats.map((statInfo) => (
                    <li key={statInfo.stat.name} className="capitalize">
                      {statInfo.stat.name}: {statInfo.base_stat}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No stats available.</p>
              )}
            </div>
          </div>

          <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-pink-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-4">Moves</h2>
              {moves.length > 0 ? (
                <div className=" max-h-screen overflow-y-auto">
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {moves.map((moveInfo) => (
                      <li key={moveInfo.move.name} className="capitalize">
                        {moveInfo.move.name.replace('-', ' ')}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-700">No moves available.</p>
              )}
            </div>

            <div className="bg-orange-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-4">Game Indices</h2>
              {game_indices.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {game_indices.map((game) => (
                    <li key={game.version.name} className="capitalize">
                      {game.version.name} (Index: {game.game_index})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No game indices available.</p>
              )}
            </div>
          </div>

          {renderVersionSprites()}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
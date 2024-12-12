/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import '../styles/PokemonCard.css'; 

const PokemonCard = ({ pokemon }) => {
  const getIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  const id = getIdFromUrl(pokemon.url);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <Link to={`/pokemon/${pokemon.name}`} className="card-link">
      <div className="card mb-10">
        <div className="card-details">
          <img src={imageUrl} alt={pokemon.name} className="pokemon-image h-36" />
        </div>
        <div className="card-button">
          {pokemon.name} <FaChevronRight />
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;

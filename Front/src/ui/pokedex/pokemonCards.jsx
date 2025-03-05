// src/components/PokemonCard.js
import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md p-4 m-2 w-48 text-center">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-24 h-24 mx-auto"
      />
      <h2 className="text-xl font-bold capitalize mt-2">{pokemon.name}</h2>
      <p className="text-sm text-gray-600">
        Type: {pokemon.types.map((type) => type.type.name).join(', ')}
      </p>
      <p className="text-sm text-gray-600">Height: {pokemon.height}</p>
      <p className="text-sm text-gray-600">Weight: {pokemon.weight}</p>
    </div>
  );
};

export default PokemonCard;
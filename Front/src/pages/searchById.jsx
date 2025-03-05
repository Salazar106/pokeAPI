// src/components/SearchById.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@nextui-org/react';
import { SkeletonCard } from '../ui/SkeletonCard';

const SearchById = () => {
  const [searchId, setSearchId] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchId) return;

    setLoading(true);
    setError('');

    // Verificar si el Pokémon ya está en localStorage
    const cachedPokemon = localStorage.getItem(searchId);
    if (cachedPokemon) {
      setPokemon(JSON.parse(cachedPokemon));
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchId}`
      );
      const pokemonData = {
        name: response.data.name,
        id: response.data.id,
        types: response.data.types.map((type) => type.type.name),
        stats: {
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          specialAttack: response.data.stats[3].base_stat,
          specialDefense: response.data.stats[4].base_stat,
          speed: response.data.stats[5].base_stat,
        },
        image: response.data.sprites.front_default, // Agregar la imagen
      };

      // Guardar en localStorage
      localStorage.setItem(searchId, JSON.stringify(pokemonData));
      setPokemon(pokemonData);
    } catch (err) {
      setError('Pokémon no encontrado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Buscar Pokémon por ID</h1>
      <div className="flex items-center mb-4 justify-center">
        <input
          type="number"
          placeholder="Ingresa el ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 mr-2"
        />
        <Button
          onPress={handleSearch}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          Buscar
        </Button>
      </div>

      {loading && <SkeletonCard/>}
      {error && <p className="text-red-500">{error}</p>}

      {pokemon && (
        <div className=" flex flex-wrap justify-center items-center mt-4 border border-gray-400 rounded-md shadow-xl shadow-gray-500">
            <div>
                <img src={pokemon.image}  alt={pokemon.name} className="w-72 "/>
            </div>
            
            <div className="mt-4 flex flex-col ">
                <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
                <p><strong>ID:</strong> {pokemon.id}</p>
                <p><strong>Tipos:</strong> {pokemon.types.join(', ')}</p>
                <p><strong>Ataque:</strong> {pokemon.stats.attack}</p>
                <p><strong>Ataque Especial:</strong> {pokemon.stats.specialAttack}</p>
                <p><strong>Defensa:</strong> {pokemon.stats.defense}</p>
                <p><strong>Defensa Especial:</strong> {pokemon.stats.specialDefense}</p>
                <p><strong>Velocidad:</strong> {pokemon.stats.speed}</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default SearchById;
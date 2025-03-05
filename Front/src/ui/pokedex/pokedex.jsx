// src/components/Pokedex.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './pokemonCards';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async (page) => {
    setLoading(true);
    try {
      const limit = 20; // Número de Pokémon por página
      const offset = (page - 1) * limit;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );

      // Obtener detalles de cada Pokémon
      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonDetail = await axios.get(pokemon.url);
          return pokemonDetail.data;
        })
      );

      setPokemonList(pokemonData);
      setTotalPages(Math.ceil(response.data.count / limit)); // Calcular el total de páginas
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pokédex</h1>
      <div className="flex flex-wrap justify-center">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1 || loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 disabled:bg-gray-300"
        >
          Anterior
        </button>
        <span className="text-lg mx-4">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 disabled:bg-gray-300"
        >
          Siguiente
        </button>
      </div>

      {/* Mostrar carga */}
      {loading && (
        <div className="text-center mt-4">
          <p>Cargando Pokémon...</p>
        </div>
      )}
    </div>
  );
};

export default Pokedex;
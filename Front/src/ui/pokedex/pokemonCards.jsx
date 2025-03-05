import React from "react";

export const PokemonCard = ({ pokemon }) => {
    return (
        <div className="border-2 border-gray-500 rounded-md shadow-lg min-w-56 flex flex-col justify-center items-center bg-slate-300">
            <img src={pokemon.image} alt={pokemon.name} />
            <h2 className="font-extrabold">{pokemon.name}</h2>
            <div>
                <p>ID: {pokemon.id}</p>
                <p>Tipos: {pokemon.types.join(", ")}</p>
                <p>HP: {pokemon.stats.hp}</p>
                <p>Ataque: {pokemon.stats.attack}</p>
                <p>Velocidad: {pokemon.stats.speed}</p>

            </div>
        </div>
    );
};


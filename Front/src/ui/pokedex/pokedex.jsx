import { PokemonCard } from "./pokemonCards";

// eslint-disable-next-line react/prop-types
export const Pokedex = ({ pokemonsData, setPage, page, totalPages, totalPokemons }) => {
    // Función para ir a la página anterior
    const goToPreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    // Función para ir a la página siguiente
    const goToNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    return (
        <div className="pokedex">
            <h1>total caputed: {totalPokemons}</h1>
            <div className="pokemon-list flex flex-wrap gap-5">
                {pokemonsData && pokemonsData.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>

            {/* Controles de paginación */}
            <div className="pagination-controls mt-5 flex justify-center gap-3">
                <button
                    onClick={goToPreviousPage}
                    disabled={page === 0}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    {'<'}
                </button>
                <span className="px-4 py-2">
                    Page {page + 1} of {totalPages}
                </span>
                <button
                    onClick={goToNextPage}
                    disabled={page === totalPages - 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    {">"}
                </button>
            </div>
        </div>
    );
};
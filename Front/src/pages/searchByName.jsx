// src/components/SearchById.js
import { useState, useContext, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { SkeletonCard } from "../ui/SkeletonCard";
import { MyContext } from "../context/context";
import { toast } from "sonner";
import { Pokedex } from "../ui/pokedex/pokedex";

// C:\Users\Usuario\Documents\prueba\Front\src\ui\pokedex

const SearchByName = () => {
  const [searchId, setSearchId] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const { $Admin } = useContext(MyContext);
  const [page, setPage] = useState(0);
  const [myPokemons, setMyPokemons] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [count, setCount] = useState(0);
  const [totalPokemons, setTotalPokemons] = useState(0);

  // Expresión regular para validar solo texto
  const onlyTextRegex = /^[A-Za-z\s]*$/;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Verifica si el valor ingresado coincide con la expresión regular
    if (onlyTextRegex.test(inputValue)) {
      setSearchId(inputValue); // Actualiza el estado solo si es válido
    }
  };

  useEffect(() => {
    const fetchMyPokemons = async () => {
      try {
        const result = await $Admin.getMyPokemon(page);
        console.log("Pokemons", result.data.pokemons);
        setPage(result.data.pokemons.pagination.currentPage);
        setTotalPages(result.data.pokemons.pagination.totalPages);
        setTotalPokemons(result.data.pokemons.pagination.totalPokemons);
        setMyPokemons(result.data.pokemons.pokemons);
      } catch (error) {
        console.error(error.response.data);
        toast.error(error.response.data.message);
      }
    };
    fetchMyPokemons();
  }, [page, count]);

  const handleSearch = async () => {
    if (!searchId) return;
    setLoading(true);
    try {
      const res = await $Admin.findProkemon(searchId);
      setPokemon(res.data.pokemons);
      const createPokemon = await $Admin.CreatePokemon(res.data.pokemons);
      setCount(count + 1);
      toast.info(createPokemon.data.message);
    } catch (err) {
      toast.info(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Search Pokémon by Name
      </h1>
      <div className="flex items-center mb-4 justify-center">
        <input
          type="text"
          placeholder="Ingresa texto (solo letras)"
          value={searchId}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 mr-2"
        />
        <Button
          onPress={handleSearch}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          Search
        </Button>
      </div>

      {loading ? (
        <SkeletonCard />
      ) : (
        pokemon && (
          <div className=" flex flex-wrap justify-center items-center mt-4 border border-gray-400 rounded-md shadow-xl shadow-gray-500 mb-10">
            <div>
              <img src={pokemon.image} alt={pokemon.name} className="w-72 " />
            </div>

            <div className="mt-4 flex flex-col ">
              <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
              <p>
                <strong>ID:</strong> {pokemon.id}
              </p>
              <p>
                <strong>type:</strong> {pokemon.types.join(", ")}
              </p>
              <p>
                <strong>attack:</strong> {pokemon.stats.attack}
              </p>
              <p>
                <strong>Special Attack:</strong> {pokemon.stats.specialAttack}
              </p>
              <p>
                <strong>Defense:</strong> {pokemon.stats.defense}
              </p>
              <p>
                <strong>Special defense:</strong>{" "}
                {pokemon.stats.specialDefense}
              </p>
              <p>
                <strong>Speed:</strong> {pokemon.stats.speed}
              </p>
            </div>
          </div>
        )
      )}

      <h1 className="mt-10 font-bold text-center">MY POKEMONS</h1>
      <Pokedex
        pokemonsData={myPokemons}
        setPage={setPage}
        page={page}
        totalPages={totalPages}
        totalPokemons={totalPokemons}
      />
    </div>
  );
};

export default SearchByName;

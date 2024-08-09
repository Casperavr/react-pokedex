import { useState, useEffect } from "react";
import pokemonData from "../data/pokemonData.json";
import { Link } from "react-router-dom";

const imageImports = import.meta.glob("../assets/images/*.png");

const genRanges = {
  1: { min: 1, max: 151 },
  2: { min: 152, max: 251 },
  3: { min: 252, max: 386 },
  4: { min: 387, max: 493 },
  5: { min: 494, max: 649 },
  6: { min: 650, max: 721 },
  7: { min: 722, max: 809 },
};

export default function ItemDetailsPage() {
  const [pokemonList, setPokemonList] = useState(pokemonData);
  const [filteredPokemonList, setFilteredPokemonList] = useState(pokemonData);
  const [imagePaths, setImagePaths] = useState({});
  const [selectedGen, setSelectedGen] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      const images = await Promise.all(
        Object.keys(imageImports).map(async (path) => {
          const module = await imageImports[path]();
          const id = path.split("/").pop().replace(".png", "");
          return { id, url: module.default };
        })
      );

      const imageMap = images.reduce((acc, { id, url }) => {
        acc[id] = url;
        return acc;
      }, {});
      setImagePaths(imageMap);
    };

    loadImages();
  }, []);

  const filterByGeneration = (gen) => {
    const { min, max } = genRanges[gen];
    const filteredList = pokemonList.filter(
      (pokemon) => pokemon.id >= min && pokemon.id <= max
    );
    setFilteredPokemonList(filteredList);
    setSelectedGen(gen);
  };

  const deletePokemon = (id) => {
    setFilteredPokemonList(
      filteredPokemonList.filter((pokemon) => pokemon.id !== id)
    );
  };

  return (
    <div>
      <Link to={`/`}>
        <h1 className="pokemonTypes">Pokémon Types</h1>
      </Link>
      <h2 className="pokemonlist">Pokémon List</h2>
      <div className="gen-buttons">
        {[1, 2, 3, 4, 5, 6, 7].map((gen) => (
          <button
            key={gen}
            onClick={() => filterByGeneration(gen)}
            className={selectedGen === gen ? "active" : ""}
          >
            GEN {gen}
          </button>
        ))}
      </div>
      <div className="pokemon-container">
        {filteredPokemonList.map((pokemon) => {
          const formattedId = String(pokemon.id).padStart(3, "0");
          const imagePath =
            imagePaths[formattedId] || "/path/to/default/image.png";

          return (
            <div key={pokemon.id} className="pokemon-card">
              <img
                src={imagePath}
                alt={pokemon.name.english}
                className="pokemon-image"
              />
              <p>Id: {formattedId}</p>
              <h2>{pokemon.name.english}</h2>
              <div className="pokemon-stats">
                <p>Stats</p>
                <p>Hp:{pokemon.base.HP}</p>
                <p>Attack:{pokemon.base.Attack}</p>
                <p>Defense{pokemon.base.Defense}</p>
                <p>Sp. Attack{pokemon.base.SpAttack}</p>
                <p>Sp. Defense{pokemon.base.SpDefense}</p>
                <p>Speed{pokemon.base.Speed}</p>
              </div>
              <button onClick={() => deletePokemon(pokemon.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

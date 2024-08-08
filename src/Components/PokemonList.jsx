import React, { useState, useEffect } from "react";
import pokemonData from "../data/pokemonData.json";
import { Link } from "react-router-dom";

const imageImports = import.meta.glob("../assets/images/*.png");

const typeColors = {
  Fire: "#F08030",
  Water: "#6890F0",
  Grass: "#78C850",
  Electric: "#F8D030",
  Ice: "#98D8D8",
  Fighting: "#C03028",
  Poison: "#A040A0",
  Ground: "#E0C068",
  Flying: "#A890F0",
  Psychic: "#F85888",
  Bug: "#A8B820",
  Rock: "#B8A038",
  Ghost: "#705898",
  Dragon: "#7038F8",
  Dark: "#705848",
  Steel: "#B8B8D0",
  Fairy: "#EE99AC",
  Normal: "#A8A878",
}

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState(pokemonData);
  const [imagePaths, setImagePaths] = useState({});
  const [inventory, setInventory] = useState([]);

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

  const deletePokemon = (id) => {
    setPokemonList(pokemonList.filter((pokemon) => pokemon.id !== id));
  };

  return (
    <div>
      <h1 className="pokemonlist">Pokémon List</h1>
      <div className="pokemon-container">
        {pokemonList.map((pokemon) => {
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
              <p>
                Type:{" "}
                {pokemon.type.map((type) => (
                  <span key={type} style={{ color: typeColors[type] }}> {type}</span>
                ))}
              </p>
              <button onClick={() => deletePokemon(pokemon.id)}>Delete</button>
              <Link to="/item/stats">
                <button>Stats</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

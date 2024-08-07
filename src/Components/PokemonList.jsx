import React, { useState, useEffect } from "react";
import pokemonData from "../data/pokemonData.json";

const imageImports = import.meta.glob("../assets/images/*.png");

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState(pokemonData);
  const [imagePaths, setImagePaths] = useState({});

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

  return (
    <div>
      <div className="pokemonlist">
        <h1>Pokémon List</h1>
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
              <p>Type: {pokemon.type.join(", ")}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

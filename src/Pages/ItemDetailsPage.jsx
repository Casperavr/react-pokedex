import { useState, useEffect } from "react";
import pokemonData from "../data/pokemonData.json";
import { Link } from "react-router-dom"

const imageImports = import.meta.glob("../assets/images/*.png");


export default function ItemDetailsPage(){
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
                <Link to="/">
                    <button>Types</button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
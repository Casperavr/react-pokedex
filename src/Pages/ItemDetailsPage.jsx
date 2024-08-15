import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UpdateForm from "../Components/UpdateForm";

const imageImports = import.meta.glob("../assets/images/*.png");

const genRanges = {
  1: { min: 1, max: 151 },
  2: { min: 152, max: 251 },
  3: { min: 252, max: 386 },
  4: { min: 387, max: 493 },
  5: { min: 494, max: 649 },
  6: { min: 650, max: 721 },
  7: { min: 722, max: 809 },
  8: { min: 810, max: 898 },
};

export default function ItemDetailsPage({
  pokemonList,
  setPokemonList,
  filteredPokemonList,
  setFilteredPokemonList,
}) {
  const [imagePaths, setImagePaths] = useState({});
  const [editingPokemon, setEditingPokemon] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const { pokemonId } = useParams();

  useEffect(() => {
    setSelectedPokemon(
      pokemonList.filter((pokemonObj) => {
        return pokemonObj.id == pokemonId;
      })[0]
    );
  }, []);

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
    setFilteredPokemonList(
      filteredPokemonList.filter((pokemon) => pokemon.id != id)
    );
  };

  const updatePokemon = (updatedPokemon) => {
    if (!filteredPokemonList) return;
    const updatedList = filteredPokemonList.map((pokemon) =>
      pokemon && pokemon.id === updatedPokemon.id ? updatedPokemon : pokemon
    );
    setFilteredPokemonList(updatedList);
    setEditingPokemon(null);
  };

  const formattedId = String(pokemonId).padStart(3, "0");
  const imagePath = imagePaths[formattedId] || "/path/to/default/image.png";
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
  };

  return (
    <section className="pokemon-detail-page">
      {selectedPokemon && (
        <>
          <div className="pokemondetails">
            <h2 className="pokemon-title">
              {formattedId} - {selectedPokemon.name.english}
            </h2>

            <img src={imagePath} alt={selectedPokemon.name.english} />

            <p>
              Type:{" "}
              {selectedPokemon.type.map((type) => (
                <span key={type} style={{ color: typeColors[type] }}>
                  {" "}
                  {type}
                </span>
              ))}
            </p>
          </div>

          <div className="pokemon-details-stats">
            <p style={{ fontSize: "1.42em" }}>Stats</p>
            <p>Hp: {selectedPokemon.base.HP}</p>
            <p>Attack: {selectedPokemon.base.Attack}</p>
            <p>Defense: {selectedPokemon.base.Defense}</p>
            <p>Sp. Attack: {selectedPokemon.base.SpAttack}</p>
            <p>Sp. Defense: {selectedPokemon.base.SpDefense}</p>
            <p>Speed: {selectedPokemon.base.Speed}</p>
          </div>
        </>
      )}

      <div className="buttons-container">
        {editingPokemon && (
          <UpdateForm
            setSelectedPokemon={setSelectedPokemon}
            pokemon={editingPokemon}
            onUpdate={updatePokemon}
          />
        )}

        {!editingPokemon && (
          <button
            className="edit-pokemon-button"
            onClick={() => setEditingPokemon(selectedPokemon)}
          >
            Edit Pokémon
          </button>
        )}

        <Link to="/">
          <button
            className="detail-delete-button"
            onClick={() => deletePokemon(pokemonId)}
          >
            Delete
          </button>
        </Link>

        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
    </section>
  );
}

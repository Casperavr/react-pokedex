import React, { useState } from "react";

const allTypes = [
  { type: "Bug", color: "#A8B820" },
  { type: "Dark", color: "#705848" },
  { type: "Dragon", color: "#7038F8" },
  { type: "Electric", color: "#F8D030" },
  { type: "Fairy", color: "#EE99AC" },
  { type: "Fighting", color: "#C03028" },
  { type: "Fire", color: "#F08030" },
  { type: "Flying", color: "#A890F0" },
  { type: "Ghost", color: "#705898" },
  { type: "Grass", color: "#78C850" },
  { type: "Ground", color: "#E0C068" },
  { type: "Ice", color: "#98D8D8" },
  { type: "Normal", color: "#A8A878" },
  { type: "Poison", color: "#A040A0" },
  { type: "Steel", color: "#B8B8D0" },
  { type: "Water", color: "#6890F0" },
];

const AddForm = ({ onAdd }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleTypeChange = (type) => {
    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter((t) => t !== type);
      } else if (prevSelectedTypes.length < 2) {
        return [...prevSelectedTypes, type];
      }
      return prevSelectedTypes;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || name.trim().length === 0) {
      alert("Please enter a valid name");
      return;
    }

    if (selectedTypes.length === 0 || selectedTypes.length > 2) {
      alert("Please select 1-2 types");
      return;
    }

    const newPokemon = {
      id: Number(id),
      name: { english: name },
      type: selectedTypes,
    };

    onAdd(newPokemon);

    setId("");
    setName("");
    setSelectedTypes([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Pokémon</h3>
      <div>
        <label>Id: </label>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          min="1"
          step="1"
        />
      </div>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Type: </label>
        {allTypes.map(({ type, color }) => (
          <label
            key={type}
            style={{
              color: color,
              padding: "3px",
            }}
          >
            <input
              type="checkbox"
              value={type}
              checked={selectedTypes.includes(type)}
              onChange={() => handleTypeChange(type)}
            />
            {type}
          </label>
        ))}
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddForm;

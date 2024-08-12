import React, { useState, useEffect } from "react";

const UpdateForm = ({ pokemon, onUpdate }) => {
  const [id, setId] = useState(pokemon.id);
  const [name, setName] = useState(pokemon.name.english);
  const [type, setType] = useState(pokemon.type.join(", "));

  useEffect(() => {
    setId(pokemon.id);
    setName(pokemon.name.english);
    setType(pokemon.type.join(", "));
  }, [pokemon]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPokemon = {
      ...pokemon,
      id: Number(id),
      name: { ...pokemon.name, english: name },
      type: type.split(",").map((t) => t.trim()),
    };

    onUpdate(updatedPokemon);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Pokémon</h3>
      <div>
        <label>Id:</label>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          min="1"
          step="1"
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Type:</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateForm;
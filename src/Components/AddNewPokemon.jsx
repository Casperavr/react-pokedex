import { useState } from "react";

export default function AddNewPokemon() {
  const [name, setName] = useState("");
  const [types, setTypes] = useState([]);

  const handleTypeChange = (index, value) => {
    const newTypes = [...types];
    newTypes[index] = value;
    setTypes(newTypes);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="pokemonName"
          required={true}
          placeholder="Enter pokemon name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </label>

      <label>
        First type:
        <select
          name="type1"
          value={types[0]}
          onChange={(event) => handleTypeChange(0, event.target.value)}
        >
          <option value="Bug">Bug</option>
          <option value="Dark">Dark</option>
          <option value="Dragon">Dragon</option>
          <option value="Electric">Electric</option>
          <option value="Fairy">Fairy</option>
          <option value="Fighting">Fighting</option>
          <option value="Fire">Fire</option>
          <option value="Flying">Flying</option>
          <option value="Ghost">Ghost</option>
          <option value="Grass">Grass</option>
          <option value="Ground">Ground</option>
          <option value="Ice">Ice</option>
          <option value="Normal">Normal</option>
          <option value="Poison">Poison</option>
          <option value="Psychic">Psychic</option>
          <option value="Rock">Rock</option>
          <option value="Steel">Steel</option>
          <option value="Water">Water</option>
        </select>
      </label>

      <label>
        Second type:
        <select
          name="type2"
          value={types[1]}
          onChange={(event) => handleTypeChange(1, event.target.value)}
        >
          <option value="None">None</option>
          <option value="Bug">Bug</option>
          <option value="Dark">Dark</option>
          <option value="Dragon">Dragon</option>
          <option value="Electric">Electric</option>
          <option value="Fairy">Fairy</option>
          <option value="Fighting">Fighting</option>
          <option value="Fire">Fire</option>
          <option value="Flying">Flying</option>
          <option value="Ghost">Ghost</option>
          <option value="Grass">Grass</option>
          <option value="Ground">Ground</option>
          <option value="Ice">Ice</option>
          <option value="Normal">Normal</option>
          <option value="Poison">Poison</option>
          <option value="Psychic">Psychic</option>
          <option value="Rock">Rock</option>
          <option value="Steel">Steel</option>
          <option value="Water">Water</option>
        </select>
      </label>

      <label>
        Base HP:
        <input type="number" min={0} max={200} />
      </label>
      <label>
        Base Attack:
        <input type="number" min={0} max={200} />
      </label>
      <label>
        Base Defense:
        <input type="number" min={0} max={200} />
      </label>
      <label>
        Base Special Attack:
        <input type="number" min={0} max={200} />
      </label>
      <label>
        Base Special Defense:
        <input type="number" min={0} max={200} />
      </label>
      <label>
        Base Speed:
        <input type="number" min={0} max={200} />
      </label>

      <button type="submit">Add new Pokémon</button>
    </form>
  );
}

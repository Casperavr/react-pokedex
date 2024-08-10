import { useState } from "react";

const UpdateForm = ({ pokemon, pokemonUpdate }) => {
    const [ id, setId] = useState( pokemon.id );
    const [ name, setName] = useState( pokemon.name.english );
    const [ type, setType] = useState( pokemon.type );

const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPokemon = {
        ...pokemon;
        id: { ...pokemon.id },
        name: { ...pokemon.name, english: name };
        type: { ...pokemon.type },
    },

    ontimeupdate(updatedPokemon);
    };

return (
        <form onSubmit={handleSubmit}>
            <h3>Update Pokémon</h3>
            <div>
                <Label>Id:</Label>
                <input
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
            </div>
            <div>
                <Label>Name:</Label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <Label>Type:</Label>
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

export default UpdateForm
import { useState } from "react"


export default function AddNewPokemon(){
    const { name, setName } = useState();
    const { type, setType } = useState();
    const firstType = ""
    const secondType = ""

    const combineTypes = (type) => {
        
    }

    return (

    <form>
        <label>
        Name:
            <input 
                type="text" 
                name="pokemonName" 
                required={true} 
                placeholder="Enter pokemon name" 
                value={name} 
                onChange={(event) => {setName(event.target.value)}}
            />
        </label>

        <select name="firstType" value={firstType} onChange={(event) => {firstType = event.target.value}}>
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




    </form>
)}
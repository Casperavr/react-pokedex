import React, { useState } from "react";
import "./App.css";
import Footer from "./Components/Footer.jsx";
import NavBar from "./Components/Navbar.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import PokemonList from "./Components/PokemonList.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
import ItemDetailsPage from './Pages/ItemDetailsPage.jsx'
import NotFoundPage from "./Pages/NotFoundPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import pokemonData from "./data/pokemonData.json"

function App() {
  const [pokemonList, setPokemonList] = useState(pokemonData);
  const [imagePaths, setImagePaths] = useState({});
  

  return (
    <>
        <NavBar />
        <AddNewPokemon/>
        <Sidebar />
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/item/stats" element={<ItemDetailsPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        <Footer />
    </>
  );
}

export default App;

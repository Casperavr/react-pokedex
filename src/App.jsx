import React from "react";
import "./App.css";
import Footer from "./Components/Footer.jsx";
import NavBar from "./Components/Navbar.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import PokemonList from "./Components/PokemonList.jsx";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Sidebar></Sidebar>
      <PokemonList />
      <Footer></Footer>
    </>
  );
}

export default App;

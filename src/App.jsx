import './App.css';
import Footer from './Components/Footer.jsx';
import NavBar from './Components/Navbar.jsx';
import Sidebar from './Components/Sidebar.jsx';
import pokemonLogo from './Components/Images/PokemonLogo2.png';

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Sidebar></Sidebar>
      <Footer></Footer>
    </>
  )
}

export default App


//name, type, pokedexnr, picture, generation, (weakness), (ability), (height), (weigth), 
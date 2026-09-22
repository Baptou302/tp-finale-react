import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Character from "./pages/Character";
import CharacterDetail from "./pages/CharacterDetail";
import Selection from "./pages/Selection";
import Contact from "./pages/Contact";
import NotFound from "./pages/Notfound";
import Navbar from "../components/Navbar";
import { SelectionProvider } from "../Context/SeletionContext";
import Planets from "./pages/Planets";
import PlanetDetails from "./pages/PlanetDetails";
function App() {
  return (
    
    <BrowserRouter>
      <SelectionProvider>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/personnages" element={<Character />} />

        <Route
          path="/personnages/:id"
          element={<CharacterDetail />}
        />

        <Route path="/selection" element={<Selection />} />

        <Route path="/contact" element={<Contact />} />
        <Route path ="/planets" element={<Planets />}  />
        <Route path="*" element={<NotFound />} />
        <Route path="/planets/:id" element={<PlanetDetails />} />
        </Routes>
      </SelectionProvider>
    </BrowserRouter>
  );
}

export default App;
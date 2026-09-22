import { Link } from "react-router-dom";
import { useSelection } from "../Context/SeletionContext";

export default function Navbar() {
  const { selected } = useSelection();
  return (
    <div className="navbar">
      <h1>Star Wars Explorer</h1>
      <nav aria-label="Navigation principale">
        <Link to="/">Accueil</Link> {" | "}
        <Link to="/personnages">Personnages</Link> {" | "}
        <Link to="/selection">Selection ({selected.length})</Link> {" | "}
        <Link to="/planets">Planetes</Link> {" | "}
        <Link to="/contact">Contact</Link>
      </nav>
    </div>
  );
}
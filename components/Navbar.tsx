import { Link } from "react-router-dom";
import { useSelection } from "../Context/SeletionContext";

export default function Navbar() {
  const { selected } = useSelection();
  return (
    <nav aria-label="Navigation principale">
      <Link to="/">Accueil</Link> {" | "}
      <Link to="/personnages">Personnages</Link> {" | "}
      <Link to="/selection">Sélection ({selected.length})</Link> {" | "}
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
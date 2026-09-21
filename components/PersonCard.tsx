import { Link } from "react-router-dom";
import type { Character } from "../Hooks/useAPI";
import { useSelection } from "../Context/SeletionContext";

export default function PersonCard({ character }: { character: Character }) {
  const { toggle, isSelected } = useSelection();
  const selected = isSelected(character.id);

  return (
    <article>
      <h2>{character.name}</h2>
      <p>Genre : {character.gender}</p>
      <p>Taille : {character.height} cm</p>
      <Link to={`/personnages/${character.id}`}>Voir le détail</Link>{" "}
      <button type="button" onClick={() => toggle(character)}>
        {selected ? "Retirer de la sélection" : "Ajouter à la sélection"}
      </button>
    </article>
  );
}
import PersonCard from "../../components/PersonCard";
import { useSelection } from "../../Context/SeletionContext";

export default function Selection() {
  const { selected } = useSelection();
  return (
    <div>
      <h1>Ma sélection</h1>
      {selected.length === 0 ? <p>Aucun personnage sélectionné.</p> : selected.map((character) => (
        <PersonCard key={character.id} character={character} />
      ))}
    </div>
  );
}
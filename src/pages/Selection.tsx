import PersonCard from "../../components/PersonCard";
import { useSelection } from "../../Context/SeletionContext";

export default function Selection() {
  const { selected } = useSelection();
  return (
    <div>
      <h2>Ma sélection</h2>
      {selected.length === 0 ? (
        <p>Aucun personnage sélectionné.</p>
      ) : (
        <section className="cards-grid" aria-label="Personnages sélectionnés">
          {selected.map((character) => (
            <PersonCard key={character.id} character={character} />
          ))}
        </section>
      )}
    </div>
  );
}
import { useState } from "react";
import Loading from "../../components/Loading";
import PersonCard from "../../components/PersonCard";
import { useCharacters } from "../../Hooks/useAPI";

export default function Character() {
  const [search, setSearch] = useState("");
  const { data, loading, error } = useCharacters(search);
  if (loading) return <Loading />;
  if (error) return <p role="alert">{error}</p>;

  return (
    <div>
      <h1>Personnages Star Wars</h1>
      <label htmlFor="character-search">Rechercher un personnage</label>
      <input
        id="character-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Ex. Luke, Leia..."
      />
      <section aria-label="Liste des personnages">
        {data?.length ? (
          data.map((character) => <PersonCard key={character.id} character={character} />)
        ) : (
          <p>Aucun personnage trouvé.</p>
        )}
      </section>
    </div>
  );
}
import { useMemo, useState } from "react";
import Loading from "../../components/Loading";
import PersonCard from "../../components/PersonCard";
import { useCharacters } from "../../Hooks/useAPI";

export default function Character() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");
  const { data, loading, error } = useCharacters();
  const genders = useMemo(
    () => [...new Set((data ?? []).map((character) => character.gender))].sort(),
    [data],
  );
  const filteredCharacters = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return (data ?? []).filter((character) =>
      (normalizedSearch === "" ||
        character.name.toLowerCase().includes(normalizedSearch) ||
        character.gender.toLowerCase().includes(normalizedSearch) ||
        character.hair_color.toLowerCase().includes(normalizedSearch) ||
        character.eye_color.toLowerCase().includes(normalizedSearch)) &&
      (gender === "all" || character.gender === gender),
    );
  }, [data, gender, search]);
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
        placeholder=" dans cette endroit"
      />
      <label htmlFor="gender-filter">Filtrer par genre</label>
      <select id="gender-filter" value={gender} onChange={(event) => setGender(event.target.value)}>
        <option value="all">Tous les genres</option>
        {genders.map((value) => <option key={value} value={value}>{value}</option>)}
      </select>
      <section className="cards-grid" aria-label="Liste des personnages">
        {filteredCharacters.length ? (
          filteredCharacters.map((character) => <PersonCard key={character.id} character={character} />)
        ) : (
          <p>Aucun personnage trouvé.</p>
        )}
      </section>
    </div>
  );
}
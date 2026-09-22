import Loading from "../../components/Loading";
import PersonCard from "../../components/PersonCard";
import { useCharacters } from "../../Hooks/useAPI";

export default function Character() {
  const { data, loading, error } = useCharacters();
  if (loading) return <Loading />;
  if (error) return <p role="alert">{error}</p>;

  return (
    <div>
      <h2>Personnages Star Wars</h2>
      <section aria-label="Liste des personnages">
        {data?.map((character) => <PersonCard key={character.id} character={character} />)}
      </section>
    </div>
  );
}
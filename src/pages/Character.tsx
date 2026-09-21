import Loading from "../../components/Loading";
import PersonCard from "../../components/PersonCard";
import { useCharacters } from "../../Hooks/useAPI";

export default function Character() {
  const { data, loading, error } = useCharacters();
  if (loading) return <Loading />;
  if (error) return <p role="alert">{error}</p>;

  return (
    <div>
      <h1>Personnages Star Wars</h1>
      <section aria-label="Liste des personnages">
        {data?.map((character) => <PersonCard key={character.id} character={character} />)}
      </section>
    </div>
  );
}
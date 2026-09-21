import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useCharacter } from "../../Hooks/useAPI";

export default function CharacterDetail() {
  const { id } = useParams();
  const { data, loading, error } = useCharacter(id);
  if (loading) return <Loading />;
  if (error || !data) return <p role="alert">{error ?? "Personnage introuvable."}</p>;

  return (
    <div>
      <Link to="/personnages">Retour aux personnages</Link>
      <h1>{data.name}</h1>
      <p>Genre : {data.gender}</p>
      <p>Taille : {data.height} cm</p>
      <p>Poids : {data.mass} kg</p>
      <p>Couleur des cheveux : {data.hair_color}</p>
      <p>Planète d'origine : {data.homeworld}</p>
    </div>
  );
}
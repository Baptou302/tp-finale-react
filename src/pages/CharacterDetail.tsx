import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useCharacter ,usePlanet} from "../../Hooks/useAPI";
export default function CharacterDetail() {
  const { id } = useParams();
  const { data, loading, error } = useCharacter(id);
  const {dataPlanet,loadingPlanet,errorPlanet} =usePlanet(id)
  if (loading) return <Loading />;
  if (error || !data) return <p role="alert">{error ?? "Personnage introuvable."}</p>;
  if (loadingPlanet) return <Loading />;
  if (errorPlanet || !dataPlanet) return <p role="alert">{error ?? "Planète introuvable."}</p>;

  return (
    <div>
      <Link to="/personnages">Retour aux personnages</Link>
      <h2>{data.name}</h2>
      <p>Genre : {data.gender}</p>
      <p>Taille : {data.height} cm</p>
      <p>Poids : {data.mass} kg</p>
      <p>Couleur des cheveux : {data.hair_color}</p>
      <Link to={`/planets/${dataPlanet.id}`}>Planète : {dataPlanet.name}</Link>
    </div>
  );
}
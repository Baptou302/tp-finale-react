import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { usePlanet } from "../../Hooks/useAPI";
import PlanetCard from "../../components/PlanetCard";
export default function PlanetDetails() {
  const { id } = useParams();
  const { dataPlanet, loadingPlanet, errorPlanet } = usePlanet(id);
  if (loadingPlanet) return <Loading />;
  if (errorPlanet || !dataPlanet) return <p role="alert">{errorPlanet ?? "Planète introuvable."}</p>;
  return (
    <div>
      <PlanetCard planet={dataPlanet}/>
    </div>
  );
}
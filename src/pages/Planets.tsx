import Loading from "../../components/Loading";
import { usePlanets } from "../../Hooks/useAPI";
import {Link} from 'react-router-dom'
export default function Planets() {
  const { dataPlanet, loadingPlanet, errorPlanet } = usePlanets();
  if (loadingPlanet) return <Loading />;
  if (errorPlanet) return <p role="alert">{errorPlanet}</p>;

  return (
    <div>
      <h1>Planetes Star Wars</h1>
      <section aria-label="Liste des planètes">
        {dataPlanet?.map((planet) => (
          <article key={planet.id}>
            <Link to={`/planets/${planet.id}`}>{planet.name}</Link>
          </article>
        ))}
      </section>
    </div>
  );
}
import type { Planet } from "../Hooks/useAPI";

export default function PlanetCard({ planet }: { planet: Planet }) {


  return (
    <article>
      <h2>{planet.name}</h2>
      <p>Climat : {planet.climate}</p>
      <p>Terrain : {planet.terrain}</p>
      <p>Gravité : {planet.gravity}</p>
      <p>Population : {planet.population}</p>
    </article>
  );
}
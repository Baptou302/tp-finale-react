import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Bienvenue</h1>
      <Link to="/personnages">Découvrir les personnages</Link>
    </div>
  );
}
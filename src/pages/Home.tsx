import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2>Bienvenue</h2>
      <Link to="/personnages">Découvrir les personnages</Link>
    </div>
  );
}
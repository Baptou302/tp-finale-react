import { useEffect, useState } from "react";

const API_URL = "https://swapi.dev/api";

export type Character = {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  eye_color: string;
  gender: string;
  homeworld: string;
};

export type Planet = {
  id: number;
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
};

type CharacterResponse = {
  results: Array<Omit<Character, "id"> & { url?: string }>;
};

type PlanetResponse = {
  results: Planet[];
};

function withId(character: Omit<Character, "id"> & { url?: string }): Character {
  const id = Number(character.url?.match(/\/(\d+)\/?$/)?.[1]);
  return { ...character, id };
}

function withPlanetId(planet: Omit<Planet, "id"> & { url?: string }): Planet {
  const id = Number(planet.url?.match(/\/(\d+)\/?$/)?.[1]);
  return { ...planet, id };
}

type ApiStatePlanet<T> = {
  dataPlanet: T | null;
  loadingPlanet: boolean;
  errorPlanet: string | null;
};
type ApiStateCharacter<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

async function request<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`La requête a échoué (${response.status}).`);
  }
  return response.json() as Promise<T>;
}

export function useCharacters(): ApiStateCharacter<Character[]> {
  const [state, setState] = useState<ApiStateCharacter<Character[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    request<CharacterResponse>(`${API_URL}/people/`, controller.signal)
      .then((data) => setState({ data: data.results.map(withId), loading: false, error: null }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : "Impossible de charger les personnages Star Wars.",
        });
      });

    return () => controller.abort();
  }, []);

  return state;
}

export function useCharacter(id: string | undefined): ApiStateCharacter<Character> {
  const [state, setState] = useState<ApiStateCharacter<Character>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    if (!id) {
      setState({ data: null, loading: false, error: "Personnage introuvable." });
      return () => controller.abort();
    }

    setState({ data: null, loading: true, error: null });
    request<Character>(`${API_URL}/people/${id}/`, controller.signal)
      .then((data) => setState({ data: withId(data), loading: false, error: null }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : "Impossible de charger le personnage Star Wars.",
        });
      });

    return () => controller.abort();
  }, [id]);

  return state;
}

export function usePlanet(id: string | undefined): ApiStatePlanet<Planet> {
  const [state, setState] = useState<ApiStatePlanet<Planet>>({
    dataPlanet: null,
    loadingPlanet: true,
    errorPlanet: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    if (!id) {
      setState({ dataPlanet: null, loadingPlanet: false, errorPlanet: "Planète introuvable." });
      return () => controller.abort();
    }

    setState({ dataPlanet: null, loadingPlanet: true, errorPlanet: null });
    request<Planet>(`${API_URL}/planets/${id}/`, controller.signal)
      .then((data) => setState({ dataPlanet: withPlanetId(data), loadingPlanet: false, errorPlanet: null }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({
          dataPlanet: null,
          loadingPlanet: false,
          errorPlanet: error instanceof Error ? error.message : "Impossible de charger la planète Star Wars.",
        });
      });

    return () => controller.abort();
  }, [id]);

  return state;
}
export function usePlanets(): ApiStatePlanet<Planet[]> {
  const [state, setState] = useState<ApiStatePlanet<Planet[]>>({
    dataPlanet: null,
    loadingPlanet: true,
    errorPlanet: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    setState({ dataPlanet: null, loadingPlanet: true, errorPlanet: null });

    request<PlanetResponse>(`${API_URL}/planets/`, controller.signal)
      .then((data) => setState({ dataPlanet: data.results.map(withPlanetId), loadingPlanet: false, errorPlanet: null }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({
          dataPlanet: null,
          loadingPlanet: false,
          errorPlanet: error instanceof Error ? error.message : "Impossible de charger les planètes Star Wars.",
        });
      });

    return () => controller.abort();
  }, []);
  return state;
}
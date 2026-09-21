import { useEffect, useState } from "react";

const API_URL = "https://swapi.dev/api";

export type Character = {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  gender: string;
  homeworld: string;
};

type CharacterResponse = {
  results: Character[];
};

function withId(character: Omit<Character, "id"> & { url?: string }): Character {
  const id = Number(character.url?.match(/\/(\d+)\/?$/)?.[1]);
  return { ...character, id };
}

type ApiState<T> = {
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

export function useCharacters(): ApiState<Character[]> {
  const [state, setState] = useState<ApiState<Character[]>>({
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

export function useCharacter(id: string | undefined): ApiState<Character> {
  const [state, setState] = useState<ApiState<Character>>({
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
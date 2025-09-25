import { useState } from "react";
import type { PokemonData } from "../App";

function useGetPokemon() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function BuscarPokemon(nombre: string): Promise<PokemonData[] | null> {
    setIsLoading(true);
    setError(null);
    try {
      const url = `https://api.tcgdex.net/v2/en/cards?name=${nombre}`;
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result: PokemonData[] = await response.json();

      return result || [];
    } catch (e) {
      setError(e as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  return { setIsLoading, error, BuscarPokemon };
}

export default useGetPokemon;

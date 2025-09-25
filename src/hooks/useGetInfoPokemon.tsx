import { useState } from "react";
import type { PokemonInfo } from "../App";

function useGetInfoPokemon() {
  const [, setIsLoading] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  async function BuscarInfo(id: string): Promise<PokemonInfo | null> {
    setIsLoading(true);
    setError(null);
    try {
      const url = `https://api.tcgdex.net/v2/en/cards/${id}`;
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result: PokemonInfo = await response.json();

      return result || [];
    } catch (e) {
      setError(e as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  return { error, BuscarInfo };
}

export default useGetInfoPokemon;

import { useState, useEffect } from 'react';

function usePokeDex(nombre:string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = 'https://pokeapi.co/api/v2/pokemon/'
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url + nombre.toLowerCase());
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]); 

  return { data, loading, error };
}

export default usePokeDex;
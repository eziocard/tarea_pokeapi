import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Input from "./components/Input";
interface CardBrief {
  id: string;
  localId: string;
  name: string;
  image: string;
}
function App() {
  const [data, setData] = useState<CardBrief[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const url = "https://api.tcgdex.net/v2/en/cards";
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  console.log(data);
  const cardsToShow = loading
    ? Array.from({ length: 10 }, (_, i) => ({
        id: i,
        name: "Cargando...",
        image: "",
      }))
    : data?.filter((e) => e.image).slice(0, 10);
  return (
    <>
      <main>
        <header id="buscador">
          <h1>Cartas Pokemon :)</h1>
          <Input />
        </header>
        <section id="contenedor">
          {cardsToShow?.map((e) => (
            <Card
              key={e.id}
              nombre={e.name}
              img={e.image || "https://via.placeholder.com/150"} // placeholder si no hay imagen
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default App;

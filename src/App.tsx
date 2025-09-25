import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Input from "./components/Input";
import Table from "./components/Table";
import useGetPokemon from "./hooks/useGetPokemon";
import { Modal } from "react-bootstrap";
export interface PokemonData {
  id: string;
  localId: string;
  name: string;
  image: string;
}
function App() {
  const [accion, setAccion] = useState(false);
  const [data, setData] = useState<PokemonData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { BuscarPokemon } = useGetPokemon();
  const [Pokemon, setPokemon] = useState<PokemonData>();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (dataPokemon: PokemonData) => {
    setPokemon(dataPokemon);
    setShow(true);
  };

  const url = "https://api.tcgdex.net/v2/en/cards";

  useEffect(() => {
    async function fetchData() {
      try {
        const url10 = `${url}?pagination:page=1&pagination:itemsPerPage=10`;
        const response = await fetch(url10);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
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

  const handleBusqueda = async (nombre: string) => {
    if (nombre == "") {
      setData([]);
    } else {
      const resultados = await BuscarPokemon(nombre);
      console.log("Resultados de la busqueda:", resultados);
      if (resultados && resultados.length > 0) {
        setData(resultados);
      } else {
        setData([]);
      }
    }
  };

  const cards = loading
    ? Array.from({ length: 10 }, (_, i) => ({
        id: i,
        name: "Cargando...",
        image: "",
      }))
    : data?.filter((e) => e.image);
  return (
    <div className="contenedor">
      <header>
        <div id="header-container">
          <h1 id="header-titulo">Cartas Pokemon</h1>
          <Input
            placeholder="Buscar Pokemon en especifico Sugerencia 'Pikachu'"
            onClick={handleBusqueda}
          />
        </div>
      </header>
      <main>
        <button onClick={() => setAccion(!accion)}> Mostrar Como Tabla</button>
        <section id="visualizador">
          {accion && data ? (
            <>
              <Table datos={data} onClick={handleShow} />
              <Modal show={show} onHide={handleClose}>
                <Card
                  key={Pokemon?.id}
                  nombre={Pokemon?.name}
                  img={Pokemon?.image}
                />
              </Modal>
            </>
          ) : loading ? (
            cards?.map((e) => <Card key={e.id} nombre={e.name} img={e.image} />)
          ) : data && data.length === 0 ? (
            <p>No se encontraron resultados</p>
          ) : (
            cards?.map((e) => <Card key={e.id} nombre={e.name} img={e.image} />)
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Input from "./components/Input";
import Table from "./components/Table";
import useGetPokemon from "./hooks/useGetPokemon";
import { Modal } from "react-bootstrap";
import useGetInfoPokemon from "./hooks/useGetInfoPokemon";
export interface PokemonData {
  id: string;
  localId: string;
  name: string;
  image: string;
}
export interface PokemonInfo {
  id: string;
  name: string;
  image: string;
  hp: number;
  types: string[];
  stage: string;
  evolveFrom?: string;
  rarity: string;
}

function App() {
  const [accion, setAccion] = useState(false);
  const [data, setData] = useState<PokemonData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<Error | null>(null);
  const { BuscarPokemon } = useGetPokemon();
  const { BuscarInfo } = useGetInfoPokemon();
  const [Pokemon, setPokemon] = useState<PokemonData>();
  const [showCard, setshowCard] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [InfoPokemon, setInfoPokemon] = useState<PokemonInfo | null>(null);

  const handleCloseInfo = () => setShowInfo(false);

  const handleCloseCard = () => setshowCard(false);
  const handleshowCard = (dataPokemon: PokemonData) => {
    setPokemon(dataPokemon);
    setshowCard(true);
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
  const handleShowInfo = async (id: PokemonData["id"]) => {
    const resultados = await BuscarInfo(id);
    console.log("Resultados de la busqueda:", resultados);
    if (resultados) {
      setInfoPokemon(resultados);
      setShowInfo(true);
    } else {
      setInfoPokemon(null);
    }
  };
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
        <button onClick={() => setAccion(!accion)}>
          {!accion ? "Mostrar Como Tabla" : "Mostrar Como Carta"}
        </button>
        <section id="visualizador">
          {accion && data ? (
            <>
              <Table
                datos={data}
                onClick={handleshowCard}
                handleDetalle={handleShowInfo}
              />
              <Modal show={showCard} onHide={handleCloseCard}>
                <Card
                  key={Pokemon?.id}
                  nombre={Pokemon?.name}
                  img={Pokemon?.image}
                />
              </Modal>
              <Modal show={showInfo} onHide={handleCloseInfo}>
                <h1>{InfoPokemon?.name}</h1>
                <p>Puntos de Vida: {InfoPokemon?.hp}</p>
                <p>Raresa: {InfoPokemon?.rarity}</p>
                <p>Evolucion: {InfoPokemon?.stage}</p>
                <p>Tipo: {InfoPokemon?.types}</p>
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

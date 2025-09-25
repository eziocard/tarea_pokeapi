import type { PokemonData } from "../App";

type Props = {
  datos: PokemonData[];
  onClick: (dataPokemon: PokemonData) => void;
  handleDetalle: (dataPokemon: PokemonData["id"]) => void;
};

function Table({ datos, onClick, handleDetalle }: Props) {
  if (!datos || datos.length === 0) {
    return <p>No hay datos</p>;
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Img Ruta</th>
          <th scope="col">Detalle</th>
          <th scope="col">Ver</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((e) => (
          <tr key={e.id}>
            <th scope="row">{e.id}</th>
            <td>{e.name}</td>

            <td>{e.image}</td>
            <td>
              <button onClick={() => handleDetalle(e.id)}>Ver Detalle</button>
            </td>
            <td>
              <button onClick={() => onClick(e)}>Ver Carta</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

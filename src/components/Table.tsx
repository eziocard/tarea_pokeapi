import type { CardBrief } from "../App";

type Props ={
    datos:CardBrief[]
}

function Table({ datos }: Props) {
    if (!datos || datos.length === 0) {
        return <p>No hay datos</p>;
      }
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
           
            <th scope="col">Img</th>
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
                <button>ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
export default Table;
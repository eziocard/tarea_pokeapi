type Props = {
    nombre?: string
    descripcion?:string
}
function Card({nombre, descripcion}: Props) {
    return (
      <div className="card" style={{width: '18rem'}}>
        <img className="card-img-top" src="..." alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{nombre}</h5>
          <p className="card-text">{descripcion}</p>
          <a href="#" className="btn btn-primary">Ver</a>
        </div>
      </div>
    )
  }
  
export default Card;
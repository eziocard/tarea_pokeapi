type Prop= {
  onClick : () => void
}
function Input({onClick}:Prop) {
    return (
        <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1"/>
        <div className="input-group-prepend">
          <button className="btn btn-outline-secondary" type="button" onClick={onClick}>Buscar</button>
        </div>
      </div>
    
    )
  }
  
export default Input;
import { useState } from "react";

type Prop = {
  onClick?: (nombre: string) => void;
  placeholder?: string;
};
function Input({ onClick, placeholder = "" }: Prop) {
  const [nombre, setNombre] = useState("");
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        aria-label=""
        aria-describedby="basic-addon1"
        onChange={(e) => setNombre(e.target.value)}
      />
      <div className="input-group-prepend">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => onClick && onClick(nombre)}
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default Input;

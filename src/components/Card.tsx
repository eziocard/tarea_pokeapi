type Props = {
  nombre?: string;
  img?: string;
};
function Card({ nombre, img }: Props) {
  return (
    <div className="card" style={{ width: "18rem", margin: "10px" }}>
      {img ? (
        <img
          className="card-img-top"
          src={img + "/low.png"}
          alt={nombre || "Card image"}
        />
      ) : (
        <h3 style={{ textAlign: "center", padding: "20px" }}>
          No existe una imagen
        </h3>
      )}
    </div>
  );
}

export default Card;

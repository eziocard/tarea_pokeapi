type Props = {
  nombre?: string;
  img?: string;
};
function Card({ nombre, img }: Props) {
  return (
    <div className="card" style={{ width: "18rem", margin: "10px" }}>
      <img
        className="card-img-top"
        src={img + "/low.png"}
        alt={nombre || "Card image"}
      />
    </div>
  );
}

export default Card;

import "../styles/Food.css";

function Food({ position }) {
  return (
    <div
      className="food"
      style={{
        gridRowStart: position.y + 1,
        gridColumnStart: position.x + 1,
      }}
    ></div>
  );
}

export default Food;

import "../styles/Snake.css";

function Snake({ segments }) {
  return (
    <>
      {segments.map((segment, index) => (
        <div
          key={index}
          className="snake-segment"
          style={{
            gridRowStart: segment.y + 1,
            gridColumnStart: segment.x + 1,
          }}
        ></div>
      ))}
    </>
  );
}

export default Snake;

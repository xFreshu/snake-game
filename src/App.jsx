import GameBoard from "./components/GameBoard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="background-animation">
        <div className="snake-line"></div>
        <div className="snake-line delay-1"></div>
        <div className="snake-line delay-2"></div>
        <div className="snake-line delay-3"></div>
      </div>
      <h1>Snake Game</h1>
      <p className="author">Autor: Łukasz Przybysz</p>
      <GameBoard />
    </div>
  );
}

export default App;

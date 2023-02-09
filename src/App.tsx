import { useMemo, useState } from "react";
import "./App.css";

interface Position {
  x: number;
  y: number;
}

function App() {
  const [card, setCard] = useState([
    [
      { value: 0, found: false },
      { value: 3, found: false },
      { value: 1, found: false },
    ],
    [
      { value: 2, found: false },
      { value: 5, found: false },
      { value: 4, found: false },
    ],
    [
      { value: 5, found: false },
      { value: 0, found: false },
      { value: 4, found: false },
    ],
    [
      { value: 1, found: false },
      { value: 2, found: false },
      { value: 3, found: false },
    ],
  ]);

  const [position, setPosition] = useState<Position[]>([]);

  useMemo(() => {
    console.log("Position: ", position);
    if (position.length === 2) {
      let firstNumber = card[position[0].x][position[0].y].value;
      let secondNumber = card[position[1].x][position[1].y].value;

      if (firstNumber === secondNumber) {
        const toggleValueFromCheckCard = [...card];

        toggleValueFromCheckCard[position[0].x][position[0].y].found = true;
        toggleValueFromCheckCard[position[1].x][position[1].y].found = true;

        setCard(toggleValueFromCheckCard);

        console.log("Encontrou um par!");
      }
      setPosition([]);
    }
  }, [position]);

  const handleCardClicked = (value: number, x: number, y: number) => {
    if (position.length === 0) {
      setPosition([...position, { x, y }]);
    }
    if (
      position.length !== 0 &&
      !(
        Object.entries(position[0]).toString() ===
        Object.entries({ x, y }).toString()
      )
    ) {
      setPosition([...position, { x, y }]);
    }
  };

  return (
    <div className="App">
      {card.map((row, rowIndex) => (
        <div id="page" key={rowIndex}>
          {row.map((cel, columnIndex) => (
            <div
              onClick={() =>
                handleCardClicked(cel.value, rowIndex, columnIndex)
              }
              id="card"
              key={columnIndex}
            >
              {" "}
              {cel.found && cel.value}{" "}
            </div>
          ))}{" "}
        </div>
      ))}
    </div>
  );
}

export default App;

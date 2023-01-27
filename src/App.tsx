import { useState } from "react";
import "./App.css";

interface Position {
  x: number;
  y: number;
}

function App() {
  const [card, setCard] = useState([
    [0, 3, 1],
    [2, 5, 4],
    [5, 0, 4],
    [1, 2, 3],
  ]);

  const [checkCard, setCheckCard] = useState(
    new Array(card.length).fill(new Array(card[0].length).fill("false"))
  );

  const [pair, setPair] = useState<number[]>([]);
  const [firstPosition, setFirstPosition] = useState<Position>();

  const handleCardClicked = (value: number, x: number, y: number) => {
    if (pair.length < 2 && firstPosition === undefined) {
      setPair([...pair, value]);
      setFirstPosition({ x, y });
    } else if (
      pair.length < 2 &&
      firstPosition !== undefined &&
      !(
        Object.entries(firstPosition).toString() ===
        Object.entries({ x, y }).toString()
      )
    ) {
      setPair([...pair, value]);
    }
    if (pair.length === 2) {
      if (pair[0] === pair[1]) {
        const toggleValueFromCheckCard = [...checkCard];
        //console.log(checkCard);
        console.log(firstPosition!.x, " - ", firstPosition!.y);

        toggleValueFromCheckCard[firstPosition!.x][firstPosition!.y] = "true";
        console.log(toggleValueFromCheckCard);
        toggleValueFromCheckCard[x][y] = true;
        console.log(
          toggleValueFromCheckCard[firstPosition!.x][firstPosition!.y]
        );

        console.log(toggleValueFromCheckCard[x][y]);
        console.log(toggleValueFromCheckCard);

        setCheckCard(toggleValueFromCheckCard);

        //console.log(checkCard);

        console.log("Encontrou um par!", pair[0], pair[1], pair[0] === pair[1]);
      }
      setPair([]);
      setFirstPosition(undefined);
    }
    console.log(pair, " - ", firstPosition);
  };

  return (
    <div className="App">
      {card.map((row, rowIndex) => (
        <div id="page" key={rowIndex}>
          {row.map((value, columnIndex) => (
            <div
              onClick={() => handleCardClicked(value, rowIndex, columnIndex)}
              id="card"
              key={columnIndex}
            >
              {" "}
              {value}{" "}
            </div>
          ))}{" "}
        </div>
      ))}
    </div>
  );
}

export default App;

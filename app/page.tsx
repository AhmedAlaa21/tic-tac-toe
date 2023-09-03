"use client";

import { useEffect, useState } from "react";
import Cell from "./components/cell";

const WinningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Home() {
  const initialArray = ["", "", "", "", "", "", "", "", ""];
  const [cells, setCells] = useState(initialArray);
  const [go, setGo] = useState("circle");
  const [winningMessage, setWinningMessage] = useState("");

  useEffect(() => {
    WinningCombos.forEach((combo) => {
      const circleWins = combo.every((cell) => cells[cell] === "circle");
      const crossWins = combo.every((cell) => cells[cell] === "cross");

      if (circleWins) {
        setWinningMessage("Circle Wins!");
      } else if (crossWins) {
        setWinningMessage("Cross Wins");
      }
    });
  }, [cells, winningMessage]);

  useEffect(() => {
    if (cells.every((cell) => cell !== "") && !winningMessage) {
      setWinningMessage("Draw!");
    }
  }, [cells, winningMessage]);

  return (
    <main className="container">
      <div className="gameboard">
        {cells.map((cell, index) => (
          <Cell
            id={index}
            go={go}
            setGo={setGo}
            key={index}
            cells={cells}
            setCells={setCells}
            cell={cell}
            winningMessage={winningMessage}
          />
        ))}
      </div>
      <div
        style={{
          marginTop: "20px",
          fontSize: "24px",
          color: "#f8d221",
        }}
      >
        {winningMessage}
      </div>
      {!winningMessage && (
        <div style={{ marginTop: "20px", color: "#f8d221", fontSize: "24px" }}>
          Its now{" "}
          <span
            style={{
              textTransform: "capitalize",
            }}
          >
            {go}
          </span>{" "}
          turn!
        </div>
      )}

      <p style={{ color: "#f8d221", fontSize: "24px", marginTop: "4rem" }}>
        Reload to start a new game!
      </p>
    </main>
  );
}

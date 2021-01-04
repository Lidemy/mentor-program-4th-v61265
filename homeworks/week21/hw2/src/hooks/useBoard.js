import { useState } from "react";

export default function useBoard() {
  const [column, row] = [19, 19];
  const [board, setBoard] = useState(
    window.localStorage.getItem("board")
      ? JSON.parse(JSON.parse(window.localStorage.getItem("board"))[0])
      : Array(column).fill(Array(row).fill(null))
  );
  const [round, setRound] = useState(
    window.localStorage.getItem("board")
      ? JSON.parse(window.localStorage.getItem("board"))[1]
      : "black"
  );
  const [winner, setWinner] = useState(
    window.localStorage.getItem("board")
      ? JSON.parse(window.localStorage.getItem("board"))[2]
      : ""
  );
  const [recordInput, setRrecordInput] = useState("");

  // 改變 board + round
  const handleClickCell = (x, y) => {
    if (board[x][y] || winner) return;
    let temp = JSON.parse(JSON.stringify(board));
    temp[x][y] = round;
    setBoard(temp);
    checkWin(temp, x, y);
    setRound(round === "black" ? "white" : "black");
  };

  // 分別該刻棋子的八個方向是否有
  const checkWin = (temp, x, y) => {
    const scopes = [
      [1, 0],
      [1, 1],
      [1, -1],
      [0, 1],
      [0, -1],
      [-1, 0],
      [-1, 1],
      [-1, -1],
    ];
    for (let scope of scopes) {
      let count = 0;
      for (let i = 4; i >= 0; i--) {
        try {
          if (temp[x + scope[0] * i][y + scope[1] * i] !== round) break;
        } catch {
          continue;
        }
        count++;
      }
      if (count >= 4) {
        setWinner(round);
        break;
      }
    }
  };

  // 重設棋盤、贏家、輪到誰 → 存入 localStorage
  const handleReset = () => {
    setBoard(Array(column).fill(Array(row).fill(null)));
    setWinner("");
    setRound("black");
    window.localStorage.setItem(
      "board",
      JSON.stringify([JSON.stringify(board), round, winner])
    );
  };

  const handleSave = () => {
    window.localStorage.setItem(
      "board",
      JSON.stringify([JSON.stringify(board), round, winner])
    );
    alert("已儲存，再次開啟時會被保存！");
  };

  const handleCopy = () => {
    const copy = document.querySelector(".recordData");
    copy.focus();
    copy.select();
    try {
      const success = document.execCommand("copy");
      alert(success ? "複製成功" : "複製不成功");
    } catch (error) {
      alert("無法複製");
    }
  };

  const handleChangeRecord = (e) => {
    setRrecordInput(e.target.value);
  };

  const hanleReproduceRecord = () => {
    const record = JSON.parse(atob(recordInput));
    console.log(record);
    try {
      setBoard(JSON.parse(record[0]));
      setRound(record[1]);
      setWinner(record[2]);
      setRrecordInput("");
    } catch (e) {
      console.log(e);
      alert("資料不正確");
    }
  };

  return {
    board,
    handleClickCell,
    round,
    handleReset,
    winner,
    handleSave,
    handleCopy,
    recordInput,
    handleChangeRecord,
    hanleReproduceRecord,
  };
}

import React, { useState, useRef, useEffect } from "react";

import Canvas from "./components/Canvas";
import DownloadButton from "./components/DownloadButton";
import Header from "./components/Header";
import Input from "./components/Input";
import draw from "./helpers/draw";

import "./App.css";

const CANVAS_WIDTH = 120;
const CANVAS_HEIGHT = (3 / 2) * CANVAS_WIDTH;

function App() {
  const [number, setNumber] = useState<number | null>(null);
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const ctx = canvasRef.current?.getContext("2d");

  useEffect(() => {
    ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (ctx && number)
      draw({ ctx, number, width: CANVAS_WIDTH, height: CANVAS_HEIGHT });
  }, [ctx, number]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    error && setError("");
    const value = parseInt(e.target.value);

    if (value < 1 || value > 9999) {
      setError("Type number in 1 - 9999 range.");
    } else {
      setNumber(value || null);
    }
  };

  const href = canvasRef.current?.toDataURL("image/png");

  return (
    <div className="app">
      <div className="content">
        <Header />
        <Input number={number} onChange={onChange} error={error} />
        <Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} canvasRef={canvasRef}/>
        {number && <DownloadButton number={number} href={href} />}
      </div>
    </div>
  );
}

export default App;

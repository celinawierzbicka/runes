import React, { useState, useRef, useEffect } from "react";
import { Alert, Button, Input, Typography } from "antd";

import "./App.css";
interface IBaseNumbers {
  [number: number]: number[][];
}

const baseNumbers: IBaseNumbers = {
  0: [],
  1: [
    [30, 0],
    [60, 0],
  ],
  2: [
    [30, 30],
    [60, 30],
  ],
  3: [
    [30, 0],
    [60, 30],
  ],
  4: [
    [30, 30],
    [60, 0],
  ],
  5: [
    [30, 0],
    [60, 0],
    [30, 30],
  ],
  6: [
    [60, 0],
    [60, 30],
  ],
  7: [
    [30, 0],
    [60, 0],
    [60, 30],
  ],
  8: [
    [30, 30],
    [60, 30],
    [60, 0],
  ],
  9: [
    [30, 0],
    [60, 0],
    [60, 30],
    [30, 30],
  ],
};

interface IDrawParams {
  ctx: CanvasRenderingContext2D;
  number: number;
  width: number;
  height: number;
}

const draw = ({ ctx, number, width, height }: IDrawParams) => {
  ctx.beginPath();
  ctx.moveTo(30, 0);
  ctx.lineTo(30, 90);
  ctx.lineWidth = 3;

  const numberArray = number.toString().split("");

  numberArray.map((num: string, idx) => {
    const numRange = numberArray.length - idx;

    return baseNumbers[parseInt(num)].forEach((coordinates: number[], i) => {
      const [x, y] = coordinates;

      ctx.save();

      switch (numRange) {
        case 2:
          ctx.transform(-1, 0, 0, 1, width, 0); // flip vertical
          break;
        case 3:
          ctx.transform(1, 0, 0, -1, 0, height); // flip horizontal
          break;
        case 4:
          ctx.transform(-1, 0, 0, -1, width, height); // flip vertical and horizontal
          break;
        default:
          ctx.transform(1, 0, 0, 1, 0, 0);
      }

      if (!i) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      ctx.restore();
    });
  });

  ctx?.stroke();
};

const CANVAS_WIDTH = 60;
const CANVAS_HEIGHT = 90;

function App() {
  const [number, setNumber] = useState<number | null>(null);
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const ctx = canvasRef.current?.getContext("2d");

  const clearCanvas = () => ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  useEffect(() => {
    clearCanvas();

    if (ctx && number)
      draw({ ctx, number, width: CANVAS_WIDTH, height: CANVAS_HEIGHT });
  }, [ctx, number, clearCanvas]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    error && setError("");
    const value = parseInt(e.target.value);

    if (value < 1 || value > 9999) {
      setError("Type number in 1 - 9999 range.");
      clearCanvas();
    } else {
      setNumber(value || null);
    }
  };

  const onClick = () => {
    let image = canvasRef.current
      ?.toDataURL("image/png")
      .replace("image/png", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception.

    if (image) {
      window.location.href = image;
    }
  };

  return (
    <div className="app">
      <div className="content">
        <Typography.Title>Runic numbers</Typography.Title>
        <div className="input-wrapper">
          <Input
            className="input"
            type="number"
            min={1}
            max={9999}
            placeholder="Enter number..."
            value={number || ""}
            onChange={onChange}
          />
          {error && <Alert className="alert" message={error} type="error" />}
        </div>
        <div className="canvas-wrapper">
          <canvas
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            ref={canvasRef}
          ></canvas>
        </div>
        {number && !error && <Button onClick={onClick}>Download</Button>}
      </div>
    </div>
  );
}

export default App;

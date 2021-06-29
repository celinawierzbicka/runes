import React, { useState, useRef, useEffect } from "react";
import { Alert, Button, Input, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import "./App.css";
import draw from "./helpers/draw";

const CANVAS_WIDTH = 60;
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
        <Typography.Title className="title">Runic numbers</Typography.Title>
        <Typography.Text className="subtitle">
          Enter number between 1 and 9999 to reveal it's runic symbol!
        </Typography.Text>
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
          <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasRef}>
            Your browser does not support the HTML 5 Canvas.
          </canvas>
        </div>
        {number && (
          <a download={`${number}.png`} href={href}>
            <Button icon={<DownloadOutlined />}>Download</Button>
          </a>
        )}
      </div>
    </div>
  );
}

export default App;

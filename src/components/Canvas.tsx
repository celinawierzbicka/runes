import React from "react";

interface ICanvasProps {
  width: number;
  height: number;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

const Canvas = ({ width, height, canvasRef }: ICanvasProps) => {
  return (
    <div className="canvas-wrapper">
      <canvas width={width} height={height} ref={canvasRef}>
        Your browser does not support the HTML 5 Canvas.
      </canvas>
    </div>
  );
};

export default Canvas;

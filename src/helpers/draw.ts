import { getBaseNumbersCoordinates } from "./base-numbers";

interface IDrawParams {
  ctx: CanvasRenderingContext2D;
  number: number;
  width: number;
  height: number;
}

const draw = ({ ctx, number, width, height }: IDrawParams) => {
  const lineWidth = 4;

  //get coordinates to draw numbers 0 - 9
  const baseNumbers = getBaseNumbersCoordinates({ width, lineWidth });

  ctx.beginPath();

  // draw vertical line - it is a common element for any number
  ctx.moveTo(width / 2, lineWidth / 2);
  ctx.lineTo(width / 2, height - lineWidth / 2);
  ctx.lineWidth = lineWidth;

  const numberArray = number.toString().split("");

  numberArray.map((num: string, idx) => {
    const numRange = numberArray.length - idx; // 1 - units, 2 - tens, 3 - hubdreds, 4 - tousands

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
        ctx.moveTo(x, y); // first coordinate indicates starting point for drawing
      } else {
        ctx.lineTo(x, y); // next coordinates are udes for drawing lines
      }

      ctx.restore();
    });
  });

  ctx?.stroke();
};

export default draw;

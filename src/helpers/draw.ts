import { getBaseNumbersCoordinates } from "./base-numbers";

interface IDrawParams {
  ctx: CanvasRenderingContext2D;
  number: number;
  width: number;
  height: number;
}

const draw = ({ ctx, number, width, height }: IDrawParams) => {
  const baseNumbers = getBaseNumbersCoordinates({ width });

  ctx.beginPath();

  // draw vertical line common for all numbers
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
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

export default draw;

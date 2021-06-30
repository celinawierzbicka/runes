interface IBaseNumbers {
  [number: number]: number[][];
}

interface IParams {
  width: number;
  lineWidth: number;
}

// getBaseNumbersCoordinates() generates coordinates to draw symbols of 0-9 digits
// lineWidth param is used to fix the issue of cutting half of the stroke when drawn on the edge of canvas
export const getBaseNumbersCoordinates = ({
  width,
  lineWidth,
}: IParams): IBaseNumbers => {
  return {
    0: [],
    1: [
      [width / 2, lineWidth],
      [width - lineWidth, lineWidth],
    ],
    2: [
      [width / 2, width / 2],
      [width - lineWidth, width / 2],
    ],
    3: [
      [width / 2, lineWidth],
      [width - lineWidth, width / 2],
    ],
    4: [
      [width / 2, width / 2],
      [width - lineWidth, lineWidth],
    ],
    5: [
      [width / 2, lineWidth],
      [width - lineWidth, lineWidth],
      [width / 2, width / 2],
    ],
    6: [
      [width - lineWidth, lineWidth],
      [width - lineWidth, width / 2],
    ],
    7: [
      [width / 2, lineWidth],
      [width - lineWidth, lineWidth],
      [width - lineWidth, width / 2],
    ],
    8: [
      [width / 2, width / 2],
      [width - lineWidth, width / 2],
      [width - lineWidth, lineWidth],
    ],
    9: [
      [width / 2, lineWidth],
      [width - lineWidth, lineWidth],
      [width - lineWidth, width / 2],
      [width / 2, width / 2],
    ],
  };
};

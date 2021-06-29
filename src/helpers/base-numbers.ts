interface IBaseNumbers {
  [number: number]: number[][];
}

interface IParams {
  width: number;
}

export const getBaseNumbersCoordinates = ({ width }: IParams): IBaseNumbers => {
  return {
    0: [],
    1: [
      [width / 2, 0],
      [width, 0],
    ],
    2: [
      [width / 2, width / 2],
      [width, width / 2],
    ],
    3: [
      [width / 2, 0],
      [width, width / 2],
    ],
    4: [
      [width / 2, width / 2],
      [width, 0],
    ],
    5: [
      [width / 2, 0],
      [width, 0],
      [width / 2, width / 2],
    ],
    6: [
      [width, 0],
      [width, width / 2],
    ],
    7: [
      [width / 2, 0],
      [width, 0],
      [width, width / 2],
    ],
    8: [
      [width / 2, width / 2],
      [width, width / 2],
      [width, 0],
    ],
    9: [
      [width / 2, 0],
      [width, 0],
      [width, width / 2],
      [width / 2, width / 2],
    ],
  };
};

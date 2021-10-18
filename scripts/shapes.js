/*
 * Each shape is named in the format of <name><rotation in degrees>
 *
 * Example:
 * L90 is the shape L rotated 90 degrees clockwise
 *
 * Each tile is coordinate-based, [x, y]
 *
 * Example:
 * [0, 0] is the origin tile
 * [-1, 0] 1 tile to the left of origin
 * [1, 0] 1 tile to the right of origin
 * [0, -1] 1 tile on top of origin
 * [0, 1] 1 tile below the origin
 *
 */

const SHAPES = {
  L0: [
    [0, 0],
    [-1, 0],
    [1, 0],
    [1, -1]
  ],
  L90: [
    [0, 0],
    [-1, 0],
    [-1, -1],
    [-1, -2]
  ],
  L180: [
    [0, 0],
    [-1, 0],
    [1, 0],
    [-1, 1]
  ],
  L270: [
    [0, 0],
    [1, 0],
    [1, 1],
    [1, 2]
  ],
  I0: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0]
  ],
  I90: [
    [0, 0],
    [0, -1],
    [0, -2],
    [0, -3]
  ],
  I180: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0]
  ],
  I270: [
    [0, 0],
    [0, -1],
    [0, -2],
    [0, -3]
  ],
  S0: [
    [0, 0],
    [1, 0],
    [1, -1],
    [2, -1]
  ],
  S90: [
    [0, 0],
    [0, -1],
    [-1, -1],
    [-1, -2]
  ],
  S180: [
    [0, 0],
    [1, 0],
    [1, -1],
    [2, -1]
  ],
  S270: [
    [0, 0],
    [0, -1],
    [-1, -1],
    [-1, -2]
  ],
  Z0: [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1]
  ],
  Z90: [
    [0, 0],
    [0, -1],
    [1, -1],
    [1, -2]
  ],
  Z180: [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1]
  ],
  Z270: [
    [0, 0],
    [0, -1],
    [1, -1],
    [1, -2]
  ]
};

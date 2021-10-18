/*
 * constants
 */

const TILE_SIZE = 20; // px / tiles
const CANVAS_HEIGHT = 20; // tiles
const CANVAS_WIDTH = 20; // tiles

const DEFAULT_STEP_RATE = 300; // miliseconds
const FAST_STEP_RATE = 50; // miliseconds
const globalStepRate = (() => {
  let current = DEFAULT_STEP_RATE;

  return {
    get value() {
      return current;
    },
    setToFast() {
      current = FAST_STEP_RATE;
    },
    reset() {
      current = DEFAULT_STEP_RATE;
    }
  };
})();

/*
 * setup canvas
 */

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

canvas.height = CANVAS_HEIGHT * TILE_SIZE;
canvas.width = CANVAS_WIDTH * TILE_SIZE;

// 2D array to keep track of drawn tiles
const bakedTilesCoordinate = [];
for (let height = 0; height < CANVAS_HEIGHT; height++) {
  const row = [];
  for (let width = 0; width < CANVAS_WIDTH; width++) {
    row.push(0);
  }
  bakedTilesCoordinate.push(row);
}

/*
 * driver function
 */

let newShape;
const spawnNewShape = () => {
  const letters = ["L", "I", "S", "Z", "T", "J"];
  newShape = createShape({
    letter: pickRandomItem(letters),
    x: (CANVAS_WIDTH * TILE_SIZE) / 2, // center of canvas horizontally
    y: 0
  });
};

function drawFrame(context) {
  clearCanvas(context, bakedTilesCoordinate);

  newShape.draw();
  newShape.checkCollision();

  setTimeout(() => drawFrame(context), globalStepRate.value);
}

spawnNewShape();
drawFrame(context);

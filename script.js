const tileSize = 40; // px
const globalStepRate = 300; // miliseconds
const canvasHeight = 400;
const canvasWidth = 400;

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

canvas.height = canvasHeight;
canvas.width = canvasWidth;

const drawShape = shapeCreator(context);

const createObject = ({ x, y }) => {
  let positionY = y;

  return {
    draw: () => {
      // clear canvas for redrawing
      context.clearRect(0, 0, canvas.width, canvas.height);

      // calculate collision in y-direction
      if (positionY + 2 * tileSize > canvas.height) {
        positionY = canvas.height - tileSize;
      } else {
        positionY += tileSize;
      }

      drawShape.I(x, positionY);
    },
    bakeToCanvas: () => {}
  };
};

const object1 = createObject({ x: 200, y: 0 });

function drawFrame() {
  object1.draw();
  setTimeout(drawFrame, globalStepRate);
}

drawFrame();

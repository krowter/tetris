const drawTile = (context, x, y) => {
  context.beginPath();
  context.rect(x, y, tileSize, tileSize);
  context.stroke();
};

const drawShape = (context, _shape, x, y) => {
  const shape = shapes[_shape];

  shape.forEach(([deltaX, deltaY]) => {
    drawTile(context, x + deltaX * tileSize, y + deltaY * tileSize);
  });
};

const isColliding = (bakedTilesCoordinate, tiles) => {
  tiles.forEach(tile => {
    if (bakedTilesCoordinate[tile.y + 1][tile.x] === 1) {
      return true;
    }
  });
};

// clear canvas for redrawing and draw baked tiles
const clearCanvas = (context, bakedTilesCoordinate) => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  bakedTilesCoordinate.forEach((row, rowIndex) => {
    row.forEach((tile, columnIndex) => {
      if (tile === 1) {
        const positionX = rowIndex * tileSize;
        const positionY = columnIndex * tileSize;

        context.beginPath();
        drawTile(context, positionX, positionY);
        context.stroke();
      }
    });
  });
};

const createObject = ({ x, y }) => {
  let positionY = y;

  return {
    draw: () => {
      // calculate collision in y-direction
      if (positionY + 2 * tileSize > canvas.height) {
        positionY = canvas.height - tileSize;
      } else {
        positionY += tileSize;
      }

      drawShape(context, "I", x, positionY);
    },
    bakeToCanvas: () => {}
  };
};

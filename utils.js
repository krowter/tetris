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

  return shape;
};

const isColliding = (bakedTilesCoordinate, tiles) => {
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    if (bakedTilesCoordinate[tile[1] + 1][tile[0]] === 1) {
      return true;
    }
  }
};

// clear canvas for redrawing and draw baked tiles
const clearCanvas = (context, bakedTilesCoordinate) => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  bakedTilesCoordinate.forEach((row, rowIndex) => {
    row.forEach((tile, columnIndex) => {
      if (tile === 1) {
        const positionX = columnIndex * tileSize;
        const positionY = rowIndex * tileSize;

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

      return {
        shape: drawShape(context, "I", x, positionY),
        position: { x, y: positionY }
      };
    },
    bakeToCanvas: () => {}
  };
};

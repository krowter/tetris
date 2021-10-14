const shapeCreator = context => {
  return {
    L: (x, y) => {
      context.beginPath();
      context.rect(x, y, tileSize, tileSize);
      context.rect(x + tileSize, y, tileSize, tileSize);
      context.rect(x + 2 * tileSize, y, tileSize, tileSize);
      context.rect(x + 2 * tileSize, y - tileSize, tileSize, tileSize);
      context.stroke();
    },
    I: (x, y) => {
      context.beginPath();
      context.rect(x, y, tileSize, tileSize);
      context.rect(x + tileSize, y, tileSize, tileSize);
      context.rect(x + 2 * tileSize, y, tileSize, tileSize);
      context.rect(x + 3 * tileSize, y, tileSize, tileSize);
      context.stroke();
    }
  };
};

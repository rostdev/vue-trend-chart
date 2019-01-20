export default (pnts, smooth, { maxY }, strokeWidth) => {
  const points = [...pnts];
  const start = points.shift();
  const end = points[points.length - 1];

  // Create Line Path
  let linePath =
    `M ${start.x},${start.y}` +
    points.map((point, index) => {
      if (!smooth) return ` L${point.x},${point.y}`;

      const prev = points[index - 1] || start;
      const distance = points[0].x - start.x;
      const bezierX = distance / 2;

      return ` C ${bezierX + prev.x},${prev.y} ${bezierX + prev.x},${point.y} ${
        point.x
      },${point.y}`;
    });

  // Create Fill Path
  let fillPath = linePath;
  if (end.Y !== maxY) fillPath += ` L${end.x},${maxY + strokeWidth / 2}`;
  if (start.Y !== maxY) fillPath += ` L${start.x},${maxY + strokeWidth / 2}`;
  fillPath += " Z";

  return { linePath, fillPath };
};
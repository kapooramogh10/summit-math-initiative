function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function placeFromAngles(angles) {
  const [angleA, angleB, angleC] = angles.map(toRadians);
  const sideAB = 100;
  const scale = sideAB / Math.sin(angleC);
  const sideAC = scale * Math.sin(angleB);

  return [
    { x: 0, y: 0 },
    { x: sideAB, y: 0 },
    { x: sideAC * Math.cos(angleA), y: sideAC * Math.sin(angleA) },
  ];
}

function placeFromSides(rawSides) {
  const scale = 100 / Math.max(...rawSides);
  const [sideAB, sideBC, sideCA] = rawSides.map((length) => length * scale);
  const x = (sideCA ** 2 - sideBC ** 2 + sideAB ** 2) / (2 * sideAB);
  const y = Math.sqrt(Math.max(sideCA ** 2 - x ** 2, 0));

  return [
    { x: 0, y: 0 },
    { x: sideAB, y: 0 },
    { x, y },
  ];
}

function computeTickMarks(sides) {
  return sides.map((length) =>
    sides.filter((other) => other === length).length >= 2 ? 1 : 0,
  );
}

function midpoint(pointA, pointB) {
  return { x: (pointA.x + pointB.x) / 2, y: (pointA.y + pointB.y) / 2 };
}

function centroidOf(points) {
  return {
    x: (points[0].x + points[1].x + points[2].x) / 3,
    y: (points[0].y + points[1].y + points[2].y) / 3,
  };
}

function outwardFrom(point, centroid, margin) {
  const dx = point.x - centroid.x;
  const dy = point.y - centroid.y;
  const length = Math.hypot(dx, dy) || 1;
  return { x: point.x + (dx / length) * margin, y: point.y + (dy / length) * margin };
}

function unitVector(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  return { x: dx / length, y: dy / length };
}

function RightAngleMarker({ points, vertexIndex }) {
  const vertex = points[vertexIndex];
  const prevVertex = points[(vertexIndex + 2) % 3];
  const nextVertex = points[(vertexIndex + 1) % 3];
  const size = 14;

  const dirA = unitVector(vertex, prevVertex);
  const dirB = unitVector(vertex, nextVertex);

  const cornerA = { x: vertex.x + dirA.x * size, y: vertex.y + dirA.y * size };
  const cornerB = {
    x: vertex.x + dirA.x * size + dirB.x * size,
    y: vertex.y + dirA.y * size + dirB.y * size,
  };
  const cornerC = { x: vertex.x + dirB.x * size, y: vertex.y + dirB.y * size };

  return (
    <polyline
      className="triangle-right-angle-marker"
      points={`${cornerA.x},${cornerA.y} ${cornerB.x},${cornerB.y} ${cornerC.x},${cornerC.y}`}
    />
  );
}

function ExteriorAngleRay({ points, vertexIndex, label }) {
  const vertex = points[vertexIndex];
  const prevVertex = points[(vertexIndex + 2) % 3];
  const dir = unitVector(prevVertex, vertex);
  const rayLength = 55;
  const rayEnd = {
    x: vertex.x + dir.x * rayLength,
    y: vertex.y + dir.y * rayLength,
  };
  const labelPosition = {
    x: vertex.x + dir.x * (rayLength + 16),
    y: vertex.y + dir.y * (rayLength + 16),
  };

  return (
    <>
      <line
        className="triangle-exterior-ray"
        x1={vertex.x}
        y1={vertex.y}
        x2={rayEnd.x}
        y2={rayEnd.y}
      />

      {label !== null && label !== undefined && (
        <text
          x={labelPosition.x}
          y={labelPosition.y}
          className="triangle-exterior-label"
        >
          {label}
        </text>
      )}
    </>
  );
}

function perpendicularFoot(apex, baseA, baseB) {
  const dx = baseB.x - baseA.x;
  const dy = baseB.y - baseA.y;
  const lengthSquared = dx * dx + dy * dy || 1;
  const t =
    ((apex.x - baseA.x) * dx + (apex.y - baseA.y) * dy) / lengthSquared;

  return { x: baseA.x + t * dx, y: baseA.y + t * dy };
}

function AltitudeLine({ points, vertexIndex, label }) {
  const apex = points[vertexIndex];
  const baseA = points[(vertexIndex + 1) % 3];
  const baseB = points[(vertexIndex + 2) % 3];
  const foot = perpendicularFoot(apex, baseA, baseB);
  const mid = midpoint(apex, foot);
  const dx = foot.x - apex.x;
  const dy = foot.y - apex.y;
  const length = Math.hypot(dx, dy) || 1;
  const perpX = (-dy / length) * 16;
  const perpY = (dx / length) * 16;

  return (
    <>
      <line
        className="triangle-altitude-line"
        x1={apex.x}
        y1={apex.y}
        x2={foot.x}
        y2={foot.y}
      />

      {label !== null && label !== undefined && (
        <text
          x={mid.x + perpX}
          y={mid.y + perpY}
          className="triangle-altitude-label"
        >
          {label}
        </text>
      )}
    </>
  );
}

function TickMark({ from, to }) {
  const mid = midpoint(from, to);
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  const perpX = (-dy / length) * 6;
  const perpY = (dx / length) * 6;

  return (
    <line
      className="triangle-tick-mark"
      x1={mid.x - perpX}
      y1={mid.y - perpY}
      x2={mid.x + perpX}
      y2={mid.y + perpY}
    />
  );
}

function TriangleFigure({
  angles = null,
  sides = null,
  vertexLabels = null,
  sideLabels = null,
  tickMarks = null,
  rightAngleAt = null,
  exteriorAngleAt = null,
  exteriorAngleLabel = null,
  altitudeFromVertex = null,
  altitudeLabel = null,
}) {
  const points = angles ? placeFromAngles(angles) : placeFromSides(sides);
  const resolvedTicks = tickMarks ?? (sides ? computeTickMarks(sides) : null);
  const centroid = centroidOf(points);

  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const padding = exteriorAngleAt !== null ? 90 : 30;
  const minX = Math.min(...xs) - padding;
  const minY = Math.min(...ys) - padding;
  const width = Math.max(...xs) - Math.min(...xs) + padding * 2;
  const height = Math.max(...ys) - Math.min(...ys) + padding * 2;

  const edges = [
    { from: points[0], to: points[1] },
    { from: points[1], to: points[2] },
    { from: points[2], to: points[0] },
  ];

  return (
    <svg
      className="triangle-figure"
      viewBox={`${minX} ${minY} ${width} ${height}`}
      role="img"
      aria-label="Triangle diagram"
    >
      <polygon
        className="triangle-outline"
        points={points.map((point) => `${point.x},${point.y}`).join(" ")}
      />

      {rightAngleAt !== null && (
        <RightAngleMarker points={points} vertexIndex={rightAngleAt} />
      )}

      {exteriorAngleAt !== null && (
        <ExteriorAngleRay
          points={points}
          vertexIndex={exteriorAngleAt}
          label={exteriorAngleLabel}
        />
      )}

      {altitudeFromVertex !== null && (
        <AltitudeLine
          points={points}
          vertexIndex={altitudeFromVertex}
          label={altitudeLabel}
        />
      )}

      {resolvedTicks &&
        edges.map((edge, index) =>
          resolvedTicks[index] > 0 ? (
            <TickMark key={index} from={edge.from} to={edge.to} />
          ) : null,
        )}

      {sideLabels &&
        edges.map((edge, index) => {
          const label = sideLabels[index];
          if (label === null || label === undefined) return null;
          const position = outwardFrom(midpoint(edge.from, edge.to), centroid, 18);
          return (
            <text
              key={index}
              x={position.x}
              y={position.y}
              className="triangle-side-label"
            >
              {label}
            </text>
          );
        })}

      {vertexLabels &&
        points.map((point, index) => {
          const label = vertexLabels[index];
          if (label === null || label === undefined) return null;
          const position = outwardFrom(point, centroid, 26);
          return (
            <text
              key={index}
              x={position.x}
              y={position.y}
              className="triangle-vertex-label"
            >
              {label}
            </text>
          );
        })}
    </svg>
  );
}

export default TriangleFigure;

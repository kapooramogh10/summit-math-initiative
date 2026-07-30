import { useId } from "react";

const COLOR_HEX = {
  navy: "#14345c",
  blue: "#3478e5",
  gold: "#e7a832",
  gray: "#62758a",
};

const SIZE_PX = { sm: 44, md: 62, lg: 82 };

function regularPolygonPoints(sides, radius, rotationOffset = -90) {
  const points = [];
  for (let i = 0; i < sides; i += 1) {
    const angle = ((360 / sides) * i + rotationOffset) * (Math.PI / 180);
    points.push(`${50 + radius * Math.cos(angle)},${50 + radius * Math.sin(angle)}`);
  }
  return points.join(" ");
}

function starPoints(outerRadius, innerRadius, spikes = 5) {
  const points = [];
  for (let i = 0; i < spikes * 2; i += 1) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = ((180 / spikes) * i - 90) * (Math.PI / 180);
    points.push(`${50 + radius * Math.cos(angle)},${50 + radius * Math.sin(angle)}`);
  }
  return points.join(" ");
}

// Deliberately asymmetric (notch only at the bottom-left of the tail) so
// every rotation and both flip axes produce a genuinely distinct silhouette.
const ARROW_POINTS = "15,58 15,42 55,42 55,30 80,50 55,70 55,58 25,58 25,68 15,68";

const SHAPE_PRIMITIVES = {
  triangle: { type: "polygon", points: regularPolygonPoints(3, 42) },
  diamond: { type: "polygon", points: regularPolygonPoints(4, 38) },
  pentagon: { type: "polygon", points: regularPolygonPoints(5, 40) },
  hexagon: { type: "polygon", points: regularPolygonPoints(6, 40) },
  star: { type: "polygon", points: starPoints(42, 18) },
  arrow: { type: "polygon", points: ARROW_POINTS },
  square: { type: "rect", x: 15, y: 15, width: 70, height: 70, rx: 6 },
  circle: { type: "circle", cx: 50, cy: 50, r: 38 },
};

function FillDefs({ patternId, fill, primaryColor, secondaryColor }) {
  if (fill !== "striped" && fill !== "hatched") return null;

  const primary = COLOR_HEX[primaryColor];
  const secondary = COLOR_HEX[secondaryColor];

  return (
    <defs>
      <pattern id={patternId} width={10} height={10} patternUnits="userSpaceOnUse">
        <rect width={10} height={10} fill={primary} />
        <line x1={0} y1={10} x2={10} y2={0} stroke={secondary} strokeWidth={3.5} />
        {fill === "hatched" && (
          <line x1={0} y1={0} x2={10} y2={10} stroke={secondary} strokeWidth={3.5} />
        )}
      </pattern>
    </defs>
  );
}

function shapeFillProps(fill, primaryColor, patternId) {
  if (fill === "outline") {
    return { fill: "none", stroke: COLOR_HEX[primaryColor], strokeWidth: 5 };
  }
  if (fill === "striped" || fill === "hatched") {
    return { fill: `url(#${patternId})`, stroke: COLOR_HEX[primaryColor], strokeWidth: 2 };
  }
  return { fill: COLOR_HEX[primaryColor], stroke: "none" };
}

function SingleShape({ shape, fill, primaryColor, secondaryColor, rotation, flipX, flipY, pixelSize }) {
  const patternId = useId();
  const primitive = SHAPE_PRIMITIVES[shape] ?? SHAPE_PRIMITIVES.square;
  const fillProps = shapeFillProps(fill, primaryColor, patternId);
  const scaleX = flipX ? -1 : 1;
  const scaleY = flipY ? -1 : 1;

  return (
    <svg viewBox="0 0 100 100" width={pixelSize} height={pixelSize} role="presentation" aria-hidden="true">
      <FillDefs
        patternId={patternId}
        fill={fill}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <g
        transform={`translate(50 50) rotate(${rotation}) scale(${scaleX} ${scaleY}) translate(-50 -50)`}
      >
        {primitive.type === "polygon" && (
          <polygon points={primitive.points} strokeLinejoin="round" {...fillProps} />
        )}
        {primitive.type === "rect" && (
          <rect
            x={primitive.x}
            y={primitive.y}
            width={primitive.width}
            height={primitive.height}
            rx={primitive.rx}
            {...fillProps}
          />
        )}
        {primitive.type === "circle" && (
          <circle cx={primitive.cx} cy={primitive.cy} r={primitive.r} {...fillProps} />
        )}
      </g>
    </svg>
  );
}

function ShapeFigure({ figure, size: sizeOverride }) {
  const { shape, fill, primaryColor, secondaryColor, rotation, flipX, flipY, size, count } = figure;
  const pixelSize = sizeOverride ?? SIZE_PX[size] ?? SIZE_PX.md;
  const copies = Math.max(1, Math.min(count ?? 1, 5));

  if (copies === 1) {
    return (
      <SingleShape
        shape={shape}
        fill={fill}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        rotation={rotation}
        flipX={flipX}
        flipY={flipY}
        pixelSize={pixelSize}
      />
    );
  }

  return (
    <div className="shape-figure-group">
      {Array.from({ length: copies }, (_, index) => (
        <SingleShape
          key={index}
          shape={shape}
          fill={fill}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          rotation={rotation}
          flipX={flipX}
          flipY={flipY}
          pixelSize={Math.round(pixelSize * 0.55)}
        />
      ))}
    </div>
  );
}

export default ShapeFigure;

import React, { ReactNode, useId } from "react";

interface StarProps {
  size?: number;
  color?: string;
  numPoints?: number;
  radiusRatio?: number;
  className?: string;
  useGradient?: boolean;
  textColor?: string;
  textClassName?: string;
  children?: ReactNode;
  gradientAngle?: number;
  gradientColors?: {
    start: string;
    end: string;
  };
}

const Star: React.FC<StarProps> = ({
  size = 200,
  color = "purple",
  numPoints = 30,
  radiusRatio = 0.78,
  className = "",
  useGradient = true,
  textColor = "white",
  textClassName = "font-extrabold text-[26px]",
  children,
  gradientAngle = -45,
  gradientColors = {
    start: "#4A38B1",
    end: "#7665c7",
  },
}) => {
  // Generate a unique ID for this star instance
  const uniqueId = useId();
  const gradientId = `star-gradient-${uniqueId}`;

  // Calculate points for a 10-point star
  const generateStarPoints = (
    outerRadius: number,
    innerRadius: number,
  ): string => {
    const center = size / 2;
    const points: [number, number][] = [];
    const angleStep = Math.PI / numPoints;

    for (let i = 0; i < numPoints * 2; i++) {
      // Alternate between outer and inner radius
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = i * angleStep;

      const x = center + radius * Math.sin(angle);
      const y = center - radius * Math.cos(angle);

      points.push([x, y]);
    }

    return points.map((point) => point.join(",")).join(" ");
  };

  // Calculate gradient coordinates based on angle
  const calculateGradientCoordinates = (angle: number) => {
    // Convert angle from degrees to radians
    const radians = (angle * Math.PI) / 180;

    // Calculate start and end points
    // We use cos for x and sin for y to match the standard mathematical angle system
    const x1 = 50 - 50 * Math.cos(radians);
    const y1 = 50 - 50 * Math.sin(radians);
    const x2 = 50 + 50 * Math.cos(radians);
    const y2 = 50 + 50 * Math.sin(radians);

    return { x1, y1, x2, y2 };
  };

  const outerRadius = size / 2;
  const innerRadius = outerRadius * radiusRatio;
  const starPoints = generateStarPoints(outerRadius, innerRadius);

  // Get gradient coordinates based on the angle
  const { x1, y1, x2, y2 } = calculateGradientCoordinates(gradientAngle);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
    >
      <defs>
        {useGradient && (
          <linearGradient
            id={gradientId}
            x1={`${x1}%`}
            y1={`${y1}%`}
            x2={`${x2}%`}
            y2={`${y2}%`}
          >
            <stop offset="0%" stopColor={gradientColors.start} />
            <stop offset="100%" stopColor={gradientColors.end} />
          </linearGradient>
        )}
      </defs>
      <polygon
        points={starPoints}
        fill={useGradient ? `url(#${gradientId})` : color}
      />
      {children && (
        <foreignObject
          x={size * 0.2}
          y={size * 0.2}
          width={size * 0.6}
          height={size * 0.6}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              color: textColor,
              textAlign: "center",
            }}
            className={textClassName}
          >
            {children}
          </div>
        </foreignObject>
      )}
    </svg>
  );
};

export default Star;

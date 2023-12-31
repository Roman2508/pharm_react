interface ISkeletonProps {
  width: string
  height: string
  radius?: string
  className?: string
  styles?: React.CSSProperties
}

const Skeleton: React.FC<ISkeletonProps> = ({ width, height, radius = '40', className = '', styles }) => {
  return (
    <svg
      role="img"
      width={width}
      height={height}
      aria-labelledby="loading-aria"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      style={styles}
    >
      <title id="loading-aria">Loading...</title>
      <rect
        x="0"
        y="0"
        rx={radius}
        ry={radius}
        width={width}
        height={height}
        // clip-path="url(#clip-path)"
        style={{ fill: 'url(#fill)' }}
      ></rect>
      <defs>
        <clipPath id="clip-path">
          <rect x="0" y="0" rx={radius} ry={radius} width={width} height={height} />
        </clipPath>
        <linearGradient id="fill">
          <stop offset="0.599964" stopColor="#f3f3f3" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="1.59996" stopColor="#ecebeb" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="2.59996" stopColor="#f3f3f3" stopOpacity="1">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Skeleton

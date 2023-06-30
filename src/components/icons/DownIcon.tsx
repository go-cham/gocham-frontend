interface DownIconProps {
  color?: string;
  className?: string;
}

export default function DownIcon({ color, className }: DownIconProps) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="down-32">
        <path
          id="Vector"
          d="M11 14L16 19L21 14"
          stroke={color || '#9E9E9E'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

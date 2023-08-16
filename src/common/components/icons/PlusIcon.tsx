interface PlusIconProps {
  color?: string;
  className?: string;
}

export default function PlusIcon({ color, className }: PlusIconProps) {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="plus 1">
        <path
          id="Vector"
          d="M9.5 3.75V14.25"
          stroke={color || '#9e9e9e'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M4.25 9H14.75"
          stroke={color || '#9e9e9e'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

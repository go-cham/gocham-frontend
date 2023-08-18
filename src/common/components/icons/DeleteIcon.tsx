interface DeleteIconProps {
  color?: string;
  className?: string;
  onClick?: () => void;
}

export default function DeleteIcon({
  color,
  className,
  onClick,
}: DeleteIconProps) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <g id="delete">
        <g id="Group 107">
          <path
            id="Vector"
            d="M30 14L14 30"
            stroke={color || '#424242'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_2"
            d="M14 14L30 30"
            stroke={color || '#424242'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}

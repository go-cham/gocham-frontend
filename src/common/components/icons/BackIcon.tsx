interface BackIconProps {
  onClick?: () => void;
  color?: string;
  className?: string;
}

export default function BackIcon({ onClick, color, className }: BackIconProps) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g id="back">
        <path
          id="Vector"
          d="M24.8203 30.624L16.2788 22.2018C16.1774 22.1016 16.1058 21.993 16.0639 21.876C16.0213 21.759 16 21.6337 16 21.5C16 21.3663 16.0213 21.241 16.0639 21.124C16.1058 21.007 16.1774 20.8984 16.2788 20.7982L24.8203 12.3509C25.0568 12.117 25.3525 12 25.7074 12C26.0622 12 26.3664 12.1253 26.6198 12.376C26.8733 12.6266 27 12.9191 27 13.2533C27 13.5875 26.8733 13.8799 26.6198 14.1306L19.1682 21.5L26.6198 28.8694C26.8564 29.1033 26.9747 29.3914 26.9747 29.7337C26.9747 30.0766 26.8479 30.3734 26.5945 30.624C26.341 30.8747 26.0453 31 25.7074 31C25.3694 31 25.0737 30.8747 24.8203 30.624Z"
          fill={color || '#424242'}
        />
      </g>
    </svg>
  );
}

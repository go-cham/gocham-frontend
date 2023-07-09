interface ClockIconProps {
  color?: string;
  className?: string;
}

export default function ClockIcon({ color, className }: ClockIconProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.66 0C2.98 0 0 2.98667 0 6.66667C0 10.3467 2.98 13.3333 6.66 13.3333C10.3467 13.3333 13.3333 10.3467 13.3333 6.66667C13.3333 2.98667 10.3467 0 6.66 0ZM9.33333 9.33333C9.27166 9.39514 9.1984 9.44417 9.11775 9.47762C9.0371 9.51108 8.95065 9.5283 8.86333 9.5283C8.77602 9.5283 8.68957 9.51108 8.60892 9.47762C8.52827 9.44417 8.45501 9.39514 8.39333 9.33333L6.2 7.14C6.13701 7.07826 6.08689 7.00463 6.05256 6.92338C6.01823 6.84213 6.00037 6.75487 6 6.66667V4C6 3.63333 6.3 3.33333 6.66667 3.33333C7.03333 3.33333 7.33333 3.63333 7.33333 4V6.39333L9.33333 8.39333C9.59333 8.65333 9.59333 9.07333 9.33333 9.33333Z"
        fill={color || '#ff7860'}
      />
    </svg>
  );
}

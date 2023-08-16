interface CheckIconProps {
  color?: string;
  className?: string;
}

export default function CheckIcon({ color, className }: CheckIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="check-24">
        <path
          id="Vector (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.3977 7.10225C18.6174 7.32192 18.6174 7.67808 18.3977 7.89775L10.1477 16.1477C9.92808 16.3674 9.57192 16.3674 9.35225 16.1477L5.60225 12.3977C5.38258 12.1781 5.38258 11.8219 5.60225 11.6023C5.82192 11.3826 6.17808 11.3826 6.39775 11.6023L9.75 14.9545L17.6023 7.10225C17.8219 6.88258 18.1781 6.88258 18.3977 7.10225Z"
          fill={color || '#757575'}
          stroke={color || '#757575'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

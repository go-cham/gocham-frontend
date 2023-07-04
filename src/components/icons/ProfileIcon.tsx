interface ProfileIconProps {
  color?: string;
  className?: string;
}
export default function ProfileIcon({ color, className }: ProfileIconProps) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="user_line">
        <path
          id="Vector"
          d="M27.0007 27.2502V24.5002C27.0007 23.0414 26.4212 21.6424 25.3897 20.611C24.3582 19.5795 22.9592 19 21.5005 19H10.5002C9.04143 19 7.64244 19.5795 6.61096 20.611C5.57948 21.6424 5 23.0414 5 24.5002V27.2502"
          stroke={color || '#424242'}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M16.0002 15.0003C19.0378 15.0003 21.5003 12.5378 21.5003 9.50016C21.5003 6.46251 19.0378 4 16.0002 4C12.9625 4 10.5 6.46251 10.5 9.50016C10.5 12.5378 12.9625 15.0003 16.0002 15.0003Z"
          stroke={color || '#424242'}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

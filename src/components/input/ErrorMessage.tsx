interface ErrorMessageProps {
  children: React.ReactNode;
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return <span className="text-[1.2rem] text-error">{children}</span>;
}

interface ErrorMessageProps {
  children: React.ReactNode;
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return <span className="text-error text-[1.2rem]">{children}</span>;
}

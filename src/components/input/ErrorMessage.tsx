export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <span className="text-[1.2rem] text-error">{children}</span>;
}

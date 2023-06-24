import ErrorMessage from '@/components/input/ErrorMessage';

export default function InputLayout({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className={`flex flex-col border-b-[2px] pb-[0.8rem] focus-within:border-b-[4px] ${
          error ? 'border-error' : 'border-gray1'
        }`}
      >
        <label className="mb-[0.8rem] text-[1rem]">{label}</label>
        {children}
      </div>
      <div className="text-right">
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </div>
  );
}

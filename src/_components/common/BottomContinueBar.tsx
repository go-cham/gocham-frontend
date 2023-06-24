const BottomContinueBar = ({
  title,
  clickAction,
  fontColor,
  buttonColor,
  boxColor,
  height,
  boxShadow,
}: {
  title: string;
  clickAction?: () => void;
  fontColor?: string;
  buttonColor?: string;
  boxColor?: string;
  height?: number;
  boxShadow?: boolean;
}) => {
  return (
    <div
      className="w-full"
      style={{
        boxShadow: boxShadow ? '0 0 2.5rem rgba(42,45,55,0.1)' : undefined,
        height: height + 'rem' || '10.8rem',
        backgroundColor: boxColor || 'white',
      }}
    >
      <button
        onClick={clickAction}
        className="mx-auto mt-[1.7rem] flex h-[4.7rem] w-[34rem] items-center justify-center rounded-[0.5rem] text-[1.6rem] font-bold"
        style={{ color: fontColor || 'white', backgroundColor: buttonColor }}
      >
        {title}
      </button>
    </div>
  );
};

export default BottomContinueBar;

import { FadeLoader } from 'react-spinners';

import { customColors } from '@/styles/colors';

interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <FadeLoader
      className={className}
      color={customColors.mainSub.main['500']}
      height={12}
      margin={2}
      radius={3}
      speedMultiplier={1}
      width={5}
    />
  );
}

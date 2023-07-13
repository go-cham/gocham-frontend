import { FadeLoader } from 'react-spinners';

import { customColors } from '@/styles/colors';

export default function LoadingSpinner() {
  return (
    <FadeLoader
      color={customColors.mainSub.main['500']}
      height={12}
      margin={2}
      radius={3}
      speedMultiplier={1}
      width={5}
    />
  );
}

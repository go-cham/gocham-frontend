// https://github.com/dcastil/tailwind-merge/issues/217
import { extendTailwindMerge } from 'tailwind-merge';

export const twMergeCustom = extendTailwindMerge({
  classGroups: {
    'font-size': [
      'text-hero',
      'text-heading1',
      'text-heading2',
      'text-heading3',
      'text-subheading',
      'text-body1',
      'text-body2',
      'text-body3',
      'text-body4',
      'text-body5',
      'text-caption',
    ],
  },
});

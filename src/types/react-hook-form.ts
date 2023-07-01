import { Control, RegisterOptions } from 'react-hook-form';

export type ReactHookFormInputProps = {
  name: string;
  control: Control<any, any>;
  rules?: RegisterOptions;
};

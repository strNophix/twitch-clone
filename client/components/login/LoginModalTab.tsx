import clsx from 'clsx';
import { FC } from 'react';

interface LoginModalTabProps extends React.ComponentPropsWithoutRef<'p'> {
  selected: boolean;
}

const LoginModalTab: FC<LoginModalTabProps> = ({ selected, ...rest }) => {
  return (
    <p
      className={clsx(
        'font-semibold p-1',
        selected && 'text-violet-400 border-b-2 border-b-violet-400'
      )}
      {...rest}
    />
  );
};

export default LoginModalTab;

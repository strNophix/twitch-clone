import clsx from 'clsx';
import { FC } from 'react';
import Link from 'next/link';

export interface InlineLinkProps extends React.ComponentPropsWithoutRef<'span'> {
  to: string;
}

const InlineLink: FC<InlineLinkProps> = ({ to, className, ...rest }) => {
  return (
    <Link href={to} passHref={true}>
      <span className={clsx('text-violet-400 cursor-pointer text-sm', className)} {...rest} />
    </Link>
  );
};

export default InlineLink;

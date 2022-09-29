import { FC } from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

export interface InlineLinkProps
  extends React.ComponentPropsWithoutRef<"span"> {
  to: string;
  external?: boolean;
}

const InlineLink: FC<InlineLinkProps> = ({
  to,
  external,
  className,
  ...rest
}) => {
  if (external === true) {
    return (
      <a href={to}>
        <span
          className={clsx("text-violet-400 cursor-pointer text-sm", className)}
          {...rest}
        />
      </a>
    );
  }

  return (
    <NavLink to={to}>
      <span
        className={clsx("text-violet-400 cursor-pointer text-sm", className)}
        {...rest}
      />
    </NavLink>
  );
};

export default InlineLink;

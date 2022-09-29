import clsx from "clsx";
import { forwardRef } from "react";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        className={clsx(
          "bg-zinc-700 rounded-md box-border focus:outline outline-violet-400 text-sm",
          className
        )}
        {...rest}
        ref={ref}
      />
    );
  }
);

export default Input;

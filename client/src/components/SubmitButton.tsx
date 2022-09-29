import { FC } from "react";
import clsx from "clsx";

interface ButtonProps extends React.ComponentPropsWithoutRef<"input"> {}

const SubmitButton: FC<ButtonProps> = ({ className, ...rest }) => {
  return (
    <input
      type="submit"
      className={clsx(
        "rounded-md bg-violet-500 font-semibold py-2 text-sm",
        className
      )}
      {...rest}
    />
  );
};

export default SubmitButton;

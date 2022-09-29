import { FC } from "react";
import clsx from "clsx";

type ButtonVariants = "filled" | "subtle";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariants;
}

const getStyling = (variant?: ButtonVariants) => {
  switch (variant) {
    case "filled":
      return "bg-neutral-700";
    case "subtle":
      return "hover:bg-neutral-500";
    default:
      return "bg-neutral-700";
  }
};

const Button: FC<ButtonProps> = ({ className, variant, ...rest }) => {
  return (
    <button
      className={clsx("rounded-md", getStyling(variant), className)}
      {...rest}
    />
  );
};

export default Button;

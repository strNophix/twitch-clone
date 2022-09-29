import clsx from "clsx";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {}

const Input = ({ className, ...rest }: InputProps) => {
  return (
    <input
      className={clsx(
        "bg-zinc-700 rounded-md box-border focus:outline outline-violet-400 text-sm",
        className
      )}
      {...rest}
    />
  );
};

export default Input;

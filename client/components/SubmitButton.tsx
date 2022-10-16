import clsx from "clsx"
import { FC } from "react"

type ButtonProps = React.ComponentPropsWithoutRef<"input">

const SubmitButton: FC<ButtonProps> = ({ className, ...rest }) => {
  return (
    <input
      type="submit"
      className={clsx(
        "cursor-pointer rounded-md bg-violet-500 font-semibold py-2 text-sm",
        className,
      )}
      {...rest}
    />
  )
}

export default SubmitButton

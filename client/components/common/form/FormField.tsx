/* eslint-disable react/display-name */
import { forwardRef, ReactNode } from "react"

import Input from "../Input"

interface FormFieldProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string
  bottomElement?: ReactNode
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, bottomElement, hidden, ...inputProps }, ref) => {
    return (
      <div className="space-y-1">
        <label htmlFor={inputProps.id} className="font-semibold text-sm">
          {label}
        </label>
        <Input {...inputProps} ref={ref} />
        {bottomElement}
      </div>
    )
  },
)

export default FormField

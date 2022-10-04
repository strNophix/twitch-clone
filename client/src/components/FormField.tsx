import { forwardRef, ReactNode } from "react";

import Input from "./Input";

interface FormFieldProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  bottomElement?: ReactNode;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, bottomElement, ...inputProps }, ref) => {
    return (
      <div className="space-y-1">
        <label htmlFor={inputProps.id} className="font-semibold text-sm">
          {label}
        </label>
        <br />
        <Input {...inputProps} ref={ref} />
        {bottomElement}
      </div>
    );
  }
);

export default FormField;

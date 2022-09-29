import { ReactNode } from "react";
import Input from "./Input";

interface FormFieldProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  bottomElement?: ReactNode;
}

const FormField = ({ label, bottomElement, ...inputProps }: FormFieldProps) => {
  return (
    <div className="space-y-1">
      <label htmlFor={inputProps.id} className="font-semibold text-sm">
        {label}
      </label>
      <br />
      <Input {...inputProps} />
      {bottomElement}
    </div>
  );
};

export default FormField;

import { ChangeEvent } from "react";

type FieldType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "date"
  | "file"
  | "image";
interface formProp {
  type?: FieldType;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  value?: string
  className?: string
  onBlur?: any
}
const Form = ({value, type = "text", onChange, name, placeholder,className,onBlur }: formProp) => {
  return (
    <div className="flex ">
      <input
       className ={className}
        type={type}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Form;

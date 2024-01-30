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
}
const Form = ({value, type = "text", onChange, name, placeholder }: formProp) => {
  return (
    <div className="flex ">
      <input
       className="border-2 border-gray-400 rounded-lg w-full px-2"
        type={type}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Form;

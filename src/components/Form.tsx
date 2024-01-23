type FieldType = "text" | "password" | "email" | "number";
interface formProp {
  type: FieldType;
  onChange: () => void;
  name: string;
  placeholder: string;
}
const Form = ({ type, onChange, name, placeholder }: formProp) => {
  return (
    <div>
      <input
        type={type}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Form;

type InputType = {
  inputRegister?: any;
  label: string;
  htmlFor: string;
  inputType: string;
  error?: any;
  placeholder?: string;
  required?: boolean;
  inputMode?: string;
  style?: string;
};

const InputBox2 = ({
  inputRegister,
  label,
  htmlFor,
  inputType,
  error,
  placeholder,
  required,
  inputMode,
  style,
}: InputType) => {
  return (
    <section className="w-full flex flex-col">
      <label className="text-base font-light flex gap-1" htmlFor={htmlFor}>
        {label}
        <p className={`${required ? "text-red-400" : "text-[#272829]"}`}>
          {required ? "*" : "(Optional)"}
        </p>
      </label>
      <input
        {...inputRegister}
        className={`py-3 transition border-b-[1px] border-b-gray-400 text-sm focus:border-b-[#272829] focus:transition focus:outline-none ${style}`}
        type={inputType}
        id={htmlFor}
        placeholder={placeholder}
        inputMode={inputMode}
      />
      {error}
    </section>
  );
};

export default InputBox2;

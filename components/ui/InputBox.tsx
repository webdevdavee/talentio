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

const InputBox = ({
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
      <div className="border-[1px] border-gray-400">
        <input
          {...inputRegister}
          className={`w-full py-3 px-2 text-sm transition focus:transition focus:outline-none ${style}`}
          type={inputType}
          id={htmlFor}
          placeholder={placeholder}
          inputMode={inputMode}
        />
        {error}
      </div>
    </section>
  );
};

export default InputBox;

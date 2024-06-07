type TextAreaProps = {
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

const TextArea = ({
  inputRegister,
  label,
  htmlFor,
  inputType,
  error,
  placeholder,
  required,
  inputMode,
  style,
}: TextAreaProps) => {
  return (
    <section className="w-full flex flex-col">
      <label className="text-base font-light flex gap-1" htmlFor={htmlFor}>
        {label}
        <p className={`${required ? "text-red-400" : "text-[#272829]"}`}>
          {required ? "*" : "(Optional)"}
        </p>
      </label>
      <textarea
        {...inputRegister}
        className={`p-3 transition border-[1px] border-gray-400 text-sm focus:border-[#272829] focus:transition focus:outline-none ${style}`}
        type={inputType}
        id={htmlFor}
        placeholder={placeholder}
        inputMode={inputMode}
      />
      {error}
    </section>
  );
};

export default TextArea;

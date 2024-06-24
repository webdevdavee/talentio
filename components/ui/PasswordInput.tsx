import Image from "next/image";
import { useState, useRef, useEffect } from "react";

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

// Define a custom type for the style object including webkitTextSecurity
interface CustomCSSProperties extends React.CSSProperties {
  webkitTextSecurity?: "none" | "disc" | "circle" | "square";
}

const PasswordInput = ({
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setAttribute("autocomplete", "new-password");
      // Use the custom type here
      (inputRef.current.style as CustomCSSProperties).webkitTextSecurity =
        isPasswordVisible ? "none" : "disc";
    }
  }, [isPasswordVisible]);

  return (
    <section className="relative w-full flex flex-col">
      <label className="text-base font-light flex gap-1" htmlFor={htmlFor}>
        {label}
        <p className={`${required ? "text-red-400" : "text-[#272829]"}`}>
          {required ? "*" : "(Optional)"}
        </p>
      </label>
      <div className="w-full flex items-center justify-between border-b-[1px] border-b-gray-400">
        <input
          {...inputRegister}
          ref={inputRef}
          type="text"
          className={`w-full py-3 text-sm transition focus:transition focus:outline-none ${style}`}
          id={htmlFor}
          placeholder={placeholder}
          inputMode={inputMode}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          data-lpignore="true"
        />
        <button
          type="button"
          className="flex items-center px-4 text-gray-600"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <Image
              src="/eye-slash.svg"
              width={20}
              height={20}
              alt="hide-password"
            />
          ) : (
            <Image
              src="/eye-no-slash.svg"
              width={20}
              height={20}
              alt="hide-password"
            />
          )}
        </button>
      </div>
      {error}
    </section>
  );
};

export default PasswordInput;

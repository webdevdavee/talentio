type RadioInputProps = {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (type: string, label: string) => void;
};

const RadioInput = ({
  id,
  name,
  label,
  checked,
  onChange,
}: RadioInputProps) => {
  return (
    <button
      type="button"
      className="flex items-center space-x-2 p-4 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
      onClick={() => onChange(name, id)}
    >
      <input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        className="form-radio h-4 w-4 text-primary border-gray-300 focus:ring-primary"
        readOnly
      />
      <label htmlFor={id} className="font-medium text-gray-700">
        {label}
      </label>
    </button>
  );
};

export default RadioInput;

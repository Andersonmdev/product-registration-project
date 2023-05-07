interface SelectProps {
  width?: string;
  options: string[];
  placeholder?: string;
  onChange: (_value: string) => void;
}

export function Select({ width, options, placeholder, onChange }: SelectProps) {
  return (
    <select
      placeholder={placeholder}
      className={`p-2 rounded-md  border border-blue-500 ${width ?? 'w-full'}`}
      onChange={(event: any) => onChange(event.target.value)}
    >
      {
        options.map((option) => {
          return (
            <option key={option} value={option}>{option}</option>
          );
        })
      }
    </select>
  );
}

interface InputProps {
  type?: 'text' | 'file' | 'number';
  value?: string;
  width?: string;
  required?: boolean;
  placeholder?: string;
  errorMessage?: string;
  onChange?: (_event: any) => void;
}

export function Input(props: InputProps) {
  return (
    <>
      {
        props.type === 'file' ? (
          <div>
            <label
              htmlFor="file-input"
              className={
                props.errorMessage ?
                  'text-red-500 font-bold cursor-pointer' :
                  'text-blue-500 font-bold cursor-pointer'
              }
            >
              {`${props.placeholder}${props.required ? '*' : ''}`}
            </label>
            <input
              id="file-input"
              type="file"
              className="hidden"
              accept="image/*"
              value={props.value}
              onChange={props.onChange}
            />
            <div className="ml-1">
              <p className="text-xs text-red-500">{props.errorMessage}</p>
            </div>
          </div>
        ) : (
          <div className={props.width ?? 'w-full'}>
            <input
              required={props.required}
              type={props.type ?? 'text'}
              className={
                props.errorMessage ?
                  'p-2 rounded-md  border border-red-500 placeholder-red-500 w-full' :
                  'border border-blue-500 px-4 py-2 rounded-md w-full'
              }
              placeholder={`${props.placeholder}${props.required ? '*' : ''}`}
              value={props.value}
              onChange={props.onChange}
            />
            <div className="ml-1">
              <p className="text-xs text-red-500">{props.errorMessage}</p>
            </div>
          </div>
        )
      }
    </>
  );
}

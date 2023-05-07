interface ButtonProps {
  width?: string;
  outline?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={props.outline ?
        `border border-[##063c7b] text-blue-500 px-4 py-2 rounded-md ${props.width} 
        hover:bg-blue-800 hover:text-white` :
        `bg-[#063c7b] text-white px-4 py-2 rounded-md ${props.width} hover:bg-blue-800`}>
      {props.children}
    </button>
  );
}

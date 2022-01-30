import { useState } from "react";

export function UpdatableField({
  value,
  onChange,
}: {
  value: number | string;
  onChange: (x: string) => void;
}) {
  const [isNormal, changeField] = useState(true);
  const normalField = (
    <div
      className="hover:bg-sky-700 hover:text-gray-200 cursor-pointer pr-1 pl-1 rounded-md transition-all w-full min-h-[20px]"
      onClick={() => changeField(!isNormal)}
    >
      {value}
    </div>
  );
  const editField = (
    <input
      type="text"
      value={value}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          changeField(!isNormal);
        }
      }}
      onChange={(event) => onChange(event?.target.value)}
      onBlur={() => changeField(true)}
      autoFocus
      className="bg-gray-800 outline outline-cyan-400 rounded-md"
    />
  );
  return isNormal ? normalField : editField;
}

export function Labeled({
  children,
  label,
  className = "",
}: {
  children: JSX.Element;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex ${className}`}>
      <label className={`mr-1 text-gray-500`}>{label}:</label>
      {children}
    </div>
  );
}

export function Avatar({
  dataURL,
  onClick = () => {},
}: {
  dataURL?: string | null;
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}) {
  return (
    <img
      src={dataURL ?? ""}
      className="w-10 h-10 rounded-full cursor-pointer hover:brightness-125 transition-all"
      onClick={onClick}
    ></img>
  );
}

export function BaseBtn({
  onClick = () => {},
  children = "",
  isDisabled = false,
  className = "",
}) {
  return (
    <button
      className={`bg-gray-300 text-cyan-800 font-bold rounded-md pr-2 pl-2  ${
        isDisabled ? "opacity-50" : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

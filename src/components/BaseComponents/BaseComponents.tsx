import { useState } from "react";
import { pipe } from "../../Utils/FunctionUtils";
import { clamp } from "../../Utils/NumberUtils";

export function UpdatableField({
  value,
  onChange,
  id = "",
}: {
  value: number | string;
  onChange: (x: string | number) => void;
  id?: string;
}) {
  const [isNormal, changeField] = useState(true);
  const normalField = (
    <div
      className="hover:bg-sky-700 hover:text-gray-200 cursor-pointer pr-1 pl-1 rounded-md transition-all w-full min-h-[20px]"
      onClick={() => changeField(false)}
      id={id}
    >
      {value}
    </div>
  );
  const InputType = typeof value === "number" ? NumberInput : TextInput;
  const editField = (
    <InputType
      id={id}
      value={value}
      toggleKind={() => changeField(true)}
      onChange={onChange}
    />
  );
  return isNormal ? normalField : editField;
}

export function NumberInput({
  toggleKind = () => {},
  id = "",
  value = 0 as number | string,
  onChange = (x: number | string) => {},
}) {
  const minAge = 0;
  const maxage = 150;
  const step = 1;
  const parseString = pipe(Number, Math.floor, (x) => clamp(minAge, maxage, x));
  return (
    <input
      id={id}
      type="number"
      step={step}
      min={minAge}
      max={maxage}
      value={parseString(value)}
      onKeyPress={(event) => {
        if (event.key === "Enter") toggleKind();
      }}
      onChange={(event) => onChange(parseString(event.target.value))}
      onBlur={toggleKind}
      autoFocus
      className="contact-input"
    />
  );
}
function TextInput({
  toggleKind = () => {},
  id = "",
  value = "" as number | string,
  onChange = (x: string | number) => {},
}) {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onKeyPress={(event) => {
        if (event.key === "Enter") toggleKind();
      }}
      onChange={(event) => onChange(event.target.value)}
      onBlur={toggleKind}
      autoFocus
      className="contact-input"
    />
  );
}

export function Labeled({
  children,
  label,
  className = "",
  htmlFor = "",
}: {
  children: JSX.Element;
  label: string;
  className?: string;
  htmlFor?: string;
}) {
  return (
    <div className={`flex ${className}`}>
      <label className={`mr-1 text-gray-500`} htmlFor={htmlFor}>
        {label}:
      </label>
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
      className={`default-btn  ${
        isDisabled ? "opacity-50 pointer-events-none" : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

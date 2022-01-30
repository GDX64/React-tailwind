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
      className="hover:bg-sky-700 hover:text-gray-200 cursor-pointer mb-1"
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
      className="bg-gray-800 outline outline-cyan-400 mb-1 rounded-md"
    />
  );
  return isNormal ? normalField : editField;
}

export function Labeled({
  children,
  label,
}: {
  children: JSX.Element;
  label: string;
}) {
  return (
    <div className="flex">
      <label className="mr-1 text-gray-500">{label}:</label>
      {children}
    </div>
  );
}

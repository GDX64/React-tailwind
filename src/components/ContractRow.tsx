import { useState } from "react";
import Contract from "../Entities/Contract";
import "./BaseButton.css";

interface ContractRowProps {
  contract: Contract;
  onChange: (state: Contract) => void;
}
function ContractRow({ contract, onChange }: ContractRowProps) {
  const [state, updateValue] = useState(contract);
  const hasChanges = JSON.stringify(contract) !== JSON.stringify(state);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <UpdatableField
          value={state.name}
          onChange={(value) => updateValue({ ...state, name: value })}
        ></UpdatableField>
        <UpdatableField
          value={state.email}
          onChange={(value) => updateValue({ ...state, email: value })}
        ></UpdatableField>
      </div>
      <Footer
        hasChanges={hasChanges}
        onCancel={() => updateValue(contract)}
        onApply={() => onChange(state)}
      ></Footer>
    </div>
  );
}

function Footer({
  onApply = () => {},
  hasChanges = false,
  onCancel = () => {},
}) {
  return (
    <div className="">
      <BaseBtn onClick={onApply} isDisabled={!hasChanges} className="m-2">
        Apply Changes
      </BaseBtn>
      <BaseBtn onClick={onCancel} isDisabled={!hasChanges}>
        CancelChanges
      </BaseBtn>
    </div>
  );
}

function BaseBtn({
  onClick = () => {},
  children = "",
  isDisabled = false,
  className = "",
}) {
  return (
    <button
      className={`bg-gray-300 text-black rounded-md pr-2 pl-2 ${
        isDisabled ? "opacity-50" : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function ContractsTable({
  contracts = [] as Contract[],
  onChange = (state: Contract) => {},
}) {
  return (
    <div className="">
      {contracts.map((contract) => (
        <ContractRow
          contract={contract}
          key={contract.id}
          onChange={onChange}
        ></ContractRow>
      ))}
    </div>
  );
}

function UpdatableField({ value = "", onChange = (x: string) => {} }) {
  const [isNormal, changeField] = useState(true);
  const normalField = (
    <div className="" onDoubleClick={() => changeField(!isNormal)}>
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
    />
  );
  return isNormal ? normalField : editField;
}

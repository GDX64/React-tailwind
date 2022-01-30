import { useState } from "react";
import Contract from "../Entities/Contract";
import "./BaseButton.css";
function ContractRow({ contract }: { contract: Contract }) {
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
      {hasChanges && <BaseBtn onClick={onApply}>Apply Changes</BaseBtn>}
      {hasChanges && <BaseBtn onClick={onCancel}>Apply Changes</BaseBtn>}
    </div>
  );
}

function BaseBtn({ onClick = () => {}, children = "" }) {
  return (
    <button className="bg-gray-300 text-black rounded-sm" onClick={onClick}>
      {children}
    </button>
  );
}

export function ContractsTable({ contracts = [] as Contract[] }) {
  return (
    <div className="">
      {contracts.map((contract) => (
        <ContractRow contract={contract} key={contract.id}></ContractRow>
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

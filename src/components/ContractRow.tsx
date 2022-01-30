import { useState } from "react";
import Contract from "../Entities/Contract";
function ContractRow({ contract }: { contract: Contract }) {
  const [state, updateValue] = useState(contract);
  return (
    <div className="">
      <UpdatableField
        value={state.name}
        onChange={(value) => updateValue({ ...state, name: value })}
      ></UpdatableField>
      <UpdatableField
        value={state.email}
        onChange={(value) => updateValue({ ...state, email: value })}
      ></UpdatableField>
    </div>
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

export function UpdatableField({ value = "", onChange = (x: string) => {} }) {
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

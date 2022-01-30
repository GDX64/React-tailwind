import { useState } from "react";
import Contract from "../Entities/Contract";

interface ContractRowProps {
  contract: Contract;
  onChange: (state: Contract) => void;
}
function ContractRow({ contract, onChange }: ContractRowProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex flex-col mb-2">
      <ContractSummary
        contract={contract}
        onClick={() => setExpanded(!expanded)}
      ></ContractSummary>
      {expanded && (
        <ContractFullInfo {...{ contract, onChange }}></ContractFullInfo>
      )}
    </div>
  );
}

function ContractSummary({
  contract,
  onClick,
}: {
  contract: Contract;
  onClick: () => void;
}) {
  return (
    <div
      className="flex w-96 border border-black justify-around cursor-pointer select-none"
      onClick={onClick}
    >
      <div className="">{contract.name}</div>
      <div className="">{contract.email}</div>
    </div>
  );
}

function ContractFullInfo({ contract, onChange }: ContractRowProps) {
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
        Apply
      </BaseBtn>
      <BaseBtn onClick={onCancel} isDisabled={!hasChanges}>
        Cancel
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
      className={`bg-gray-300 text-cyan-800 font-bold rounded-md pr-2 pl-2  ${
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
    <div className="bg-sky-900 text-gray-300 pl-3 pr-3 pt-3 pb-3 rounded-md">
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

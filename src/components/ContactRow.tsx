import { useState } from "react";
import Contact from "../Entities/Contact";

interface ContactRowProps {
  Contact: Contact;
  onChange: (state: Contact) => void;
}
function ContactRow({ Contact, onChange }: ContactRowProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex flex-col mb-2">
      <ContactSummary
        Contact={Contact}
        onClick={() => setExpanded(!expanded)}
      ></ContactSummary>
      {expanded && (
        <ContactFullInfo {...{ Contact, onChange }}></ContactFullInfo>
      )}
    </div>
  );
}

function ContactSummary({
  Contact,
  onClick,
}: {
  Contact: Contact;
  onClick: () => void;
}) {
  return (
    <div
      className="flex w-96 border-2 border-sky-800 justify-around cursor-pointer select-none"
      onClick={onClick}
    >
      <div className="">{Contact.name}</div>
      <div className="">{Contact.email}</div>
    </div>
  );
}

function ContactFullInfo({ Contact, onChange }: ContactRowProps) {
  const [state, updateValue] = useState(Contact);
  const hasChanges = JSON.stringify(Contact) !== JSON.stringify(state);
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
        onCancel={() => updateValue(Contact)}
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

export function ContactsTable({
  Contacts = [] as Contact[],
  onChange = (state: Contact) => {},
}) {
  return (
    <div className="bg-sky-900 text-gray-300 pl-3 pr-3 pt-3 pb-3 rounded-md">
      {Contacts.map((Contact) => (
        <ContactRow
          Contact={Contact}
          key={Contact.id}
          onChange={onChange}
        ></ContactRow>
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

import { useState } from "react";
import Contact, { fieldsArr } from "../Entities/Contact";
import { readImage } from "../Utils/ReadImage";
import { Labeled, UpdatableField, Avatar } from "./BaseComponents";
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
  const fields = getAllFields(state, updateValue);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col"></div>
      {fields}
      <Avatar
        onClick={() =>
          readImage().then((image) => updateValue({ ...state, image }))
        }
        dataURL={state.image}
      ></Avatar>
      <Footer
        hasChanges={hasChanges}
        onCancel={() => updateValue(Contact)}
        onApply={() => onChange(state)}
      ></Footer>
    </div>
  );
}

function getAllFields(state: Contact, updateValue: (contact: Contact) => void) {
  return fieldsArr.map(({ field, label }) => {
    return (
      <Labeled label={label} key={field}>
        <UpdatableField
          value={state[field]}
          onChange={(value) => updateValue({ ...state, [field]: value })}
        ></UpdatableField>
      </Labeled>
    );
  });
}

function Footer({
  onApply = () => {},
  hasChanges = false,
  onCancel = () => {},
}) {
  return (
    <div className="">
      <BaseBtn onClick={onApply} isDisabled={!hasChanges} className="m-2">
        Save
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
    <div className="bg-sky-900 text-gray-400 pl-3 pr-3 pt-3 pb-3 rounded-md">
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

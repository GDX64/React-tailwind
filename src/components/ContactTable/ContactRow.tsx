import { useState } from "react";
import Contact, { fieldsArr } from "../../Entities/Contact";
import { readImage } from "../../Utils/ReadImage";
import {
  Labeled,
  UpdatableField,
  Avatar,
  BaseBtn,
} from "../BaseComponents/BaseComponents";
interface ContactRowProps {
  Contact: Contact;
  onChange: (state: Contact) => void;
  onDelete: (state: Contact) => void;
}
export function ContactRow({ Contact, onChange, onDelete }: ContactRowProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex flex-col mb-2">
      <ContactSummary
        contact={Contact}
        onClick={() => setExpanded(!expanded)}
        onChange={onChange}
      ></ContactSummary>
      {expanded && (
        <ContactFullInfo {...{ Contact, onChange, onDelete }}></ContactFullInfo>
      )}
    </div>
  );
}

function ContactSummary({
  contact,
  onClick,
  onChange,
}: {
  contact: Contact;
  onClick: () => void;
  onChange: (state: Contact) => void;
}) {
  return (
    <div
      className="flex w-96 border-2 border-sky-800 justify-around cursor-pointer select-none pt-1 pb-1 items-center"
      onClick={onClick}
    >
      <Avatar
        dataURL={contact.image}
        onClick={(event) => {
          event.stopPropagation();
          readImage().then((image) => onChange({ ...contact, image }));
        }}
      ></Avatar>
      <div className="w-40 overflow-x-hidden overflow-ellipsis whitespace-nowrap">
        {contact.name}
      </div>
      <div className="w-36 overflow-x-hidden overflow-ellipsis whitespace-nowrap">
        {contact.phone}
      </div>
    </div>
  );
}

function ContactFullInfo({ Contact, onChange, onDelete }: ContactRowProps) {
  const [state, updateValue] = useState(Contact);
  const hasChanges = JSON.stringify(Contact) !== JSON.stringify(state);
  const fields = getAllFields(state, updateValue);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col"></div>
      {fields}
      <Footer
        hasChanges={hasChanges}
        onCancel={() => updateValue(Contact)}
        onApply={() => onChange(state)}
        onDelete={() => onDelete(state)}
      ></Footer>
    </div>
  );
}

function getAllFields(
  contact: Contact,
  updateValue: (contact: Contact) => void
) {
  return fieldsArr.map(({ field, label }) => {
    const id = `${field}-${label}-${contact.id}`;
    return (
      <Labeled
        label={label}
        key={field}
        className="border-b border-b-sky-800 w-full h-10 items-center"
        htmlFor={id}
      >
        <UpdatableField
          value={contact[field]}
          onChange={(value) => updateValue({ ...contact, [field]: value })}
          id={id}
        ></UpdatableField>
      </Labeled>
    );
  });
}

function Footer({
  onApply = () => {},
  hasChanges = false,
  onCancel = () => {},
  onDelete = () => {},
}) {
  return (
    <div className="">
      <BaseBtn onClick={onApply} isDisabled={!hasChanges} className="m-2 w-16">
        Save
      </BaseBtn>
      <BaseBtn onClick={onCancel} isDisabled={!hasChanges} className="m-2 w-16">
        Cancel
      </BaseBtn>
      <BaseBtn onClick={onDelete} className="m-2 w-16">
        Delete
      </BaseBtn>
    </div>
  );
}

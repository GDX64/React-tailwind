import { useState } from "react";
import Store from "../../Database/Store";
import Contact, { fieldsArr, updateArray } from "../../Entities/Contact";
import { readImage } from "../../Utils/ReadImage";
import { Labeled, UpdatableField, Avatar, BaseBtn } from "../BaseComponents";
interface ContactRowProps {
  Contact: Contact;
  onChange: (state: Contact) => void;
  onDelete: (state: Contact) => void;
}
function ContactRow({ Contact, onChange, onDelete }: ContactRowProps) {
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

function getAllFields(state: Contact, updateValue: (contact: Contact) => void) {
  return fieldsArr.map(({ field, label }) => {
    return (
      <Labeled
        label={label}
        key={field}
        className="border-b border-b-sky-800 w-full h-10 items-center"
      >
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

export function ContactsTable() {
  const [{ contacts }, setContacts] = useState(Store.state);
  return (
    <div className="bg-sky-900 text-gray-400 pl-3 pr-3 pt-3 pb-3 rounded-md">
      {contacts.map((Contact) => (
        <ContactRow
          Contact={Contact}
          key={Contact.id}
          onChange={async (contact) =>
            setContacts(await Store.updateContacts(contact))
          }
          onDelete={async (contact) => {
            setContacts(await Store.deleteContact(contact));
          }}
        ></ContactRow>
      ))}
      <div className="w-full flex items-center justify-center">
        <PlusBtn
          onClick={async () => {
            setContacts(await Store.addContact(Contact.default()));
          }}
        ></PlusBtn>
      </div>
    </div>
  );
}

function PlusBtn({ onClick = () => {} }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-gray-700 h-8 w-8 text-xl hover:scale-110 transition-all hover:bg-gray-600"
    >
      <div className="">+</div>
    </button>
  );
}

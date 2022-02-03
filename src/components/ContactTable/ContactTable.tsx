import { useState } from "react";
import Store from "../../Database/Store";
import Contact from "../../Entities/Contact";
import { ContactRow } from "./ContactRow";

const contactsPerPage = 2;

export function ContactsTable() {
  const [contacts, setContacts] = useState(Store.state.contacts);
  const [pageNumber, setPageNumber] = useState(1);
  const slice = getSlice(contacts, pageNumber);
  return (
    <div className="bg-sky-900 text-gray-400 pl-3 pr-3 pt-3 pb-3 rounded-md">
      <ContactPage onSetContacts={setContacts} contacts={slice}></ContactPage>
      <PlusBtn onClick={() => setPageNumber(pageNumber - 1)}>l</PlusBtn>
      <PlusBtn
        onClick={async () => {
          setContacts((await Store.addContact(Contact.default())).contacts);
        }}
      >
        +
      </PlusBtn>
      <PlusBtn onClick={() => setPageNumber(pageNumber + 1)}> r </PlusBtn>
    </div>
  );
}

function getSlice(contacts: Contact[], pageNumber: number) {
  return contacts.slice(
    contactsPerPage * (pageNumber - 1),
    contactsPerPage * pageNumber
  );
}

function ContactPage({
  contacts = [] as Contact[],
  onSetContacts = (contacts: Contact[]) => {},
}) {
  const contactsArr = contacts.map((Contact) => (
    <ContactRow
      Contact={Contact}
      key={Contact.id}
      onChange={async (contact) =>
        onSetContacts((await Store.updateContacts(contact)).contacts)
      }
      onDelete={async (contact) => {
        onSetContacts((await Store.deleteContact(contact)).contacts);
      }}
    ></ContactRow>
  ));
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {contactsArr}
    </div>
  );
}

function PlusBtn({ onClick = () => {}, children = "" }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-gray-700 h-8 w-8 text-xl hover:scale-110 transition-all hover:bg-gray-600"
    >
      {children}
    </button>
  );
}

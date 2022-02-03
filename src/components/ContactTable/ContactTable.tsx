import { useState } from "react";
import Store from "../../Database/Store";
import Contact, { getContactSlice } from "../../Entities/Contact";
import { Labeled } from "../BaseComponents/BaseComponents";
import { ContactRow } from "./ContactRow";

export function ContactsTable() {
  const [contacts, setContacts] = useState(Store.state.contacts);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const slice = getContactSlice(contacts, { pageNumber, search });
  return (
    <div className="bg-sky-900 text-gray-400 pl-3 pr-3 pt-3 pb-3 rounded-md min-h-[410px] min-w-[410px] flex flex-col">
      <Labeled label="Search" htmlFor="main-search">
        <input
          type="text"
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          className="mb-3 contact-input"
          id="main-search"
        />
      </Labeled>
      <div className="flex flex-col justify-around grow">
        <ContactPage onSetContacts={setContacts} contacts={slice}></ContactPage>
        <Footer
          onAddClick={async () => {
            setContacts((await Store.addContact(Contact.default())).contacts);
          }}
          onPageChange={(delta) => setPageNumber(pageNumber + delta)}
        ></Footer>
      </div>
    </div>
  );
}

function Footer({
  onPageChange,
  onAddClick,
}: {
  onPageChange: (x: number) => void;
  onAddClick: () => void;
}) {
  return (
    <div className="mt-auto">
      <PlusBtn onClick={() => onPageChange(-1)}>l</PlusBtn>
      <PlusBtn onClick={onAddClick}>+</PlusBtn>
      <PlusBtn onClick={() => onPageChange(1)}> r </PlusBtn>
    </div>
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

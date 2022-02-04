import { useReducer, useState } from "react";
import Store, { reducer, StoreAction } from "../../Database/Store";
import Contact, { getContactSlice } from "../../Entities/Contact";
import { Labeled } from "../BaseComponents/BaseComponents";
import { ContactRow } from "./ContactRow";

export function ContactsTable() {
  const [state, updateStore] = useReducer(reducer, Store.state);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const contacts = state.contacts;
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
        <ContactPage updateStore={updateStore} contacts={slice}></ContactPage>
        <Footer
          onAddClick={() =>
            updateStore({ type: "add", contact: Contact.default() })
          }
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
  updateStore = (action: StoreAction) => {},
}) {
  const contactsArr = contacts.map((Contact) => (
    <ContactRow
      Contact={Contact}
      key={Contact.id}
      onChange={(contact) => updateStore({ type: "update", contact })}
      onDelete={(contact) => updateStore({ type: "del", contact })}
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

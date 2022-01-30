import { useState } from "react";
import "./App.css";
import { ContactsTable } from "./components/ContactRow";
import Contact, { makeFake } from "./Entities/Contact";

const store = {
  Contacts: makeFake(),
};

function updateContacts(Contact: Contact) {
  console.log(Contact);
  const index = store.Contacts.findIndex(
    (element) => element.id === Contact.id
  );
  if (index !== -1) {
    store.Contacts[index] = Contact;
  }
  return { ...store };
}

function App() {
  const [state, updateState] = useState(store);
  return (
    <div className="App flex flex-col items-center">
      <ContactsTable
        Contacts={state.Contacts}
        onChange={(Contact) => updateState(updateContacts(Contact))}
      ></ContactsTable>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { ContactsTable } from "./components/ContactRow";
import AppStore from "./Database/Store";

function App({ store }: { store: AppStore }) {
  const [state, updateState] = useState(store.state);
  useEffect(() => {
    store.getStored().then((state) => updateState(state));
  }, []);

  return (
    <div className="App flex flex-col items-center">
      <ContactsTable
        Contacts={state.contacts}
        onChange={async (Contact) =>
          updateState(await store.updateContacts(Contact))
        }
      ></ContactsTable>
    </div>
  );
}

export default App;

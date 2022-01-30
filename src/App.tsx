import { useEffect, useState } from "react";
import { ContactsTable } from "./components/ContactTable/ContactRow";
import AppStore from "./Database/Store";

function App() {
  return (
    <div className="App flex flex-col items-center">
      <ContactsTable></ContactsTable>
    </div>
  );
}

export default App;

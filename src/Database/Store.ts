import Contact, { makeFake, updateArray } from "../Entities/Contact";
import AppDatabase from "./AppDatabase";

class AppStore {
  state = {
    contacts: makeFake(),
  };
  dataBase = new AppDatabase();

  async getStored() {
    const contacts = await this.dataBase.contacts.toArray();
    this.state.contacts = contacts.length === 0 ? makeFake() : contacts;
    return { ...this.state };
  }

  updateContacts(state: StoreState, contact: Contact) {
    this.state.contacts = updateArray(contact, state.contacts);
    this.updateDataBaseState(this.state.contacts);
    return { ...this.state };
  }

  addContact(state: StoreState, contact: Contact) {
    this.state.contacts = [contact, ...state.contacts];
    this.updateDataBaseState(this.state.contacts);
    return { ...this.state };
  }

  deleteContact(state: StoreState, contact: Contact) {
    this.state.contacts = state.contacts.filter(
      (element) => element.id !== contact.id
    );
    this.updateDataBaseState(this.state.contacts);
    return { ...this.state };
  }

  private async updateDataBaseState(contacts: Contact[]) {
    await this.dataBase.contacts.clear();
    return this.dataBase.contacts.bulkPut(contacts);
  }
}

type StoreState = AppStore["state"];

const Store = new AppStore();

/**
 * every time I calculate another state, it is saved on the indexedDB, so technically this reducer
 * has a side effect, but it can't influence the program runing, since I can only read the database
 * when the app starts
 */
export function reducer(state: StoreState, action: StoreAction) {
  if (action.type === "add") {
    return Store.addContact(state, action.contact);
  }
  if (action.type === "del") {
    return Store.deleteContact(state, action.contact);
  }
  if (action.type === "update") {
    return Store.updateContacts(state, action.contact);
  }
  throw Error(`Unkown action ${action}`);
}

export type StoreAction = Add | Delete | Update;

type Add = {
  type: "add";
  contact: Contact;
};

type Delete = {
  type: "del";
  contact: Contact;
};

type Update = {
  type: "update";
  contact: Contact;
};

export default Store;

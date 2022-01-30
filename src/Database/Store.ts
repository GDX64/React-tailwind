import Contact, { makeFake } from "../Entities/Contact";
import AppDatabase from "./AppDatabase";

export default class AppStore {
  state = {
    contacts: makeFake(),
  };
  dataBase = new AppDatabase();

  async getStored() {
    const contacts = await this.dataBase.contacts.toArray();
    this.state.contacts = contacts.length === 0 ? makeFake() : contacts;
    return { ...this.state };
  }

  async updateContacts(Contact: Contact) {
    console.log(Contact);
    const index = this.state.contacts.findIndex(
      (element) => element.id === Contact.id
    );
    if (index !== -1) {
      this.state.contacts[index] = Contact;
    }
    await this.dataBase.contacts.bulkPut(this.state.contacts);
    return { ...this.state };
  }
}

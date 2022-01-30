import { useState } from "react";
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

  async updateContacts(contact: Contact) {
    this.state.contacts = updateArray(contact, this.state.contacts);
    await this.dataBase.contacts.bulkPut(this.state.contacts);
    return { ...this.state };
  }
}

export default new AppStore();

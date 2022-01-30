import Dexie, { Table } from "dexie";
import Contact from "../Entities/Contact";

export default class AppDatabase extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  contacts!: Table<Contact>;

  constructor() {
    super("AppDatabase");
    this.version(1).stores({
      contacts: "++id, name, lastName, email, phone, image", // Primary key and indexed props
    });
  }
}

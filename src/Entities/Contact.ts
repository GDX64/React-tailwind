const defaultImg = `data:image/png;base64,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`;

export default class Contact {
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public id: number,
    public image: string | null
  ) {}

  static default() {
    return new Contact("Joe", "", "", "", Math.random(), defaultImg);
  }
}

export function getSearchFields(contact: Contact) {
  return [
    { priority: "01", field: contact.name },
    { priority: "02", field: contact.email },
    { priority: "03", field: contact.phone },
  ];
}

const contactsPerPage = 5;

export function getContactSlice(
  contacts: Contact[],
  { pageNumber, search }: { pageNumber: number; search: string }
) {
  return contacts
    .map((contact) => {
      const matches = getSearchFields(contact)
        .map(({ field, priority }) =>
          field.toLowerCase().includes(search.toLowerCase()) ? priority : "99"
        )
        .join("");
      return [contact, matches] as [Contact, string];
    })
    .sort(([, a], [, b]) => (a > b ? 1 : -1))
    .map(([contact]) => contact)
    .slice(contactsPerPage * (pageNumber - 1), contactsPerPage);
}

export function updateArray(contact: Contact, contacts: Contact[]) {
  const index = contacts.findIndex((element) => element.id === contact.id);
  const copy = [...contacts];
  if (index !== -1) {
    copy[index] = contact;
  }
  return copy;
}

export const fieldsArr = [
  { field: "name", label: "name" },
  { field: "phone", label: "phone" },
  { field: "email", label: "email" },
] as {
  field: "name" | "phone" | "email";
  label: string;
}[];

export function makeFake() {
  return [
    new Contact(
      "Gabriel",
      "Machado",
      "gadu.machado@gmail.com",
      "122345678",
      0,
      defaultImg
    ),
  ];
}

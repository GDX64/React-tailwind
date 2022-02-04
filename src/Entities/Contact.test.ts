import Contact, { getContactSlice } from "./Contact";

const list = [
  Contact.default({ email: "joe@hotmail.com" }),
  Contact.default({ name: "Eduardo Machado", email: "du@gmail.com" }),
  Contact.default({ name: "Gabriel Machado", email: "gadu.machado@gmail.com" }),
  Contact.default({ email: "joe@hotmail.com" }),
];

describe("Contact search", () => {
  test("Only Gabriel should apear", () => {
    const result = getContactSlice(list, { pageNumber: 1, search: "gabriel" });
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(list[2]);
  });
  test("Only Gabriel and Eduardo should apear, but Gabriel comes first", () => {
    const result = getContactSlice(list, { pageNumber: 1, search: "machado" });
    expect(result).toHaveLength(2);
    expect(result[0]).toBe(list[2]);
    expect(result[1]).toBe(list[1]);
  });
  test("Only Gabriel and Eduardo should apear, but Eduardo comes first", () => {
    const result = getContactSlice(list, { pageNumber: 1, search: "gmail" });
    expect(result).toHaveLength(2);
    expect(result[0]).toBe(list[1]);
    expect(result[1]).toBe(list[2]);
  });
  test("All should match, but only the two last should be in the list", () => {
    const result = getContactSlice(list, {
      pageNumber: 2,
      search: "",
      contactsPerPage: 2,
    });
    expect(result).toHaveLength(2);
    expect(result[1]).toBe(list[3]);
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { ContactsTable } from "../src/components/ContactTable/ContactRow";

describe("", () => {
  test("", () => {
    render(<ContactsTable />);
    expect(screen.getByText("+")).toBeTruthy();
  });
});

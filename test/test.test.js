import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { ContactsTable } from "../src/components/ContactTable/ContactRow";

describe("", () => {
  test("there must be one summary", () => {
    render(<ContactsTable />);
    const row1 = screen.getByText(/gabriel/i);
    expect(row1).toBeTruthy();
  });
  test("When you click the add btn you must have another contact with default name", async () => {
    render(<ContactsTable />);
    const addBtn = screen.getByRole("button");
    fireEvent.click(addBtn);
    const row = await waitFor(() => screen.getByText(/joe/i));
    expect(row).toBeTruthy();
  });

  test("Delete the contact", async () => {
    render(<ContactsTable />);
    const summary = screen.getByText(/gabriel/i);
    fireEvent.click(summary);
    const deleteBtn = await waitFor(() =>
      screen.getByRole("button", { name: "Delete" })
    );
    fireEvent.click(deleteBtn);
    await waitForElementToBeRemoved(() => screen.getAllByText(/gabriel/i));
  });
});

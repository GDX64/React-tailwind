import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { ContactsTable } from "./ContactTable";

//I'm using a fake indexedDB here, so each test loads the previous state of the past one
//If there was a database state change
describe("Integration test for the contact table", () => {
  test("there must be one summary", () => {
    render(<ContactsTable />);
    const row1 = screen.getByText(/gabriel/i);
    expect(row1).toBeTruthy();
  });
  test("When you click the add btn you must have another contact with default name", async () => {
    render(<ContactsTable />);
    const addBtn = screen.getByRole("button", { name: "+" });
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
    expect(screen.queryAllByText(/gabriel/i)).toHaveLength(0);
  });
  test("Change contact name", async () => {
    render(<ContactsTable />);
    const summary = screen.getByText(/joe/i);
    fireEvent.click(summary);
    const nameLabel = await waitFor(() => screen.getByText(/name/i));
    fireEvent.click(nameLabel.nextElementSibling);
    const input = await waitFor(() => screen.getByLabelText("name:"));
    fireEvent.change(input, { target: { value: "gabriel" } });
    const saveBtn = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveBtn);
    await waitFor(() => screen.getAllByText(/gabriel/));
  });
});

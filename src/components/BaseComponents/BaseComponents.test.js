import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { UpdatableField } from "./BaseComponents";

describe("Unit test for the UpdatableField", () => {
  test("It should show the prop value", () => {
    render(<UpdatableField value="gabriel" onChange={() => {}} />);
    expect(screen.getByText(/gabriel/i)).toBeTruthy();
  });
  test("When I click the value, it should become an input with the same", async () => {
    render(<UpdatableField value="gabriel" onChange={() => {}} />);
    fireEvent.click(screen.getByText(/gabriel/i));
    const input = await waitFor(() => screen.getByRole("textbox"));
    expect(input.value).toBe("gabriel");
  });
  test("The input should go back to normal when I press enter", async () => {
    render(<UpdatableField value="gabriel" onChange={() => {}} />);
    fireEvent.click(screen.getByText(/gabriel/i));
    const input = await waitFor(() => screen.getByRole("textbox"));
    fireEvent.keyPress(input, { key: "Enter", code: "Enter", charCode: 13 });
    expect(screen.queryByRole("textbox")).toBeFalsy();
  });
  test("When I change the input value, it should emit an onChange event", async () => {
    const fn = jest.fn();
    render(<UpdatableField value="gabriel" onChange={fn} />);
    fireEvent.click(screen.getByText(/gabriel/i));
    const input = await waitFor(() => screen.getByRole("textbox"));
    fireEvent.change(input, { target: { value: "joe" } });
    expect(fn).toBeCalledWith("joe");
  });
});

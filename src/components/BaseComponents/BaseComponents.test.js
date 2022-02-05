import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { NumberInput, UpdatableField } from "./BaseComponents";

describe("Testing NumberInput", () => {
  test("It should not be possible to put negative numbers nor fractions", () => {
    const fn = jest.fn();
    render(<NumberInput value={-30} onChange={fn}></NumberInput>);
    const input = screen.getByDisplayValue("0");
    fireEvent.change(input, { target: { value: "-30" } });
    expect(fn).toBeCalledWith(0);
    fireEvent.change(input, { target: { value: "30" } });
    expect(fn).toBeCalledWith(30);
    fireEvent.change(input, { target: { value: "31.5" } });
    expect(fn).toBeCalledWith(31);
    fireEvent.change(input, { target: { value: "160" } });
    expect(fn).toBeCalledWith(150);
  });
});
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

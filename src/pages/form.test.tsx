import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Form from "./form";

describe("Form", () => {
  it("Should show a submitting state upon submit", () => {
    const { getByTestId, getByRole, findByText } = render(<Form />);
    const nameElement = getByTestId("name");
    const salaryElement = getByTestId("name");
    const dobElement = getByTestId("name");
    const submitButton = getByRole("submit");

    fireEvent.input(nameElement, { target: { value: "name" } });
    fireEvent.input(salaryElement, { target: { value: 12345 } });
    fireEvent.input(dobElement, { target: { value: "12/12/2001" } });

    fireEvent.click(submitButton);

    findByText("Submitting");
  });

  it("Should show an error if submit is attempted with an invalid date", () => {
    const { getByTestId, getByRole, findByText } = render(<Form />);
    const dobElement = getByTestId("name");
    const submitButton = getByRole("submit");

    fireEvent.input(dobElement, { target: { value: "12/13/2001" } });

    fireEvent.click(submitButton);

    findByText("Date of birth must be a date in the format DD/MM/YYYY");
  });
});

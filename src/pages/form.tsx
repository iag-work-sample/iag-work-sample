import React, { useState } from "react";
import { useAsyncCallback, useAsync } from "react-async-hook";
import moment from "moment";
import styled from "styled-components";

import TextField from "../components/text-field";
import Button from "../components/button";
import createEmployee from "../api/create-employee";

const FormElement = styled.form`
  padding: 0.5rem;
  max-width: 30rem;
  margin: 0 auto;
  text-align: center;
`;

const StyledTextField = styled(TextField)`
  margin: 0.5rem 0;
`;

const SubmitButton = styled(Button)`
  margin: 0.5rem 0;
`;

export default function Form() {
  const [name, setName] = useState<string | null>(null);
  const [salary, setSalary] = useState<number | null>(null);
  const [dob, setDob] = useState<string | null>(null);

  const create = async () => {
    if (!name || !salary || !dob) {
      throw new Error("TODO MESSAGE");
    }

    await createEmployee({ name, salary, dob: moment(dob) });
  };

  const asyncCreate = useAsyncCallback(create);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    asyncCreate.execute();
  };

  return (
    <FormElement onSubmit={onSubmit}>
      <h1>IAG Form</h1>
      {asyncCreate.loading ? (
        "Submitting..."
      ) : (
        <>
          {" "}
          <StyledTextField
            value={name}
            onChange={setName}
            type="text"
            placeholder="Name"
          />
          <StyledTextField
            value={salary}
            type="number"
            onChange={setSalary}
            placeholder="Salary"
          />
          <StyledTextField
            value={dob}
            onChange={setDob}
            type="date"
            placeholder="Date of Birth"
          />
          {asyncCreate.error && asyncCreate.error.message}
          <SubmitButton type="submit">Submit</SubmitButton>
        </>
      )}
    </FormElement>
  );
}

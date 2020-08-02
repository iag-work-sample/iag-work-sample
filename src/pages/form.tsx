import React, { useState } from "react";
import { useAsyncCallback, useAsync } from "react-async-hook";
import moment from "moment";
import styled from "styled-components";

import TextField from "../components/text-field";
import createEmployee from "../api/create-employee";

const FormElement = styled.form`
  // display: flex;
  // flex-direction: column;
  padding: 0.5rem;
  max-width: 30rem;
  margin: 0 auto;
`;

const StyledTextField = styled(TextField)`
  margin: 0.5rem 0;
`;

const SubmitButton = styled.button`
  margin: 0.25rem 0;
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
      {asyncCreate.loading && "Loading..."}
      {asyncCreate.error && asyncCreate.error.message}
      IAG Form
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
      <SubmitButton type="submit">Submit</SubmitButton>
    </FormElement>
  );
}

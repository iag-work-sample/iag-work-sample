import React, { useState } from "react";
import { useAsyncCallback, useAsync } from "react-async-hook";
import moment from "moment";
import styled from "styled-components";
import { useForm } from "react-hook-form";

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

const ErrorMessage = styled.div`
  color: #f00;
`;

export default function Form() {
  const [name, setName] = useState<string | null>(null);
  const [salary, setSalary] = useState<number | null>(null);
  const [dob, setDob] = useState<string | null>(null);
  const { register, handleSubmit, watch, errors } = useForm();

  const create = async () => {
    if (!name || !salary || !dob) {
      throw new Error("Cannot create a user without a name, salary and dob");
    }

    await createEmployee({ name, salary, dob: moment(dob) });
  };

  const asyncCreate = useAsyncCallback(create);

  const onSubmit = (data: any) => {
    console.log(data);
    // event.preventDefault();

    asyncCreate.execute();
  };

  return (
    <FormElement onSubmit={handleSubmit(onSubmit)}>
      <h1>IAG Form</h1>
      {asyncCreate.loading ? (
        "Submitting..."
      ) : (
        <>
          {" "}
          {errors.name && <ErrorMessage>Name is required</ErrorMessage>}
          <StyledTextField
            name="name"
            value={name}
            onChange={setName}
            type="text"
            placeholder="Name"
            ref={register({ required: true })}
          />
          {errors.salary && (
            <ErrorMessage>Salary must be a number</ErrorMessage>
          )}
          <StyledTextField
            name="salary"
            value={salary}
            type="number"
            onChange={setSalary}
            placeholder="Salary"
            ref={register({ required: true, min: 0 })}
          />
          {errors.dob && (
            <ErrorMessage>
              Date of birth must be a date in the format DD/MM/YYYY
            </ErrorMessage>
          )}
          <StyledTextField
            name="dob"
            value={dob}
            onChange={setDob}
            type="date"
            placeholder="Date of Birth"
            ref={register({
              required: true,
              pattern: /^\d\d\/\d\d\/\d\d\d\d/,
              validate: (string) => moment(string, "DD/MM/YYYY").isValid(),
            })}
          />
          {asyncCreate.error && (
            <ErrorMessage>asyncCreate.error.message</ErrorMessage>
          )}
          <SubmitButton type="submit">Submit</SubmitButton>
        </>
      )}
    </FormElement>
  );
}

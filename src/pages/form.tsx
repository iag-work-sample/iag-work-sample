import React, { useState } from "react";
import { useAsyncCallback, useAsync } from "react-async-hook";

import TextField from "../components/text-field";
import createEmployee from "../api/create-employee";
import moment from "moment";

export default function Form() {
  const [name, setName] = useState<string | null>("name");
  const [salary, setSalary] = useState<number | null>(123);
  const [dob, setDob] = useState<string | null>("2020/02/02");

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
    <form onSubmit={onSubmit}>
      {asyncCreate.loading && "Loading..."}
      {asyncCreate.error && asyncCreate.error.message}
      <TextField value={name} onChange={setName} type="text" />
      <TextField value={salary} type="number" onChange={setSalary} />
      <TextField value={dob} onChange={setDob} type="date" />
      <button type="submit">Submit</button>
    </form>
  );
}

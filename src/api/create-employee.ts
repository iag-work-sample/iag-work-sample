import moment from "moment";

import User from "../model/user";
import { resolve } from "dns";

/** User as expected by the API */
interface ApiUser {
  // Note: Representing everything as a string is weird, but according to the
  // doc at http://dummy.restapiexample.com/create this is how it's supposed
  // to work

  name: string;
  salary: string;
  age: string;
}

type ApiResponseData = ApiUser & { id: number };

// This is stubbed because I can't make an AJAX call to restexample.com, as it
// doesn't support CORS. Please find the code to do that below
export default async function createEmployeeStub(
  user: User
): Promise<ApiResponseData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...processUserForApi(user),
        id: Math.round(Math.random() * 1000),
      });
    }, 500);
  });
}

async function createEmployee(user: User): Promise<ApiResponseData> {
  const res = await fetch("http://dummy.restexample.com/api/v1/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(processUserForApi(user)),
  });

  if (!res.ok) {
    throw new Error("Failed to submit new user");
  } else {
    return (await res.json()).data;
  }
}

function processUserForApi(user: User): ApiUser {
  return {
    name: user.name,
    salary: user.salary.toString(),
    age: Math.abs(user.dob.diff(moment(), "years")).toString(),
  };
}

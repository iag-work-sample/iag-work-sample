import moment from "moment";

import Employee from "../model/employee";

/** Employee as expected by the API */
interface ApiEmployee {
  // Note: Representing everything as a string is weird, but according to the
  // doc at http://dummy.restapiexample.com/create this is how it's supposed
  // to work

  name: string;
  salary: string;
  age: string;
}

type ApiResponseData = ApiEmployee & { id: number };

// This is stubbed because I can't make an AJAX call to restexample.com, as it
// doesn't support CORS. Please find the code to do that below

/**
 * Creates a new employee in the dummy restexample api, returning its details.
 *
 * @param employee The employee to create.
 */
export default async function createEmployeeStub(
  employee: Employee
): Promise<ApiResponseData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...processEmployeeForApi(employee),
        id: Math.round(Math.random() * 1000),
      });
    }, 1000);
  });
}

/**
 * Creates a new employee in the dummy restexample api, returning its details.
 *
 * @param employee The employee to create.
 */
async function createEmployee(employee: Employee): Promise<ApiResponseData> {
  const res = await fetch("http://dummy.restexample.com/api/v1/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(processEmployeeForApi(employee)),
  });

  if (!res.ok) {
    throw new Error("Failed to submit new employee");
  } else {
    return (await res.json()).data;
  }
}

/**
 * Transforms a {@link Employee} into a format fit for passing to the API.
 */
function processEmployeeForApi(employee: Employee): ApiEmployee {
  return {
    name: employee.name,
    salary: employee.salary.toString(),
    age: Math.abs(employee.dob.diff(moment(), "years")).toString(),
  };
}

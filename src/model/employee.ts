import moment from "moment";

/** A representation of an employee that can be sent to the API for creation */
export default interface Employee {
  name: string;
  dob: moment.Moment;
  salary: number;
}

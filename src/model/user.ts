import moment from "moment";

export default interface User {
  name: string;
  dob: moment.Moment;
  salary: number;
}

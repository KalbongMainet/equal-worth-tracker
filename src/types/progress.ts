export interface Employee {
  id: string;
  name: string;
  gender: string;
  age: number;
  address: string;
  contactNumber: string;
}

export interface Task {
  id: string;
  name: string;
  employeeId: string;
  status: "Ongoing" | "Done" | "Late";
}

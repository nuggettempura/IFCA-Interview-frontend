export interface Employee {
    id?: number;
    firstName: string
    lastName: string
    email: string
}

export const dummyEmployeeList: Employee[] = [
    {
        id: 1,
        firstName: "John",
        lastName: "Wick",
        email: "dasvidania@gmail.com"
    },
];

export enum PageEnum {
    list,
    add,
    edit,
}
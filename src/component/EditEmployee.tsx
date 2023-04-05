import { useState } from "react";
import { Employee } from "./Employee";
import "./EmployeeForm.style.css"
import { gql, useMutation } from "@apollo/client";

type Props = {
    data: Employee
    onBackButtonClickHandler: () => void
    onUpdateClickHandler: (data: Employee) => void
}

const UPDATE_EMPLOYEE = gql`
mutation UpdateEmployee($id: Int!, $firstName: String!, $lastName: String!, $email: String!) {
    updateEmployee(id: $id, firstName: $firstName, lastName: $lastName, email: $email)
  }
`;

const EditEmployee = (props: Props) => {
    const [editEmployee, { data: employeeData, loading, error }] = useMutation(UPDATE_EMPLOYEE);

    console.log(employeeData)

    const { data, onBackButtonClickHandler, onUpdateClickHandler } = props;

    const [firstName, setFirstName] = useState(data.firstName)
    const [lastName, setLastName] = useState(data.lastName)
    const [email, setEmail] = useState(data.email)

    const onFirstNameChangeHandler = (e: any) => {
        setFirstName(e.target.value)
    }

    const onLasttNameChangeHandler = (e: any) => {
        setLastName(e.target.value)
    }

    const onEmailChangeHandler = (e: any) => {
        setEmail(e.target.value)
    }

    const onSubmitButtonClickHandler = (e: any) => {
        e.preventDefault();
        const updatedData: Employee = {
            id: data.id,
            firstName: firstName,
            lastName: lastName,
            email: email,
        };
        editEmployee({
            variables: data
        })
        onUpdateClickHandler(updatedData);
        onBackButtonClickHandler();
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return <div className="form-container">

        <div>
            <h3>Add Employee Form</h3>
        </div>
        <form onSubmit={onSubmitButtonClickHandler}>
            <div>
                <label>First Name : </label>
                <input type="text" value={firstName} onChange={onFirstNameChangeHandler} />
            </div>
            <div>
                <label>Last Name : </label>
                <input type="text" value={lastName} onChange={onLasttNameChangeHandler} />
            </div>
            <div>
                <label>Add Email : </label>
                <input type="text" value={email} onChange={onEmailChangeHandler} />
            </div>
            <div>
                <input type="button" value="Back" onClick={onBackButtonClickHandler} />
                <input type="submit" value="Update Employee" />
            </div>
        </form>
    </div>
}

export default EditEmployee;
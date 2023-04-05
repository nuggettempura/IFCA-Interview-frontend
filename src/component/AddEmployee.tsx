import { useState } from "react";
import "./EmployeeForm.style.css"
import { Employee } from "./Employee";
import { gql, useMutation } from "@apollo/client";

type Props = {
    onBackButtonClickHandler: () => void
    onSubmitClickHandler: (data: Employee) => void
};

const ADD_EMPLOYEE = gql`
  mutation AddEmployee($firstName: String!, $lastName: String!, $email: String!) {
    insertEmployee(firstName: $firstName, lastName: $lastName, email: $email)
  }
`;

const AddEmployee = (props: Props) => {
    const [addEmployee, { data: employeeData, loading, error }] = useMutation(ADD_EMPLOYEE);

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const { onBackButtonClickHandler, onSubmitClickHandler } = props

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
        const data: Employee = {
            firstName: firstName,
            lastName: lastName,
            email: email,
        };

        addEmployee({
            variables: data
        })
        onSubmitClickHandler(data);
        onBackButtonClickHandler();
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div className="form-container">

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
                    <input type="submit" value="Add Employee" />
                </div>
            </form>
        </div>
    )
}

export default AddEmployee;
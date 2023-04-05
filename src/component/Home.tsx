import { useEffect, useState } from "react";
import "./Home.css"
import { Employee, PageEnum, dummyEmployeeList } from "./Employee";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import { gql, useMutation, useQuery } from "@apollo/client";
const GET_EMPLOYEE = gql`
  query GetEmployee {
    employee {
      id
      firstName
      lastName
      email
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: Int!) {
    deleteEmployee(id: $id)
  }
`;


const Home = () => {
    const { data, loading, error } = useQuery(GET_EMPLOYEE);

    const [DeleteEmployee, { }] = useMutation(DELETE_EMPLOYEE);

    const [employeeList, setEmployeeList] = useState(
        data?.employee as Employee[]
    );

    useEffect(() => {
        setEmployeeList(data?.employee)
    }, [data?.employee])


    const [shownPage, setShownPage] = useState(PageEnum.list)
    const [dataToEdit, setDataToEdit] = useState({} as Employee);

    const onAddEmPloyeeHandler = () => {
        setShownPage(PageEnum.add);
    }

    const showListPage = () => {
        setShownPage(PageEnum.list)
    }

    const addEmployee = (data: Employee) => {
        setEmployeeList([...employeeList, data])
    }

    const deleteEmployee = (data: Employee) => {
        DeleteEmployee({
            variables: {
                id: data.id,
            }
        });
        // Index the array from employeeList
        // Splice
        // Update new table

        const indexToDelete = employeeList.indexOf(data);
        const tempList = [...employeeList]

        tempList.splice(indexToDelete, 1);
        setEmployeeList(tempList)
    };

    const editEmployeeData = (data: Employee) => {
        setShownPage(PageEnum.edit);
        setDataToEdit(data);
    }

    const updateData = (data: Employee) => {
        const filteredData = employeeList.filter(x => x.id === data.id)[0];
        const indexOfRecord = employeeList.indexOf(filteredData);
        const tempData = [...employeeList];
        tempData[indexOfRecord] = data;
        setEmployeeList(tempData)
    }


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <>
            <article className="article-header">
                <header>
                    <h1>IFCA Project</h1>
                </header>
            </article>

            <section className="section-content">
                {shownPage === PageEnum.list && (
                    <>
                        <input
                            type="button"
                            value="Add Employee"
                            onClick={onAddEmPloyeeHandler}
                            className="add-employee-btn"
                        />
                        <EmployeeList
                            list={employeeList}
                            onDeleteClickHandler={deleteEmployee}
                            onEdit={editEmployeeData}
                        />
                    </>
                )}

                {shownPage === PageEnum.add && (
                    <AddEmployee
                        onBackButtonClickHandler={showListPage} onSubmitClickHandler={addEmployee}
                    />
                )}

                {shownPage === PageEnum.edit && <EditEmployee data={dataToEdit} onBackButtonClickHandler={showListPage} onUpdateClickHandler={updateData} />}
            </section>
        </>

    )
}

export default Home;
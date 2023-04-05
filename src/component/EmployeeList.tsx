import "./EmployeeList.style.css"
import { Employee } from "./Employee"
import EmployeeModal from "./EmployeeModal";
import { useState } from "react";

type Props = {
    list: Employee[];
    onDeleteClickHandler: (data: Employee) => void;
    onEdit: (data: Employee) => void;
}

const EmployeeList = (props: Props) => {

    const { list, onDeleteClickHandler, onEdit } = props;
    const [showModal, setShowModal] = useState(false)
    const [dataToShow, setDataToShow] = useState(null as Employee | null)

    const viewEmployee = (data: Employee) => {
        setDataToShow(data)
        setShowModal(true);
    }

    const onCloseModal = () => {
        setShowModal(false);
    }

    return (
        <div>
            <article>
                <h3 className="list-header">Employee List</h3>
            </article>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                {list?.map(employee => {
                    return (
                        <tr key={employee.id}>
                            <td>{`${employee.firstName} ${employee.lastName}`}</td>
                            <td>{employee.email}</td>
                            <td>
                                <div>
                                    <input
                                        type="button"
                                        value="View"
                                        onClick={() => viewEmployee(employee)} />
                                    <input
                                        type="button"
                                        value="Edit"
                                        onClick={() => onEdit(employee)} />
                                    <input
                                        type="button"
                                        value="Delete"
                                        onClick={() => onDeleteClickHandler(employee)} />
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </table>
            {showModal && dataToShow !== null &&
                <EmployeeModal onClose={onCloseModal} data={dataToShow} />}
        </div>)
}

export default EmployeeList;
import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import ChangeUserRole from "../components/ChangeUserRole";
import { MdModeEdit, MdDelete } from "react-icons/md";

// Import SAP Fiori UI5 Web Components
import { Button, Text, Table, TableRow, TableCell, TableHeaderCell, Dialog } from "@ui5/webcomponents-react";

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: "",
    });
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState("");

    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: "include",
        });

        const dataResponse = await fetchData.json();

        if (dataResponse.success) {
            setAllUsers(dataResponse.data);
        } else {
            toast.error(dataResponse.message);
        }
    };

    const handleDeleteUser = async () => {
        const response = await fetch(`${SummaryApi.deleteUser.url}/${userIdToDelete}`, {
            method: SummaryApi.deleteUser.method,
            credentials: "include",
        });

        const responseData = await response.json();

        if (responseData.success) {
            toast.success("User deleted successfully!");
            setOpenDeleteConfirm(false); // Close the confirmation dialog
            fetchAllUsers(); // Refresh the user list
        } else {
            toast.error(responseData.message || "Error deleting user.");
            setOpenDeleteConfirm(false); // Close the confirmation dialog
        }
    };

    const handleConfirmDelete = (userId) => {
        setUserIdToDelete(userId);
        setOpenDeleteConfirm(true);
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-200 p-6">
            {/* Header */}
            <div className="bg-white shadow-lg rounded-xl p-6 flex justify-between items-center mb-6 border border-gray-300">
                <h2 className="text-3xl font-bold text-gray-900">Manage All Users</h2>
            </div>

            {/* User Table using SAP Fiori Table Component */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-300">
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeaderCell><Text>Sr.</Text></TableHeaderCell>
                            <TableHeaderCell><Text>Name</Text></TableHeaderCell>
                            <TableHeaderCell><Text>Email</Text></TableHeaderCell>
                            <TableHeaderCell><Text>Role</Text></TableHeaderCell>
                            <TableHeaderCell><Text>Created Date</Text></TableHeaderCell>
                            <TableHeaderCell><Text>Actions</Text></TableHeaderCell>
                        </TableRow>
                    </thead>
                    <tbody>
                        {allUser.length > 0 ? (
                            allUser.map((el, index) => (
                                <TableRow key={el._id}>
                                    <TableCell><Text>{index + 1}</Text></TableCell>
                                    <TableCell><Text>{el?.name}</Text></TableCell>
                                    <TableCell><Text>{el?.email}</Text></TableCell>
                                    <TableCell><Text className="capitalize font-semibold text-gray-700">{el?.role}</Text></TableCell>
                                    <TableCell><Text>{moment(el?.createdAt).format("LL")}</Text></TableCell>
                                    <TableCell>
                                        <div className="flex gap-3">
                                            <Button
                                                design="Emphasized"
                                                onClick={() => {
                                                    setUpdateUserDetails(el);
                                                    setOpenUpdateRole(true);
                                                }}
                                            >
                                                <MdModeEdit />
                                            </Button>
                                            <Button
                                                design="Negative"
                                                onClick={() => handleConfirmDelete(el._id)}
                                            >
                                                <MdDelete />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500 py-6">
                                    <Text>No users found.</Text>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Change User Role Modal */}
            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}

            {/* Delete Confirmation Dialog */}
            {openDeleteConfirm && (
                <Dialog
                    open={openDeleteConfirm}
                    headerText="Confirm Deletion"
                    onClose={() => setOpenDeleteConfirm(false)}
                    footer={
                        <>
                            <Button design="Transparent" onClick={() => setOpenDeleteConfirm(false)}>
                                Cancel
                            </Button>
                            <Button design="Negative" onClick={handleDeleteUser}>
                                Confirm
                            </Button>
                        </>
                    }
                >
                    <Text>Are you sure you want to delete this user?</Text>
                </Dialog>
            )}
        </div>
    );
};

export default AllUsers;

import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import ChangeUserRole from "../components/ChangeUserRole";
import { MdModeEdit, MdDelete } from "react-icons/md";

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: "",
    });

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

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            const response = await fetch(`${SummaryApi.deleteUser.url}/${userId}`, {
                method: SummaryApi.deleteUser.method,
                credentials: "include",
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success("User deleted successfully!");
                fetchAllUsers(); // Refresh the user list
            } else {
                toast.error(responseData.message || "Error deleting user.");
            }
        }
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

            {/* User Table */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-300">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="text-left py-4 px-6">Sr.</th>
                            <th className="text-left py-4 px-6">Name</th>
                            <th className="text-left py-4 px-6">Email</th>
                            <th className="text-left py-4 px-6">Role</th>
                            <th className="text-left py-4 px-6">Created Date</th>
                            <th className="text-left py-4 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUser.length > 0 ? (
                            allUser.map((el, index) => (
                                <tr
                                    key={el._id}
                                    className="hover:bg-gray-100 transition-all border-t"
                                >
                                    <td className="py-4 px-6">{index + 1}</td>
                                    <td className="py-4 px-6">{el?.name}</td>
                                    <td className="py-4 px-6">{el?.email}</td>
                                    <td className="py-4 px-6 capitalize font-semibold text-gray-700">{el?.role}</td>
                                    <td className="py-4 px-6 text-gray-600">
                                        {moment(el?.createdAt).format("LL")}
                                    </td>
                                    <td className="py-4 px-6 flex gap-3">
                                        <button
                                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-all shadow-md"
                                            onClick={() => {
                                                setUpdateUserDetails(el);
                                                setOpenUpdateRole(true);
                                            }}
                                        >
                                            <MdModeEdit />
                                        </button>
                                        <button
                                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-md"
                                            onClick={() => handleDeleteUser(el._id)}
                                        >
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center text-gray-500 py-6"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
        </div>
    );
};

export default AllUsers;
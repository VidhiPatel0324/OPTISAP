import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
    const [userRole, setUserRole] = useState(role);

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
    };

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole,
            }),
        });

        const responseData = await fetchResponse.json();

        if (responseData.success) {
            toast.success(responseData.message);
            onClose();
            callFunc();
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-6">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
                    onClick={onClose}
                >
                    <IoMdClose size={24} />
                </button>

                {/* Heading */}
                <h1 className="text-xl font-bold text-center text-gray-800 mb-6">
                    Change User Role
                </h1>

                {/* User Details */}
                <div className="space-y-4">
                    <p className="text-gray-700">
                        <span className="font-semibold">Name:</span> {name}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Email:</span> {email}
                    </p>
                </div>

                {/* Role Selection */}
                <div className="mt-6">
                    <label
                        htmlFor="role"
                        className="text-gray-700 font-medium block mb-2"
                    >
                        Select Role
                    </label>
                    <select
                        id="role"
                        className="w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={userRole}
                        onChange={handleOnChangeSelect}
                    >
                        {Object.values(ROLE).map((el) => (
                            <option value={el} key={el}>
                                {el}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    className="mt-8 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    onClick={updateUserRole}
                >
                    Change Role
                </button>
            </div>
        </div>
    );
};

export default ChangeUserRole;

import React, { useEffect, useState } from "react";
import { createUser, getUsers, updateUserById, deleteUserById } from "../../apis/userService.js";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ id: "", name: "", email: "" });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const userList = await getUsers();
            setUsers(userList);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleAddUser = async () => {
        try {
            const createdUser = await createUser(newUser);
            setUsers([...users, createdUser]);
            setNewUser({ id: "", name: "", email: "" });
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const handleUpdateUser = async (id, updatedData) => {
        try {
            const updatedUser = await updateUserById(id, updatedData);
            const updatedUserIndex = users.findIndex((user) => user.id === id);
            const updatedUserList = [...users];
            updatedUserList[updatedUserIndex] = updatedUser;
            setUsers(updatedUserList);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const deletedUser = await deleteUserById(id);
            console.log("Deleted user:", deletedUser);
            const updatedUserList = users.filter((user) => user.id !== id);
            setUsers(updatedUserList);
        } catch (error) {
            console.error("Error deleting user:", error.response || error);
        }
    };

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email}{" "}
                        <button onClick={() => handleUpdateUser(user.id, { name: "Updated Name" })}>
                            Update
                        </button>{" "}
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Add User</h2>
            <div>
                <input
                    type="number"
                    placeholder="ID"
                    value={newUser.id}
                    onChange={(e) => setNewUser({ ...newUser, id: parseInt(e.target.value) })}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <button onClick={handleAddUser}>Add User</button>
            </div>
        </div>
    );
};

export default UserList;
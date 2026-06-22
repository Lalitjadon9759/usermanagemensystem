import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.data) {
        throw new Error("No data received");
      }

      const userData = response.data.map((user) => ({
        id: user.id,
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1] || "",
        email: user.email,
        department: ["HR", "IT", "Finance", "Sales"][
          user.id % 4
        ],
      }));

      setUsers(userData);
    } catch (err) {
      console.error("Fetch Error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const addUser = async (newUser) => {
    try {
      await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newUser
      );

      setUsers((prev) => [
        ...prev,
        {
          ...newUser,
          id: Date.now(),
        },
      ]);
    } catch (err) {
      console.error(err);
      setError("Failed to add user");
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        updatedUser
      );

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id
            ? { ...updatedUser, id }
            : user
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update user");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      setUsers((prev) =>
        prev.filter((user) => user.id !== id)
      );
    } catch (err) {
      console.error(err);
      setError("Failed to delete user");
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
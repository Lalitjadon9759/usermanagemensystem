import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import UserForm from "./UserForm";
import Pagination from "./Pagination";
import FilterModal from "./FilterModal";

function UserList() {
  const {
    users,
    loading,
    error,
    deleteUser,
    addUser,
    updateUser,
  } = useContext(UserContext);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);

  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  if (loading) {
    return <h2>Loading Users...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  let filteredUsers = users.filter((user) => {
    return (
      user.firstName
        .toLowerCase()
        .includes(filters.firstName.toLowerCase()) &&
      user.lastName
        .toLowerCase()
        .includes(filters.lastName.toLowerCase()) &&
      user.email
        .toLowerCase()
        .includes(filters.email.toLowerCase()) &&
      user.department
        .toLowerCase()
        .includes(filters.department.toLowerCase())
    );
  });

  filteredUsers = filteredUsers.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          style={{
            padding: "8px 12px",
            cursor: "pointer",
          }}
          onClick={() => {
            setSelectedUser(null);
            setShowForm(true);
          }}
        >
          Add User
        </button>

        <button
          style={{
            padding: "8px 12px",
            cursor: "pointer",
          }}
          onClick={() => setShowFilter(true)}
        >
          Filters
        </button>

        <input
          type="text"
          placeholder="Search User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
          }}
        />

        <Pagination
          limit={limit}
          setLimit={setLimit}
        />
      </div>

      {showForm && (
        <UserForm
          selectedUser={selectedUser}
          close={() => {
            setShowForm(false);
            setSelectedUser(null);
          }}
          onSubmit={(data) => {
            if (selectedUser) {
              updateUser(selectedUser.id, data);
            } else {
              addUser(data);
            }
          }}
        />
      )}

      {showFilter && (
        <FilterModal
          filters={filters}
          setFilters={setFilters}
          close={() => setShowFilter(false)}
        />
      )}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
        }}
      >
        <thead>
          <tr>
            <th style={tableStyle}>ID</th>
            <th style={tableStyle}>First Name</th>
            <th style={tableStyle}>Last Name</th>
            <th style={tableStyle}>Email</th>
            <th style={tableStyle}>Department</th>
            <th style={tableStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers
            .slice(0, limit)
            .map((user) => (
              <tr key={user.id}>
                <td style={tableStyle}>{user.id}</td>
                <td style={tableStyle}>
                  {user.firstName}
                </td>
                <td style={tableStyle}>
                  {user.lastName}
                </td>
                <td style={tableStyle}>
                  {user.email}
                </td>
                <td style={tableStyle}>
                  {user.department}
                </td>

                <td style={tableStyle}>
                  <button
                    style={{
                      padding: "6px 10px",
                      marginRight: "5px",
                    }}
                    onClick={() => {
                      setSelectedUser(user);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    style={{
                      padding: "6px 10px",
                    }}
                    onClick={() =>
                      deleteUser(user.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

const tableStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
};

export default UserList;
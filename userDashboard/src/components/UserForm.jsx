import { useState } from "react";

function UserForm({ onSubmit, selectedUser, close }) {
  const [formData, setFormData] = useState(
    selectedUser || {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    }
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.department
    ) {
      alert("All fields required");
      return;
    }

    onSubmit(formData);
    close();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "20px",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          borderRadius: "8px",
        }}
      >
        <h2>
          {selectedUser ? "Edit User" : "Add User"}
        </h2>

        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          style={{ padding: "10px" }}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          style={{ padding: "10px" }}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ padding: "10px" }}
        />

        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          style={{ padding: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Save
        </button>

        <button
          type="button"
          onClick={close}
          style={{
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </form>
    </div>
  );
}

export default UserForm;
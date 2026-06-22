function FilterModal({
  filters,
  setFilters,
  close,
}) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
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
      <div
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
        <h3>Filters</h3>

        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          style={{ padding: "10px" }}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          style={{ padding: "10px" }}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={{ padding: "10px" }}
        />

        <input
          name="department"
          placeholder="Department"
          onChange={handleChange}
          style={{ padding: "10px" }}
        />

        <button
          onClick={close}
          style={{
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default FilterModal;
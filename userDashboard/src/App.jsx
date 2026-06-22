import UserList from "./components/UserList";

function App() {
  return (
    <div
      style={{
        width: "90%",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        User Management Dashboard
      </h1>

      <UserList />
    </div>
  );
}

export default App;
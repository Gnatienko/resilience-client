import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, List } from "antd";

function App() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", msFlexDirection: "row" }}>
      <Menu
        onClick={({ key }) => {
          navigate(key);
        }}
        items={[
          { label: "Roles", key: "/roles" },
          { label: "Executors", key: "/executors" },
        ]}
      ></Menu>
      <Content />
    </div>
  );
}

function Content() {
  const [executors, setExecutors] = useState([]);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    const getExecutors = () => {
      fetch(
        "https://d14f98cedwjzih.cloudfront.net/executor/"
      )
        .then((res) => res.json())
        .then((data) => {
          setExecutors(data);
        });
    };
    getExecutors();

    const getRoles = () => {
      fetch(
        "https://d14f98cedwjzih.cloudfront.net/role/"
      )
        .then((res) => res.json())
        .then((data) => {
          setRoles(data);
        });
    };
    getRoles();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/roles"
          element={
            <div>
              <List
                dataSource={roles.map((a) => a.name)}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </div>
          }
        ></Route>
        <Route
          path="/executors"
          element={
            <div>
              <List
                dataSource={executors.map((a) => a.name)}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

import { useNavigate } from "react-router-dom"
import { Menu } from "antd"

import Roles from './pages/Roles'
import Executors from './pages/Executors'


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
      <Roles/>
      <Executors/>
    </div>
  );
}

export default App

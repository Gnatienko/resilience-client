import { useNavigate } from "react-router-dom"
import { Menu } from "antd"
import Roles from "./pages/Roles"
import Executors from "./pages/Executors"
import AddRole from "./pages/AddRole"
import Role from "./pages/Role"
import "./App.css"

const SubMenu = Menu.SubMenu

function App() {
  const navigate = useNavigate()

  return (
    <div style={{ display: "flex", msFlexDirection: "row" }}>
      <Menu
        mode="inline"
        style={{ width: "30rem" }}
        onClick={({ key }) => {
          navigate(key)
        }}
      >
        <SubMenu key="roles" title={<span>Roles</span>}>
          <Menu.Item key="/roles/add">Add role</Menu.Item>
          <Menu.Item key="/roles">All roles</Menu.Item>
        </SubMenu>
        <SubMenu key="executors" title={<span>Executors</span>}>
          <Menu.Item key="/executors">All executors</Menu.Item>
        </SubMenu>
      </Menu>
      <Roles />
      <Executors />
      <AddRole />
      <Role />
    </div>
  )
}

export default App

import { useNavigate } from "react-router-dom"
import { Menu } from "antd"
import Roles from "./pages/Roles"
import Executors from "./pages/Executors"

const SubMenu = Menu.SubMenu;

function App() {
  const navigate = useNavigate()

  return (
    <div style={{ display: "flex", msFlexDirection: "row" }}>
      <Menu
        mode="inline"
        style={{ width: "10%" }}
        onClick={({ key }) => {
          navigate(key)
        }}
      >
        <SubMenu title={<span>Roles</span>}>
        <Menu.Item key="/roles/create">Create role</Menu.Item>
        <Menu.Item key="/roles">All roles</Menu.Item>
        </SubMenu>
        
        <SubMenu title={<span>Executors</span>}>
        <Menu.Item key="/executors">All executors</Menu.Item>
        </SubMenu>

      </Menu>
      <Roles />
      <Executors />
    </div>
  )
}

export default App

import { useNavigate, Route, Routes } from "react-router-dom"
import { Menu } from "antd"
import Roles from "./pages/Roles"
import Executors from "./pages/Executors"
import AddRole from "./pages/AddRole"
import Role from "./pages/Role"
import Executor from "./pages/Executor"
import AddExecutor from "./pages/AddExecutor"
import Home from "./pages/Home"
import { GoogleLogin } from "@react-oauth/google"

import "./App.css"

const SubMenu = Menu.SubMenu

function App() {
  const navigate = useNavigate()
  const responseMessage = (response) => {
    console.log(response)
  }
  const errorMessage = (error) => {
    console.log(error)
  }

  return (
    <div
      style={{
        display: "flex",
        msFlexDirection: "row",
        "align-items": "top",
        "justify-content": "space-between",
      }}
    >
      <div style={{ display: "flex", msFlexDirection: "row" }}>
        <Menu
          mode="inline"
          style={{ width: "30rem" }}
          onClick={({ key }) => {
            navigate(key)
          }}
        >
          <Menu.Item key="/">Home</Menu.Item>
          <SubMenu key="roles" title={<span>Roles</span>}>
            <Menu.Item key="/roles">All roles</Menu.Item>
            <Menu.Item key="/roles/add">Add role</Menu.Item>
          </SubMenu>
          <SubMenu key="executors" title={<span>Executors</span>}>
            <Menu.Item key="/executors">All executors</Menu.Item>
            <Menu.Item key="/executors/add">Add executor</Menu.Item>
          </SubMenu>
        </Menu>

        <Routes>
          <Route path="/role/:id" element={<Role />}></Route>
          <Route path="/" element={<Home />}></Route>

          <Route path="/roles" key="/roles" element={<Roles />}></Route>
          <Route path="/roles/add" element={<AddRole />}></Route>
          <Route
            path="/executors"
            key="/executors"
            element={<Executors />}
          ></Route>
          <Route path="/executors/add" element={<AddExecutor />}></Route>
          <Route
            path="/executor/:id"
            key="/executor/:id"
            element={<Executor />}
          ></Route>
        </Routes>
      </div>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  )
}

export default App

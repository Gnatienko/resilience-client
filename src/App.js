import { useNavigate, Route, Routes } from "react-router-dom"
import { Menu, Divider } from "antd"
import { GoogleLogin } from "@react-oauth/google"
import Roles from "./pages/Roles"
import Executors from "./pages/Executors"
import AddRole from "./pages/AddRole"
import Role from "./pages/Role"
import Executor from "./pages/Executor"
import AddExecutor from "./pages/AddExecutor"
import Home from "./pages/Home"
import "./App.css"

import React from "react"
import logo from "./logo.png"

import { TeamOutlined, SettingOutlined } from "@ant-design/icons"

const SubMenu = Menu.SubMenu

function App() {
  const navigate = useNavigate()

  return (
    <div>
      <div
        style={{
          margin: "10px",
          display: "flex",
          msFlexDirection: "row",
          "justify-content": "space-between",
        }}
      >
        <div>
          <img src={logo} style={{ width: 40 }} alt="icon" /> Resilience
        </div>

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse)
          }}
          onError={() => {
            console.log("Login Failed")
          }}
        />
      </div>
      <Divider style={{ margin: "1px" }} />
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
            defaultSelectedKeys={["/"]}
            mode="inline"
            style={{ width: "30rem" }}
            onClick={({ key }) => {
              navigate(key)
            }}
          >
            <Menu.Item key="/">Home</Menu.Item>
            <SubMenu
              key="roles"
              title={<span>Roles</span>}
              icon={<SettingOutlined />}
            >
              <Menu.Item key="/roles">All roles</Menu.Item>
              <Menu.Item key="/roles/add">Add role</Menu.Item>
            </SubMenu>
            <SubMenu
              key="executors"
              title={<span>Executors</span>}
              icon={<TeamOutlined />}
            >
              <Menu.Item key="/executors">All executors</Menu.Item>
              <Menu.Item key="/executors/add">Add executor</Menu.Item>
            </SubMenu>
          </Menu>

          <Routes element={1}>
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
      </div>
    </div>
  )
}

export default App

import { useNavigate, Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import { Menu, Divider } from "antd"
import Roles from "./pages/Roles"
import Executors from "./pages/Executors"
import AddRole from "./pages/AddRole"
import Role from "./pages/Role"
import Executor from "./pages/Executor"
import AddExecutor from "./pages/AddExecutor"
import Home from "./pages/Home"
import "./App.css"
import logo from "./logo.png"
import SignIn from "./pages/SignIn"
import SignOut from "./components/SignOutButton"
import { TeamOutlined, SettingOutlined } from "@ant-design/icons"
import { decodeJwt } from "jose"

const SubMenu = Menu.SubMenu

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const jwtToken = sessionStorage.getItem("jwtToken")
    if (jwtToken) {
      try {
        const decodedToken = decodeJwt(jwtToken)
        const currentTimestamp = Math.floor(Date.now() / 1000)

        if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
          sessionStorage.removeItem("jwtToken")
          navigate("/signin")
        }
      } catch (error) {
        console.error("Error decoding JWT:", error)
        sessionStorage.removeItem("jwtToken")
        navigate("/signin")
      }
    }
  }, [navigate])

  const handleLogoClick = () => {
    navigate("/")
  }

  return sessionStorage.getItem("jwtToken") ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <header
        style={{
          margin: "10px",
          display: "flex",
          msFlexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div onClick={handleLogoClick}>
          <img src={logo} style={{ width: 40 }} alt="icon" /> Resilience
        </div>

        <SignOut />
      </header>

      <Divider style={{ margin: "0px" }} />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          alignItems: "top",
          justifyContent: "space-between",
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
            {/* <Route path="/signin" key="/signin"></Route> */}
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

      <Divider style={{ margin: "0px" }} />

      <footer
        style={{
          textAlign: "center",
        }}
      >
        v0.0.2
      </footer>
    </div>
  ) : (
    <SignIn />
  )
}

export default App

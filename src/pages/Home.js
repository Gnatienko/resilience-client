import { Card, List } from "antd"
import { TeamOutlined, SettingOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { AUTH_HEADER } from "../CONST.js"

function Home() {
  const [executors, setExecutors] = useState([])
  const [roles, setRoles] = useState([])

  useEffect(() => {
    const fetchAll = async () => {
      const res = await Promise.all([
        fetch(process.env.REACT_APP_CORE_URL + "/executor/", {
          headers: AUTH_HEADER,
        }),
        fetch(process.env.REACT_APP_CORE_URL + "/role/", {
          headers: AUTH_HEADER,
        }),
      ])
      const data = await Promise.all(res.map((r) => r.json()))
      setExecutors(data[0])
      setRoles(data[1])
    }

    fetchAll()
  }, [])

  return (
    <div style={{ width: "30rem" }}>
      <Card style={{ margin: "1rem" }}>
        <List>
          <List.Item>
            <TeamOutlined style={{ fontSize: 30 }} /> Executors{" "}
            {executors.length}
          </List.Item>
          <List.Item>
            <SettingOutlined style={{ fontSize: 30 }} /> Roles {roles.length}
          </List.Item>
        </List>
      </Card>
      v0.0.1
    </div>
  )
}

export default Home

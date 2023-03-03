import { Card, List } from "antd"
import { TeamOutlined, SettingOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"

function Home() {
  const [executors, setExecutors] = useState([])
  const [roles, setRoles] = useState([])

  useEffect(() => {
    const fetchAll = async () => {
      const res = await Promise.all([
        fetch("https://d14f98cedwjzih.cloudfront.net/executor/"),
        fetch("https://d14f98cedwjzih.cloudfront.net/role/"),
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
<<<<<<< HEAD
            <TeamOutlined style={{ fontSize: 30 }} /> Executors!!! {roles.length}
=======
            <TeamOutlined style={{ fontSize: 30 }} /> Executors+++{" "}
            {roles.length}
>>>>>>> dev
          </List.Item>
          <List.Item>
            <SettingOutlined style={{ fontSize: 30 }} /> Roles{" "}
            {executors.length}
          </List.Item>
        </List>
      </Card>
    </div>
  )
}

export default Home

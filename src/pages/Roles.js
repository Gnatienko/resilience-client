import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { List } from "antd"

function Roles() {
  const [roles, setRoles] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getRoles = () => {
      fetch("https://d14f98cedwjzih.cloudfront.net/role/")
        .then((res) => res.json())
        .then((data) => {
          setRoles(data)
        })
    }
    getRoles()
  }, [])

  return (
    <List
      dataSource={roles}
      renderItem={(item) => (
        <List.Item
          onClick={() => {
            navigate("/role/" + item.id)
          }}
        >
          {item.name}
        </List.Item>
      )}
    />
  )
}

export default Roles

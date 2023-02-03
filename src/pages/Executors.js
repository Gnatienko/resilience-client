import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { List } from "antd"
import { RightOutlined } from "@ant-design/icons"

function Executors() {
  const [executors, setExecutors] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getExecutors = async () => {
      fetch("https://d14f98cedwjzih.cloudfront.net/executor/")
        .then((res) => res.json())
        .then((data) => {
          setExecutors(data)
        })
    }
    getExecutors()
  }, [])

  return (
    <div>
      <List
        style={{ width: "20rem" }}
        dataSource={executors}
        renderItem={(item) => (
          <List.Item
            onClick={() => {
              navigate("/executor/" + item.id)
            }}
          >
            <List.Item.Meta title={item.name} />
            <RightOutlined />
          </List.Item>
        )}
      />
    </div>
  )
}

export default Executors

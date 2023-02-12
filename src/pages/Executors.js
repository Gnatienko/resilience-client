import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { List, Progress } from "antd"
import { RightOutlined } from "@ant-design/icons"
import { red, green, yellow } from "@ant-design/colors"

function Executors() {
  const [executors, setExecutors] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAll = async () => {
      const res = await Promise.all([
        fetch("https://d14f98cedwjzih.cloudfront.net/executor/"),
        fetch("https://d14f98cedwjzih.cloudfront.net/executor-role/"),
      ])
      const data = await Promise.all(res.map((r) => r.json()))

      const executors = data[0].map((e) => {
        return {
          ...e,
          occupation: data[1].reduce((accumulator, object) => {
            if (object.executorId === e.id) {
              accumulator = accumulator + object.hoursPerWeek
            }
            return accumulator
          }, 0),
        }
      })

      setExecutors(executors)
    }
    fetchAll()
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
            {" "}
            <div>
              <List.Item.Meta title={item.name} />
              <RightOutlined />
            </div>
            <Progress
              style={{
                height: "12x",
              }}
              percent={(item.occupation * 100) / 40}
              strokeColor={
                (item.occupation * 100) / 40 < 40
                  ? yellow[5]
                  : (item.occupation * 100) / 40 < 90
                  ? green[5]
                  : red[5]
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default Executors

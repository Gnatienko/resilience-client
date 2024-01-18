import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { List, Progress, Avatar } from "antd"
import { RightOutlined } from "@ant-design/icons"
import { red, green, yellow } from "@ant-design/colors"
import { WORKING_HOURS_PER_WEEK, AUTH_HEADER } from "../CONST.js"
import emptyProfile from "../empty-profile.png"

function Executors() {
  const [executors, setExecutors] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAll = async () => {
      const res = await Promise.all([
        fetch(process.env.REACT_APP_CORE_URL + "/executor/", {
          headers: AUTH_HEADER,
        }),
        fetch(process.env.REACT_APP_CORE_URL + "/executor-role/", {
          headers: AUTH_HEADER,
        }),
      ])
      const data = await Promise.all(res.map((r) => r.json()))

      const executors = data[0].map((e) => {
        const occupation = data[1].reduce((accumulator, object) => {
          if (object.executorId === e.id) {
            accumulator = accumulator + object.hoursPerWeek
          }
          return accumulator
        }, 0)
        return {
          ...e,
          occupation: occupation,
          relativeOccupation: Math.round(
            (occupation / WORKING_HOURS_PER_WEEK) * 100
          ),
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
        renderItem={(item, index) => (
          <List.Item
            onClick={() => {
              navigate("/executor/" + item.id)
            }}
          >
            {" "}
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
              }}
            >
              <List.Item.Meta
                title={item.name}
                avatar={
                  <Avatar
                    src={emptyProfile} //src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
              />
              <RightOutlined />
            </div>
            <Progress
              style={{
                height: "12x",
              }}
              percent={item.relativeOccupation}
              strokeColor={
                item.relativeOccupation < 15
                  ? red[5]
                  : item.relativeOccupation < 40
                  ? yellow[5]
                  : item.relativeOccupation < 90
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

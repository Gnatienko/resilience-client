import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { List, Progress, Avatar } from "antd"
import { RightOutlined } from "@ant-design/icons"
import { red, green, yellow } from "@ant-design/colors"
import emptyRole from "../empty-role.png"
import { CORE_URL } from "../CONST.js"

function Roles() {
  const [roles, setRoles] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchAll = async () => {
      const headers = {
        Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
      }

      console.log(headers)

      const res = await Promise.all([
        fetch(CORE_URL + "/role/", { headers }),
        fetch(CORE_URL + "/executor-role/", { headers }),
      ])
      const data = await Promise.all(res.map((r) => r.json()))

      const roles = data[0].map((e) => {
        return {
          ...e,
          execution: data[1].reduce((accumulator, object) => {
            if (object.roleId === e.id) {
              accumulator =
                accumulator + object.hoursPerWeek * object.qualification
            }
            return accumulator
          }, 0),
        }
      })

      setRoles(roles)
    }

    fetchAll()
  }, [])

  return (
    <List
      style={{
        width: "20rem",
      }}
      dataSource={roles}
      renderItem={(item) => (
        <List.Item
          onClick={() => {
            navigate("/role/" + item.id)
          }}
          style={{
            display: "flex",
            "flex-direction": "column",
            "align-items": "flex-start",
          }}
        >
          <div
            style={{ display: "flex", width: "100%", "align-items": "center" }}
          >
            <List.Item.Meta
              title={item.name}
              avatar={<Avatar src={emptyRole} />}
            />
            <RightOutlined />{" "}
          </div>{" "}
          <Progress
            style={{
              height: "12x",
            }}
            percent={Math.round(
              (item.execution / item.requiredSkillHours) * 100
            )}
            strokeColor={
              (item.execution / item.requiredSkillHours) * 100 < 40
                ? red[5]
                : (item.execution / item.requiredSkillHours) * 100 < 90
                ? green[5]
                : yellow[5]
            }
          />
        </List.Item>
      )}
    />
  )
}

export default Roles

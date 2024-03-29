import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  Button,
  Form,
  Input,
  List,
  Select,
  Slider,
  Checkbox,
  Card,
  Avatar,
} from "antd"
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import emptyProfile from "../empty-profile.png"
import { AUTH_HEADER } from "../CONST.js"

function Executor() {
  let { id } = useParams()
  const [executor, setExecutor] = useState([])
  const [roles, setRoles] = useState([])
  const [skills, setSkills] = useState([])
  const [selectedRole, setSelectedRole] = useState({})
  const [qualification, setQualification] = useState(5)
  const [hoursPerWeek, setHoursPerWeek] = useState(5)
  const [occupation, setOccupation] = useState(5)
  const [sliderIsDisable, setSliderIsDisable] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchExecutor = async (id) => {
      const res = await Promise.all([
        fetch(process.env.REACT_APP_CORE_URL + "/executor/?id=" + id, {
          headers: AUTH_HEADER,
        }),
        fetch(process.env.REACT_APP_CORE_URL + "/role/", {
          headers: AUTH_HEADER,
        }),
        fetch(
          process.env.REACT_APP_CORE_URL + "/executor/skill?executorId=" + id,
          {
            headers: AUTH_HEADER,
          }
        ),
      ])
      const data = await Promise.all(res.map((r) => r.json()))
      setExecutor(data[0])
      setRoles(data[1])
      const skills = data[2].map((e) => {
        return {
          ...e,
          name: data[1].find((x) => x.id === e.roleId).name,
        }
      })
      setSkills(skills)

      const occupation = skills.reduce((accumulator, object) => {
        return accumulator + object.hoursPerWeek
      }, 0)

      setOccupation(occupation)
    }

    fetchExecutor(id)
  }, [id])

  const handleChange = (field, newVal) => {
    setExecutor({
      ...executor,
      [field]: newVal,
    })
  }

  const SaveChanges = async () => {
    const options = { method: "PUT", headers: AUTH_HEADER }
    await fetch(
      process.env.REACT_APP_CORE_URL +
        "/executor?name=" +
        executor.name +
        "&id=" +
        executor.id +
        "&salary=" +
        executor.salary,
      options
    )
  }

  const Delete = async () => {
    const options = { method: "DELETE", headers: AUTH_HEADER }
    await fetch(
      process.env.REACT_APP_CORE_URL + "/executor?id=" + executor.id,
      options
    )
    navigate("/executors/")
  }

  const handleChangeRoleSelect = (name) => {
    setSelectedRole(roles.find((x) => x.name === name))
    const selectedSkill = skills.find((x) => x.name === name)
    setQualification(
      selectedSkill && selectedSkill.qualification
        ? selectedSkill.qualification
        : 5
    )
    setHoursPerWeek(
      selectedSkill && selectedSkill.hoursPerWeek
        ? selectedSkill.hoursPerWeek
        : 5
    )
    setSliderIsDisable(false)
  }

  const handleItemClick = (name, qualification, hoursPerWeek) => {
    setSelectedRole(roles.find((x) => x.name === name))
    setQualification(qualification)
    setHoursPerWeek(hoursPerWeek)
    setSliderIsDisable(false)
  }

  const addSkill = async () => {
    try {
      const options = { method: "PUT", headers: AUTH_HEADER }
      await fetch(
        process.env.REACT_APP_CORE_URL +
          "/executor-role/skill?executorId=" +
          executor.id +
          "&roleId=" +
          selectedRole.id +
          "&qualification=" +
          qualification +
          "&hoursPerWeek=" +
          hoursPerWeek,
        options
      )
      window.location.reload()
    } catch (error) {
      console.error("Error on add skill button", error)
    }
  }

  const removeSkill = async (roleId) => {
    const options = { method: "PUT", headers: AUTH_HEADER }
    await fetch(
      process.env.REACT_APP_CORE_URL +
        "/executor-role/skill?executorId=" +
        executor.id +
        "&roleId=" +
        roleId +
        "&qualification=0",
      options
    )
    await fetch(
      process.env.REACT_APP_CORE_URL +
        "/executor-role/duty/?executorId=" +
        executor.id +
        "&roleId=" +
        roleId +
        "&isDuty=false",
      options
    )
    window.location.reload()
  }

  const setDuty = async (roleId, isDuty) => {
    const options = { method: "PUT", headers: AUTH_HEADER }
    await fetch(
      process.env.REACT_APP_CORE_URL +
        "/executor-role/duty/?executorId=" +
        executor.id +
        "&roleId=" +
        roleId +
        "&isDuty=" +
        !isDuty,
      options
    )
    window.location.reload()
  }

  return (
    <div style={{ width: "30rem" }}>
      <Card style={{ margin: "1rem" }}>
        <div
          style={{
            display: "flex",
            msFlexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h4 children="Executor details"></h4>{" "}
          <Avatar src={emptyProfile} size={64} />
        </div>
        <Form>
          <Form.Item label={"ID"}> {executor.id} </Form.Item>
          <Form.Item label="Name">
            <Input
              value={executor.name}
              onChange={(e) => handleChange("name", e.target.value)}
            ></Input>
          </Form.Item>
          <Form.Item label={"Salary"}>
            <Input
              value={executor.salary}
              onChange={(e) => handleChange("salary", e.target.value)}
            ></Input>
          </Form.Item>
          <Form.Item label={"Occupation hours per week"}>
            {occupation}
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Form.Item>
              <Button onClick={SaveChanges} type="primary">
                <div style={{ verticalAlign: "middle" }}>
                  <SaveOutlined /> Save changes
                </div>
              </Button>
            </Form.Item>

            <Form.Item>
              <Button danger onClick={Delete}>
                <div style={{ verticalAlign: "middle" }}>
                  <DeleteOutlined /> Delete
                </div>
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
      <Card style={{ margin: "1rem" }}>
        <h4 children="Skills"></h4>
        <Select
          showSearch
          style={{ width: "100%", marginBottom: "1rem" }}
          value={selectedRole.name}
          placeholder="Chose a function to set skill"
          onChange={(e) => handleChangeRoleSelect(e)}
          options={roles.map((e) => {
            return {
              value: e.name,
            }
          })}
        />
        Qualification:
        <Slider
          disabled={sliderIsDisable}
          min={0}
          max={10}
          value={qualification}
          onChange={(e) => setQualification(e)}
        ></Slider>
        Hours per week:
        <Slider
          disabled={sliderIsDisable}
          min={0}
          max={40}
          value={hoursPerWeek}
          onChange={(e) => setHoursPerWeek(e)}
        ></Slider>
        <Button onClick={addSkill} type="primary">
          Add/update skill
        </Button>
        <List
          dataSource={skills}
          renderItem={(item) => (
            <List.Item
              onClick={() => {
                handleItemClick(
                  item.name,
                  item.qualification,
                  item.hoursPerWeek
                )
              }}
            >
              <div>
                <Checkbox
                  checked={item.isDuty}
                  onClick={() => {
                    setDuty(item.roleId, item.isDuty)
                  }}
                ></Checkbox>
                {" " + item.name}
              </div>
              <DeleteOutlined
                onClick={() => {
                  removeSkill(item.roleId)
                }}
              />
            </List.Item>
          )}
        ></List>
      </Card>
    </div>
  )
}

export default Executor

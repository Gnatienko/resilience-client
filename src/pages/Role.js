import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button, Form, Input, Slider, Card, Select, List } from "antd"
import { useNavigate } from "react-router-dom"
import { DeleteOutlined } from "@ant-design/icons"

function Role() {
  let { id } = useParams()
  const [role, setRole] = useState([])
  const [executors, setExecutors] = useState([])
  const [selectedExecutor, setSelectedExecutor] = useState({})
  const [skillCarriers, setSkillCarriers] = useState([])
  const [qualification, setQualification] = useState(5)
  const [hoursPerWeek, setHoursPerWeek] = useState(5)
  const [execution, setExecution] = useState(5)
  const [sliderIsDisable, setSliderIsDisable] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchAll = async (id) => {
      const res = await Promise.all([
        fetch("https://d14f98cedwjzih.cloudfront.net/role/?id=" + id),
        fetch("https://d14f98cedwjzih.cloudfront.net/executor/"),
        fetch(
          "https://d14f98cedwjzih.cloudfront.net/executor-role/?roleId=" + id
        ),
      ])
      const data = await Promise.all(res.map((r) => r.json()))
      setRole(data[0])
      setExecutors(data[1])
      const skillCarriers = data[2].map((e) => {
        return {
          ...e,
          name: data[1].find((x) => x.id === e.executorId).name,
        }
      })
      setSkillCarriers(skillCarriers)
      const execution = skillCarriers.reduce((accumulator, object) => {
        return accumulator + object.hoursPerWeek * object.qualification
      }, 0)

      setExecution(execution)
    }

    fetchAll(id)
  }, [id])

  const handleChange = (field, newVal) => {
    setRole({
      ...role,
      [field]: newVal,
    })
  }

  const handleChangeExecutorSelect = (name) => {
    setSelectedExecutor(executors.find((x) => x.name === name))
    setSliderIsDisable(false)
  }
  const handleItemClick = (name, qualification, hoursPerWeek) => {
    setSelectedExecutor(executors.find((x) => x.name === name))
    setQualification(qualification)
    setHoursPerWeek(hoursPerWeek)
    setSliderIsDisable(false)
  }

  const SaveChanges = () => {
    const options = { method: "PUT" }
    fetch(
      "https://d14f98cedwjzih.cloudfront.net/role?name=" +
        role.name +
        "&weight=" +
        role.weight +
        "&id=" +
        role.id +
        "&requiredSkillHours=" +
        role.requiredSkillHours,
      options
    )
  }

  const addSkill = async () => {
    const options = { method: "PUT" }
    await fetch(
      "https://d14f98cedwjzih.cloudfront.net/executor-role/skill?executorId=" +
        selectedExecutor.id +
        "&roleId=" +
        role.id +
        "&qualification=" +
        qualification +
        "&hoursPerWeek=" +
        hoursPerWeek,
      options
    )
    window.location.reload()
  }

  const Delete = async () => {
    const options = { method: "DELETE" }
    await fetch(
      "https://d14f98cedwjzih.cloudfront.net/role?id=" + role.id,
      options
    )
    navigate("/roles/")
  }

  const removeSkill = async (executorId) => {
    const options = { method: "DELETE" }
    await fetch(
      "https://d14f98cedwjzih.cloudfront.net/executor-role?roleId=" +
        role.id +
        "&executorId=" +
        executorId,
      options
    )

    window.location.reload()
  }

  return (
    <div style={{ width: "30rem" }}>
      <Card style={{ margin: "1rem" }}>
        <h4 children="Info"></h4>
        <Form>
          <Form.Item label={"ID"}> {role.id} </Form.Item>

          <Form.Item label="Required Skill Hours Per Week">
            <Input
              value={role.requiredSkillHours}
              onChange={(e) =>
                handleChange("requiredSkillHours", e.target.value)
              }
            ></Input>
          </Form.Item>
          <Form.Item label={"Executed Skill Hours Per Week"}>
            {execution}{" "}
          </Form.Item>

          <Form.Item label="Name">
            <Input
              value={role.name}
              onChange={(e) => handleChange("name", e.target.value)}
            ></Input>
          </Form.Item>
          <Form.Item label="Weight">
            <Slider
              min={0}
              max={10}
              value={role.weight}
              onChange={(e) => handleChange("weight", e)}
            ></Slider>
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Form.Item>
              <Button onClick={SaveChanges} type="primary">
                Save changes
              </Button>
            </Form.Item>

            <Form.Item>
              <Button danger onClick={Delete}>
                Delete
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
      <Card style={{ margin: "1rem" }}>
        <Select
          showSearch
          style={{ width: "100%" }}
          value={selectedExecutor.name}
          placeholder="Chose the executor"
          onChange={(e) => handleChangeExecutorSelect(e)}
          options={executors.map((e) => {
            return {
              value: e.name,
            }
          })}
        />{" "}
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
          Add\update skilled executor
        </Button>
        <List
          dataSource={skillCarriers}
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
              <div>{item.name}</div>
              <DeleteOutlined
                onClick={() => {
                  removeSkill(item.executorId)
                }}
              />
            </List.Item>
          )}
        ></List>
      </Card>
    </div>
  )
}

export default Role

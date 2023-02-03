import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button, Form, Input, Slider, Card, Select, List } from "antd"

function Role() {
  let { id } = useParams()
  const [role, setRole] = useState([])
  const [executors, setExecutors] = useState([])
  const [selectedExecutor, setSelectedExecutor] = useState({})
  // todo - add skill carrier to role. First need to add it on back

  useEffect(() => {
    const fetchAll = async (id) => {
      const res = await Promise.all([
        fetch("https://d14f98cedwjzih.cloudfront.net/role/?id=" + id),
        fetch("https://d14f98cedwjzih.cloudfront.net/executor/"),
      ])
      const data = await Promise.all(res.map((r) => r.json()))
      setRole(data[0])
      setExecutors(data[1])
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

  return (
    <div>
      <Card style={{ margin: "1rem" }}>
        <h4 children="Info"></h4>
        <Form style={{ width: "20rem" }}>
          <Form.Item label={"ID"}> {role.id} </Form.Item>

          <Form.Item label="Required Skill Hours">
            <Input
              value={role.requiredSkillHours}
              onChange={(e) =>
                handleChange("requiredSkillHours", e.target.value)
              }
            ></Input>
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
          <Form.Item>
            <Button onClick={SaveChanges} type="primary">
              Save changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card style={{ margin: "1rem" }}>
        <Select
          showSearch
          value={selectedExecutor.name}
          style={{ width: "30rem" }}
          placeholder="Chose the executor"
          onChange={(e) => handleChangeExecutorSelect(e)}
          options={executors.map((e) => {
            return {
              id: e.id,
              value: e.name,
              title: e.weight,
            }
          })}
        />
      </Card>
    </div>
  )
}

export default Role

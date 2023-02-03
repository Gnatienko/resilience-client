import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button, Form, Input, List, Select, Slider, Checkbox } from "antd"

function Executor() {
  let { id } = useParams()
  const [executor, setExecutor] = useState([])
  const [roles, setRoles] = useState([])
  const [skills, setSkills] = useState([])
  const [selectedRole, setSelectedRole] = useState({})

  const [qualification, setQualification] = useState(5)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchExecutor = async (id) => {
      const res = await Promise.all([
        fetch("https://d14f98cedwjzih.cloudfront.net/executor/?id=" + id),
        fetch("https://d14f98cedwjzih.cloudfront.net/role/"),
        fetch(
          "https://d14f98cedwjzih.cloudfront.net/executor/skill?executorId=" +
            id
        ),
      ])
      const data = await Promise.all(res.map((r) => r.json()))
      setExecutor(data[0])
      setRoles(data[1])
      setSkills(
        data[2].map((e) => {
          return {
            ...e,
            name: data[1].find((x) => x.id === e.roleId).name,
          }
        })
      )
    }

    fetchExecutor(id)
  }, [id])

  const handleChange = (field, newVal) => {
    setExecutor({
      ...executor,
      [field]: newVal,
    })
  }

  const SaveChanges = () => {
    const options = { method: "PUT" }
    fetch(
      "https://d14f98cedwjzih.cloudfront.net/executor?name=" +
        executor.name +
        "&id=" +
        executor.id,
      options
    )
    setTimeout(() => {
      navigate("/executors")
    }, 500)
  }

  const handleChangeRoleSelect = (name) => {
    setSelectedRole(roles.find((x) => x.name === name))
  }

  const handleItemClick = (name, qualification) => {
    setSelectedRole(roles.find((x) => x.name === name))
    setQualification(qualification)
  }

  const addSkill = async () => {
    const options = { method: "PUT" }
    await fetch(
      "https://d14f98cedwjzih.cloudfront.net/executor/skill?executorId=" +
        executor.id +
        "&roleId=" +
        selectedRole.id +
        "&qualification=" +
        qualification,
      options
    )
    window.location.reload()
  }

  const setDuty = async (roleId, isDuty) => {
    const options = { method: "PUT" }
    await fetch(
      "https://d14f98cedwjzih.cloudfront.net/executor-role/duty/?executorId=" +
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
    <div>
      <Form>
        <Form.Item label="Name">
          <Input
            value={executor.name}
            onChange={(e) => handleChange("name", e.target.value)}
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button onClick={SaveChanges} type="primary">
            Save changes
          </Button>
        </Form.Item>
      </Form>

      <Select
        showSearch
        value={selectedRole.name}
        style={{ width: "30rem" }}
        placeholder="Chose the function"
        onChange={(e) => handleChangeRoleSelect(e)}
        options={roles.map((e) => {
          return {
            id: e.id,
            value: e.name,
            title: e.weight,
          }
        })}
      />

      <Slider
        min={0}
        max={10}
        value={qualification}
        onChange={(e) => setQualification(e)}
      ></Slider>
      <Button onClick={addSkill} type="primary">
        Add skill
      </Button>

      <List
        dataSource={skills}
        renderItem={(item) => (
          <List.Item
            onClick={() => {
              handleItemClick(item.name, item.qualification)
            }}
          >
            <Checkbox
              checked={item.isDuty}
              onClick={() => {
                setDuty(item.roleId, item.isDuty)
              }}
            >
              {item.name}
            </Checkbox>
          </List.Item>
        )}
      ></List>
    </div>
  )
}

export default Executor

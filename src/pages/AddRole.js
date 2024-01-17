import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Slider, Card } from "antd"
import { useState } from "react"

function AddRole() {
  const [name, setName] = useState("")
  const [weight, setWeight] = useState(5)
  const [requiredSkillHours, setRequiredSkillHours] = useState(5)

  const navigate = useNavigate()

  const Post = () => {
    const options = { method: "POST" }
    fetch(
      process.env.REACT_APP_CORE_URL +
        "/role?name=" +
        name +
        "&weight=" +
        weight +
        "&requiredSkillHours=" +
        requiredSkillHours,
      options
    )
    navigate("/roles")
  }

  return (
    <Card style={{ margin: "1rem", width: "30rem" }}>
      <Form>
        <Form.Item label="Name">
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Required Skill Hours">
          <Input onChange={(e) => setRequiredSkillHours(e.target.value)} />
        </Form.Item>
        <Form.Item label="Weight">
          <Slider
            defaultValue={5}
            min={0}
            max={10}
            onChange={(e) => setWeight(e)}
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={Post} type="primary">
            Add role
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default AddRole

import { useNavigate } from "react-router-dom"
import { Button, Form, Input, Card } from "antd"
import { useState } from "react"

function AddExecutor() {
  const [name, setName] = useState("")
  const [salary, setSalary] = useState("")

  const navigate = useNavigate()

  const Post = () => {
    const options = { method: "POST" }
    fetch(
      "https://d14f98cedwjzih.cloudfront.net/executor?name=" +
        name +
        "&salary=" +
        salary,
      options
    )

    navigate("/executors")
  }

  return (
    <Card style={{ margin: "1rem", width: "30rem" }}>
      <Form>
        <Form.Item label="Name">
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Salary">
          <Input onChange={(e) => setSalary(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button onClick={Post} type="primary">
            Add executor
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default AddExecutor

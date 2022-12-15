import { useNavigate } from "react-router-dom"
import { Button, Form, Input } from "antd"
import { useState } from "react"

function AddExecutor() {
  const [name, setName] = useState("")
  const navigate = useNavigate()

  const Post = () => {
    const options = { method: "POST" }
    fetch(
      "https://d14f98cedwjzih.cloudfront.net/executor?name=" + name,
      options
    )

    navigate("/executors")
  }

  return (
    <>
      <Form style={{ margin: "2rem" }}>
        <Form.Item label="Name">
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button onClick={Post} type="primary">
            Add executor
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default AddExecutor

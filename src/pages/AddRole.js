import { Route, Routes, useNavigate } from "react-router-dom"
import { Button, Form, Input, Slider } from "antd"
import { useState } from "react"

function AddRole() {
  const [name, setName] = useState("")
  const [weight, setWeight] = useState(5)
  const navigate = useNavigate()

  const Post = () => {
    const options = { method: "POST" }
    fetch(
      "https://d14f98cedwjzih.cloudfront.net/role?name=" +
        name +
        "&weight=" +
        weight,
      options
    )
    navigate("/roles")
  }

  return (
    <Routes>
      <Route
        path="/roles/add"
        element={
          <Form style={{ margin: "2rem" }}>
            <Form.Item label="Name">
              <Input onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Weight">
              <Slider
                defaultValue={5}
                min={0}
                max={10}
                onChange={(e) => setWeight(e)}
                style={{ width: "30rem" }}
              />
            </Form.Item>
            <Form.Item>
              <Button onClick={Post} type="primary">
                Add role
              </Button>
            </Form.Item>
          </Form>
        }
      ></Route>
    </Routes>
  )
}

export default AddRole

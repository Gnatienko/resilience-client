import { Route, Routes } from "react-router-dom"
import { Button, Form, Input, Slider } from "antd"
import { useState, useNavigate } from "react"

function AddRole() {
  const [name, setName] = useState("")
  const [weight, setWeight] = useState(null)
  const navigate = useNavigate()

  const post = () => {
    const options = { method: "POST" }
    fetch(
      "https://d14f98cedwjzih.cloudfront.net/role?name=" +
        name +
        "&weight=" +
        weight,
      options
    )
  }

  navigate("/roles")

  return (
    <div style={{ width: "100%" }}>
      <Routes>
        <Route
          path="/roles/add"
          element={
            <Form style={{ margin: "2rem", width: "100%" }}>
              <div style={{ width: "30%" }}>
                <Form.Item label="Name">
                  <Input onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Weight">
                  <Slider
                    defaultValue={5}
                    min={0}
                    max={10}
                    onChange={(e) => setWeight(e)}
                  />
                </Form.Item>
              </div>
              <Form.Item formLayout="horizontal">
                <Button onClick={post} type="primary">
                  Add role
                </Button>
              </Form.Item>
            </Form>
          }
        ></Route>
      </Routes>
    </div>
  )
}

export default AddRole

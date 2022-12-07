import { Route, Routes, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button, Form, Input, Slider } from "antd"

function Element() {
  let { id } = useParams()

  const [role, setRole] = useState([])
  useEffect(() => {
    const getRole = (id) => {
      fetch("https://d14f98cedwjzih.cloudfront.net/role/?id=" + id)
        .then((res) => res.json())
        .then((data) => {
          setRole(data)
        })
    }
    getRole(id)
  }, [id])

  return (
    <Form>
      <Form.Item label="Name">
        <Input value={role.name}></Input>
      </Form.Item>
      <Form.Item label="Weight">
        <Slider
          min={0}
          max={10}
          style={{ width: "30rem" }}
          value={role.weight}
        ></Slider>
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  )
}

function Role() {
  return (
    <Routes>
      <Route path="/role/:id" element={<Element />}></Route>
    </Routes>
  )
}

export default Role

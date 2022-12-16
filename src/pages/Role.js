import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button, Form, Input, Slider } from "antd"

function Role() {
  let { id } = useParams()

  const [role, setRole] = useState([])

  const navigate = useNavigate()

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

  const handleChange = (field, newVal) => {
    setRole({
      ...role,
      [field]: newVal,
    })
  }

  const Submit = () => {
    const options = { method: "PUT" }
    fetch(
      "https://d14f98cedwjzih.cloudfront.net/role?name=" +
        role.name +
        "&weight=" +
        role.weight +
        "&id=" +
        role.id,
      options
    )

    setTimeout(() => {
      navigate("/roles")
    }, 500)
  }

  return (
    <Form>
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
        <Button onClick={Submit} type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Role

import { Route, Routes, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button, Form, Input } from "antd"

function Element() {
  let { id } = useParams()
  const [executor, setExecutor] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getExecutor = (id) => {
      fetch("https://d14f98cedwjzih.cloudfront.net/executor/?id=" + id)
        .then((res) => res.json())
        .then((data) => {
          setExecutor(data)
        })
    }
    getExecutor(id)
  }, [id])

  const handleChange = (field, newVal) => {
    setExecutor({
      ...executor,
      [field]: newVal,
    })
  }

  const Submit = () => {
    const options = { method: "PUT" }
    fetch(
      "https://d14f98cedwjzih.cloudfront.net/executor?name=" +
        executor.name +
        "&id=" +
        executor.id,
      options
    )
    navigate("/executors")
  }

  return (
    <Form>
      <Form.Item label="Name">
        <Input
          value={executor.name}
          onChange={(e) => handleChange("name", e.target.value)}
        ></Input>
      </Form.Item>
      <Form.Item>
        <Button onClick={Submit} type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

function Executor() {
  return (
    <Routes>
      <Route path="/executor/:id" element={<Element />}></Route>
    </Routes>
  )
}

export default Executor

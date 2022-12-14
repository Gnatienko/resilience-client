import { Route, Routes, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button, Form, Input, List, Select, Slider } from "antd"

function Element() {
  let { id } = useParams()
  const [executor, setExecutor] = useState([])
  const [roles, setRoles] = useState([])
  const [skills, setSkills] = useState([])

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

    const getRoles = () => {
      fetch("https://d14f98cedwjzih.cloudfront.net/role/")
        .then((res) => res.json())
        .then((data) => {
          setRoles(data)
        })
    }
    getRoles()

    const getSkills = (id) => {
      fetch(
        "https://d14f98cedwjzih.cloudfront.net/executor/skill?executorId=" + id
      )
        .then((res) => res.json())
        .then((data) => {
          setSkills(data)
        })
    }
    getSkills(id)
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
    navigate("/executors")
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
        style={{ width: "30rem" }}
        placeholder="Chose the function"
        options={roles.map((e) => {
          return {
            id: e.id,
            value: e.name,
          }
        })}
      />

      <Slider></Slider>
      <Button onClick={SaveChanges} type="primary">
        Add skill
      </Button>

      <List
        dataSource={skills}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      ></List>
    </div>
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

import { Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import { List } from "antd"

function Executors() {
  const [executors, setExecutors] = useState([])

  useEffect(() => {
    const getExecutors = () => {
      fetch("https://d14f98cedwjzih.cloudfront.net/executor/")
        .then((res) => res.json())
        .then((data) => {
          setExecutors(data)
        })
    }
    getExecutors()
  }, [])

  return (
    <div>
      <Routes>
        <Route
          path="/executors"
          element={
            <div>
              <List
                dataSource={executors.map((a) => a.name)}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </div>
          }
        ></Route>
      </Routes>
    </div>
  )
}

export default Executors

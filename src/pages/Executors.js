import { Route, Routes, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { List } from "antd"

function Executors() {
  const [executors, setExecutors] = useState([])
  const navigate = useNavigate()

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
    <Routes>
      <Route
        path="/executors"
        element={
          <div>
            <List
              dataSource={executors}
              renderItem={(item) => (
                <List.Item
                  onClick={() => {
                    navigate("/executor/" + item.id)
                  }}
                >
                  {item.name}
                </List.Item>
              )}
            />
          </div>
        }
      ></Route>
    </Routes>
  )
}

export default Executors

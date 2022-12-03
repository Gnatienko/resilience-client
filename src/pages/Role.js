import { Route, Routes, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

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
    <div>
      id={id} {role.id} {role.name} {role.weight}
    </div>
  )
}

function Role() {
  return (
    <div style={{ width: "100%" }}>
      <Routes>
        <Route path="/role/:id" element={<Element />}></Route>
      </Routes>
    </div>
  )
}

export default Role

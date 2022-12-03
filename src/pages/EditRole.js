import { Route, Routes, useParams } from "react-router-dom"

function EditRole() {
  let { id } = useParams()

  return (
    <div style={{ width: "100%" }}>
      <Routes>
        <Route path="/roles/:id" element={<div>id={id}</div>}></Route>
      </Routes>
    </div>
  )
}

export default EditRole

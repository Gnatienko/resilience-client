import { Route, Routes } from "react-router-dom";
import { Button, Form, Input, Slider } from "antd";

function AddRole() {
  return (

      <Routes>
        <Route
          path="/roles/add"
          element={
            <Form style={{ margin: "2rem", width: "100%"}}>
              <div style={{  width: "30%"}}>
              <Form.Item label="Name">
                <Input />
              </Form.Item>
              <Form.Item label="Weight">
                <Slider defaultValue={5} min={0} max={10} step={0.01} />
              </Form.Item>
              </div>
              <Form.Item formLayout="horizontal">
                <Button type="primary">Add role</Button>
              </Form.Item>
            </Form>
          }
        ></Route>
      </Routes>
 
  );
}

export default AddRole;

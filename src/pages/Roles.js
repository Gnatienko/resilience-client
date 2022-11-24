import { Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import { List } from "antd"


function Roles() {
    const [roles, setRoles] = useState([]);
 
    useEffect(() => {
      const getRoles = () => {
        fetch(
          "https://d14f98cedwjzih.cloudfront.net/role/"
        )
          .then((res) => res.json())
          .then((data) => {
            setRoles(data);
          });
      };
      getRoles();
    }, []);
  
    return (
      <div>
        <Routes>
          <Route
            path="/roles"
            element={
              <div>
                <List
                  dataSource={roles.map((a) => a.name)}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </div>
            }
          ></Route>
        </Routes>
      </div>
    );
  }
  
  export default Roles
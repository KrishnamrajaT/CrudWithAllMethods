import { Table, Button } from "react-bootstrap";
import axios from "axios";
import react, { useEffect, useState } from "react";
export const UserDetails = ({ refresh, setUsers }) => {
  const [userList, setUsersList] = useState([]);
  const getAll = () => {
    axios
      .get("http://localhost:3000/data")
      .then((res) => {
        setUsersList(res.data);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  useEffect(() => {
    getAll();
  }, [refresh]);
  // console.log(user);
  const deleteUser = (id) => {
    axios.delete(`http://localhost:3000/data${id}`).then().catch();
  };
  return (
    <Table striped className="p-4">
      <thead>
        <tr>
          <th>Sno</th>
          <th>Name</th>
          <th>Phone </th>
          <th>Age </th>
          <th>Email </th>
        </tr>
      </thead>
      <tbody>
        {userList.map((ele, i) => (
          <>
            <tr>
              <td>{i + 1}</td>
              <td>{ele.name}</td>
              <td>{ele.phone}</td>
              <td>{ele.age}</td>
              <td>{ele.email}</td>
              <Button
                variant="primary"
                type="submit"
                onClick={() => {
                  setUsers(ele);
                }}
              >
                Update
              </Button>
              <Button
                variant="danger"
                type="submit"
                onClick={() => {
                  deleteUser(ele._id);
                }}
              >
                Delete
              </Button>
            </tr>
          </>
        ))}
      </tbody>
    </Table>
  );
};

import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import react, { useState } from "react";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { AddUser } from "./AddUser";
import { UpdateUser } from "./UpdateUser";
import { UserDetails } from "./UserDetails";
export default function App() {
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState({});
  return (
    <div>
      <div>
        <center>
          <h2>Crud</h2>
        </center>
      </div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>
            <AddUser refresh={refresh} setRefresh={setRefresh} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <UpdateUser
              users={users}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <UserDetails refresh={refresh} setUsers={setUsers} />
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}

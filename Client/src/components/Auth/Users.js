import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { deleteUser, fetchUsers } from "../../actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "../Loading/Loading";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.fetchUsers.users);
  const role = useSelector((state) => state.auth.authData.role);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  if (!users) {
    return <Loading />;
  }

  return (
    <div style={{ marginTop: "200px" }}>
      {role !== "ADMIN" ? (
        <h1>NO ACCESS!!</h1>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container spacing={3} justifyContent="center">
              {users.map((user) => (
                <Grid item key={user.id} xs={12} sm={6} md={3.5} lg={3.5} xl={3.5}>
                  <Card
                    sx={{
                      minWidth: 275,
                      textAlign: "left",
                      background: "rgb(247, 247, 247)",
                    }}
                    elevation={0}
                  >
                    <CardContent>
                      <Typography sx={{ fontSize: 14, fontWeight:"600" }} color="text.primary">
                        User ID: {user.id}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        Name: {user.firstName} {user.lastName}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        Email: {user.email}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Role: {user.role}
                      </Typography>
                      <CardActions>
                        {user.role !== "ADMIN" ? (
                          <Button
                            style={{
                              background: "rgb(138, 56, 56)",
                              color: "white",
                            }}
                            onClick={() => handleDelete(user.id)}
                          >
                            DELETE
                          </Button>
                        ) : (
                          <Button
                            style={{
                              background: "grey",
                              color: "white",
                            }}
                            disabled
                          >
                            DELETE
                          </Button>
                        )}
                      </CardActions>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Users;

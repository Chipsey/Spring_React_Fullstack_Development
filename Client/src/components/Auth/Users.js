import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { fetchUsers } from "../../actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div style={{ marginTop: "200px" }}>
      <Grid container spacing={3}>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}></Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <Grid container spacing={3}>
            {/* {users.map((product) => ( */}
            {/* <Grid item key={product.id} xs={6} sm={4} md={3} lg={3} xl={3}> */}
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                  be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          {/* ))} */}
        </Grid>
      </Grid>
      {/* </Grid> */}
    </div>
  );
};

export default Users;

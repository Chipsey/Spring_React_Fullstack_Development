import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup, signin } from "../../actions/auth";
import { validateSignin, validateSignup } from "../../validation/auth"; // Import the validation functions

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  address: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const userData = useSelector((state) => state.auth.authData);
  const navigate = useNavigate();
  userData && navigate("/");
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [ShowPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [errors, setErrors] = useState({}); // State for validation errors

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [user, navigate]);

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignup((prevMode) => !prevMode);
    setShowPassword(false);
    setErrorMessage(null); // Clear the error message when switching modes
    setErrors({}); // Clear validation errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      const signupErrors = validateSignup(formData);

      if (Object.keys(signupErrors).length === 0) {
        // No validation errors, proceed with sign-up
        dispatch(
          signup(formData, (error) => {
            if (error) {
              setErrorMessage(error.message);
            }
          })
        );
      } else {
        // Validation errors found, set errors object
        setErrors(signupErrors);
      }
    } else {
      // Validate sign-in form data
      const signinErrors = validateSignin(formData);

      if (Object.keys(signinErrors).length === 0) {
        // No validation errors, proceed with sign-in
        dispatch(
          signin(formData, (error) => {
            if (error) {
              setErrorMessage(error.message);
            }
          })
        );
      } else {
        // Validation errors found, set errors object
        setErrors(signinErrors);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      component="main"
      maxWidth="xs"
    >
      <Paper
        sx={{
          padding: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={0}
        style={{ width: "70%" }}
      >
        <Avatar
          sx={{ bgcolor: "secondary.main" }}
          style={{ background: "black" }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          variant="h6"
          sx={{ mt: 1, mb: 2, fontSize: "1rem" }}
          style={{ marginBottom: "30px" }}
        >
          {isSignup ? "Sign Up" : "Sign In"}
        </Typography>
        {errorMessage && (
          <Typography
            variant="body2"
            color="error"
            style={{ marginBottom: "10px" }}
          >
            {errorMessage}
          </Typography>
        )}

        {/* Display validation errors */}
        {Object.keys(errors).length > 0 && (
          <Typography
            variant="body2"
            color="error"
            style={{ marginBottom: "10px" }}
          >
            {Object.values(errors).map((error) => (
              <div key={error}>{error}</div>
            ))}
          </Typography>
        )}

        <form onSubmit={handleSubmit} sx={{ width: "100%", mt: 1 }}>
          <Grid container spacing={1}>
            {isSignup && (
              <>
                <Input
                  name="firstname"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastname"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="address"
                  label="Address"
                  handleChange={handleChange}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={ShowPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            style={{
              background: "black",
              borderRadius: "20px",
              marginTop: "30px",
            }}
            sx={{ mt: 2, mb: 1 }}
          >
            {isSignup ? "Sign Up" : "Sign in"}
          </Button>
          <div></div>
          <Button
            onClick={switchMode}
            sx={{ alignSelf: "flex-end" }}
            style={{ fontSize: "0.7rem", color: "gray" }}
          >
            {isSignup
              ? "Already have an account? Sign In"
              : "Still not Signed Up? Sign Up"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;

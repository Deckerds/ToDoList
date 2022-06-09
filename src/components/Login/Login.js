import React from "react";
import { Field, Form, Formik } from "formik";
import { FormGroup, InputGroup, Input, Card, Button, Row } from "reactstrap";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const [error, setError] = useState(false);

  const formSubmit = (values, { resetForm }) => {
    if (values.username === "admin" && values.password === "admin") {
      sessionStorage.setItem("user_authenticated", "authenticated_token_valid");
      navigate("/homepage");
      resetForm({});
    } else {
      setError(true);
    }
  };

  // password visibility
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  // Visibility click
  const passwordVisibilityChange = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <Row>
      <Card className="shadow cardBorder ">
        <h2 className="d-flex justify-content-center mt-2">User Login</h2>
        <Formik initialValues={initialValues} onSubmit={formSubmit}>
          <Form className="">
            <FormGroup className="mt-2">
              <InputGroup className="input-group-alternative input-perfect-square border border-dark align-items-center">
                <AccountBoxIcon />
                <Field name="username">
                  {(props) => (
                    <Input
                      {...props.field}
                      placeholder="username"
                      type="text"
                      id="username"
                      autoComplete="on"
                      onKeyDown={() => setError(false)}
                    />
                  )}
                </Field>
              </InputGroup>
            </FormGroup>
            <FormGroup className="mt-2">
              <InputGroup className="input-group-alternative input-perfect-square border border-dark align-items-center">
                <VpnKeyIcon />
                <Field name="password">
                  {(props) => (
                    <Input
                      autoComplete="on"
                      {...props.field}
                      placeholder="password"
                      type={passwordVisibility ? "text" : "password"}
                      id="password"
                      onKeyDown={() => setError(false)}
                    />
                  )}
                </Field>
                {!passwordVisibility ? (
                  <VisibilityOffIcon onClick={passwordVisibilityChange} />
                ) : (
                  <VisibilityIcon onClick={passwordVisibilityChange} />
                )}
              </InputGroup>
            </FormGroup>
            {error && <p className="text-danger">Invalid Credentials</p>}
            <div className="d-flex justify-content-center align-items-center mt-2 mb-3">
              <div className="d-flex justify-content-end">
                <Button
                  id="signupButton"
                  className="py-2"
                  outline
                  color="primary"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </div>
          </Form>
        </Formik>
      </Card>
    </Row>
  );
};

export default Login;

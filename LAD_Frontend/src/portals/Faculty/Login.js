import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../AuthTest";

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";

import facultyImage from "../../assets/img/Faculty.png";

class FacultyLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.auth = new AuthService();

    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (this.auth.loggedIn()) this.props.history.replace("/FacultyPortal");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submit(e) {
    e.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    this.auth
      .login("/api/faculty/signin", data)
      .then((res) => {
        this.props.history.replace("/FacultyPortal/d");
      })
      .catch((err) => {
        console.log(err);
        alert("User name or password incorrect");
      });
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1> Faculty Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={this.state.email}
                          id="email"
                          name="email"
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          onChange={this.onChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          value={this.state.password}
                          id="password"
                          name="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={this.onChange}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            onClick={this.submit}
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white py-5 d-md-down-none"
                  style={{ width: "44%", backgroundColor: "#230b4e" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <img src={facultyImage} width="90%" height="178px"></img>
                      <Link to="/">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Back to Main
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default FacultyLogin;

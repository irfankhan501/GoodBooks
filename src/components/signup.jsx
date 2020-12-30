import React from "react";
import Joi from "joi-browser";

import Form from "./common/form";
import user from "../services/userService";
import auth from "../services/authService";
import { Link } from "react-router-dom";

export default class SignUp extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(8).label("Password"),
    name: Joi.string().required().min(2).label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await user.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        console.log(ex.response.data[0]);
        let data = ex.response.data;
        if (data[0] === "U") {
          errors.username = data;
        } else {
          errors.password = data;
        }
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h3>Sign Up</h3>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username", "", "Email address")}
            {this.renderInput("password", "Password", "password", "Password")}
            {this.renderInput("name", "Name", "", "Full name")}
            {this.renderButton("Sign Up")}
            <p className="forgot-password text-right">
              Already registered <Link to="/signin">sign in?</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

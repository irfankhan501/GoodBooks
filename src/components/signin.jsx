//

import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

export default class SignIn extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.password = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h3>Sign In</h3>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username", "", "Email address")}
            {this.renderInput("password", "Password", "password", "Password")}
            {this.renderButton("Sign In")}
            <p className="forgot-password text-right">
              Not register <Link to="signup">Sign In?</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

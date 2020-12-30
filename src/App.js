import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import MyBooks from "./components/myBooks";
import Books from "./components/books";
import Logout from "./components/logout";
import Footer from "./components/footer";
import BookDetails from "./components/bookDetails";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <Router>
        <NavBar user={user} />
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/logout" component={Logout} />
          <Route path="/books/:id" component={BookDetails} />
          <ProtectedRoute path="/mybooks" component={MyBooks} />
          <Route path="/" exact component={Books} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;

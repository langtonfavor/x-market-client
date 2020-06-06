import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import MenuBar from "./components/Menu";
import { AuthProvider } from "./components/context/auth";
import AuthRoute from "./components/context/AuthRoute";
import User from "./components/pages/User";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/user" component={User} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;

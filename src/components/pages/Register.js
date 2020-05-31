import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../context/auth";
import { useForm } from "../../util/hooks";

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    firstName: "",
    password: "",
    contact: "",
    lastName: "",
    email: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/login");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="firstName"
          placeholder="enter name"
          name="firstName"
          type="text"
          value={values.firstName}
          error={errors.firstName ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="lastName"
          placeholder="enter last name"
          name="lastName"
          type="text"
          value={values.lastName}
          error={errors.lastName ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="contact"
          placeholder="enter cell number"
          name="contact"
          type="number"
          value={values.contact}
          error={errors.contact ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="email"
          placeholder="enter email"
          name="email"
          type="text"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="password"
          placeholder="enter password"
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $contact: String!
    $email: String!
    $password: String!
  ) {
    register(
      registerInput: {
        firstName: $firstName
        lastName: $lastName
        contact: $contact
        email: $email
        password: $password
      }
    ) {
      id
      email
      token
    }
  }
`;
export default Register;

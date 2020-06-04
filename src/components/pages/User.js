import React, { useContext } from "react";
import gql from "graphql-tag";
import { Query, useQuery } from "@apollo/react-hooks";
import { AuthProvider } from "../context/auth";
import { AuthContext } from "../context/auth";

function User(props) {
  const context = useContext(AuthContext);
  const userId = context.userId;

  const data = ({ userId } = useQuery(FETCH_USER, {
    variables: {
      userId,
    },
  }));

  console.log(data);

  return <h1>heading</h1>;
}

const FETCH_USER = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
      firstName
      lastName
      contact
      accountBal
    }
  }
`;
export default User;

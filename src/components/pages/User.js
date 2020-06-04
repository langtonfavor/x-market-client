import React, { useContext } from "react";
import gql from "graphql-tag";
import { Query, useQuery } from "@apollo/react-hooks";
import { AuthProvider } from "../context/auth";
import { AuthContext } from "../context/auth";

function User(props) {
  const context = useContext(AuthContext);
  const userId = context.user?.userId;
  console.log('userId: ', userId);

  const { data } = useQuery(FETCH_USER, {
    variables: {
      userId,
    },
    skip: !userId,
  });

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

import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import { Segment } from "semantic-ui-react";
import moment from "moment";

function User(props) {
  const context = useContext(AuthContext);
  const userId = context.user?.userId;
  console.log("userId: ", userId);

  const { data } = useQuery(FETCH_USER, {
    variables: {
      userId,
    },
    skip: !userId,
  });

  console.log(data);
  /* const {
    firstName,
    lastName,
    contact,
    accountBal,
    email,
    createdAt,
  } = data.; */
  return <h1>h</h1>;
}

const FETCH_USER = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
      firstName
      lastName
      contact
      accountBal
      email
    }
  }
`;

export default User;

import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import { Table } from "semantic-ui-react";
import moment from "moment";

import "./User.css";
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
  if (!data) return null;

  const { getUser } = data;

  let postData;

  if (!getUser) {
    postData = <p>loading....</p>;
  } else {
    const {
      firstName,
      lastName,
      contact,
      accountBal,
      email,
      createdAt,
    } = getUser;
    return (
      <React.Fragment>
        <h3>Your User Information below</h3>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Contact</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Your Account Balance</Table.HeaderCell>
              <Table.HeaderCell>you joinned Us:</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>{firstName}</Table.Cell>
              <Table.Cell>{lastName}</Table.Cell>
              <Table.Cell>{contact}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
              <Table.Cell>{accountBal}</Table.Cell>
              <Table.Cell>{moment(createdAt).fromNow()}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}
const FETCH_USER = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
      firstName
      lastName
      contact
      accountBal
      email
      createdAt
    }
  }
`;

export default User;

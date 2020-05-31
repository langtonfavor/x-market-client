import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid, Image } from "semantic-ui-react";

import UserCard from "../../components/pages/UserCard";

function User() {
  const {
    loading,
    data: { getUsers: users },
  } = useQuery(FETCH_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1>user</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>loading</h1>
        ) : (
          users &&
          users.map((user) => (
            <Grid.Column key={user.id}>
              <UserCard user={user} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_QUERY = gql`
  {
    getUsers {
      id
      firstName
      lastName
      contact
      accountBal
    }
  }
`;
export default User;

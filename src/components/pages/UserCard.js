import React from "react";
import { Card, Label, Icon, Image } from "semantic-ui-react";
import moment from "moment";

function UserCard({
  user: { id, createdAt, firstName, lastName, accountBal, contact },
}) {
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="/images/avatar/large/molly.png"
        />
        <Card.Header>{firstName}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}}</Card.Meta>
        <Card.Description>{accountBal}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>{lastName}</p>
      </Card.Content>
    </Card>
  );
}

export default UserCard;

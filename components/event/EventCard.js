import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({
  description, //
  date,
  time,
  user,
}) => (
  <Card className="text-center">
    <Card.Header>Date: {date}</Card.Header>
    <Card.Body>
      <Card.Title>{description}</Card.Title>
      <Card.Text>Time: {time}</Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">Organizer Details: {user}</Card.Footer>
  </Card>
);

EventCard.propTypes = {
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default EventCard;

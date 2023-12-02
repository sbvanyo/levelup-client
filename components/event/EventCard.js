import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const EventCard = ({
  id,
  description,
  date,
  time,
  game,
  user,
}) => {
  const router = useRouter();

  return (
    <Card className="text-center">
      <Card.Header>Date: {date}</Card.Header>
      <Card.Body>
        <Card.Title>{description}</Card.Title>
        <Card.Text>Game: {game}</Card.Text>
        <Card.Text>Time: {time}</Card.Text>
        <Button
          onClick={() => {
            router.push(`/events/${id}`);
          }}
        >
          Update
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Organizer Details: {user}</Card.Footer>
    </Card>
  );
};

EventCard.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  id: PropTypes.number,
};

export default EventCard;

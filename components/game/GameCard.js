import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const GameCard = ({
  id,
  title, //
  maker,
  numberOfPlayers,
  skillLevel,
  gameType,
}) => {
  const router = useRouter();

  return (
    <Card className="text-center">
      <Card.Header>By: {maker}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Category: {gameType}</Card.Text>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
        <Button
          onClick={() => {
            router.push(`/games/${id}`);
          }}
        >
          Update
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
    </Card>
  );
};

GameCard.propTypes = {
  id: PropTypes.number,
  gameType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
};

GameCard.defaultProps = {
  id: PropTypes.number,
};

export default GameCard;

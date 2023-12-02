import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent, updateEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';

const initialState = {
  gameId: 0,
  description: '',
  date: 'YYYY-MM-DD',
  time: '00:00:00',
};

const EventForm = ({ initialEvent, user }) => {
  const router = useRouter();
  const [games, setGames] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentEvent, setCurrentEvent] = useState(initialState);

  useEffect(() => {
    console.warn(initialEvent);
    console.warn(currentEvent);
    // TODO: Get the game types, then set the state
    getGames().then(setGames);

    if (initialEvent) {
      const formattedEvent = {
        ...initialEvent,
        gameId: initialEvent.game ? initialEvent.game.id : 0,
      };
      setCurrentEvent(formattedEvent);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialEvent]);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const event = {
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      game: Number(currentEvent.gameId),
      organizer: user.id,
    };

    // Send POST request to your API
    if (initialEvent) {
      updateEvent(currentEvent.id, event).then(() => router.push('/events'));
    } else {
      createEvent(event).then(() => router.push('/events'));
    }

    console.warn(event);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            required
            value={currentEvent.description}
            onChange={handleChange}
          />
        </Form.Group>

        {/* TODO: create the rest of the input fields */}

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            name="date"
            required
            value={currentEvent.date}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            name="time"
            required
            value={currentEvent.time}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Game</Form.Label>
          <Form.Select
            name="gameId"
            required
            value={currentEvent.gameId}
            onChange={handleChange}
          >
            <option value="">Select Game</option>
            {
              games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.title}
                </option>
              ))
            }
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  initialEvent: PropTypes.shape({
    gameId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    game: PropTypes.object.isRequired,
  }).isRequired,
};

export default EventForm;

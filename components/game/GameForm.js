import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};

// initialGame is a prop passed in from games/[id].js
const GameForm = ({ initialGame, user }) => {
  const router = useRouter();
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);

  useEffect(() => {
    console.warn(initialGame);
    console.warn(currentGame);
    // TODO: Get the game types, then set the state
    getGameTypes().then(setGameTypes);

    if (initialGame) {
      const formattedGame = {
        ...initialGame,
        gameTypeId: initialGame.gameType,
      };
      setCurrentGame(formattedGame);
    }
  }, [initialGame]);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: Number(currentGame.numberOfPlayers),
      skillLevel: Number(currentGame.skillLevel),
      gameType: Number(currentGame.gameTypeId),
      userId: user.uid,
    };

    // Send POST request to your API
    if (initialGame) {
      updateGame(currentGame.id, game).then(() => router.push('/games'));
    } else {
      createGame(game).then(() => router.push('/games'));
    }
    console.warn(game);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            required
            value={currentGame.title}
            onChange={handleChange}
          />
        </Form.Group>

        {/* TODO: create the rest of the input fields */}

        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control
            name="maker"
            required
            value={currentGame.maker}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Players</Form.Label>
          <Form.Control
            name="numberOfPlayers"
            required
            // type="number"
            value={Number(currentGame.numberOfPlayers)}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control
            name="skillLevel"
            required
            value={Number(currentGame.skillLevel)}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Game Type</Form.Label>
          <Form.Select
            name="gameTypeId"
            value={currentGame.gameTypeId.id}
            required
            onChange={handleChange}
          >
            <option value="">Select Game Type</option>
            {
              gameTypes.map((gameType) => (
                <option key={gameType.id} value={gameType.id}>
                  {gameType.label}
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

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  initialGame: PropTypes.shape({
    title: PropTypes.string.isRequired,
    maker: PropTypes.string.isRequired,
    numberOfPlayers: PropTypes.number.isRequired,
    skillLevel: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    gameType: PropTypes.number.isRequired,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};

// GameForm.defaultProps = {
//   initialGame: initialState,
// };

export default GameForm;

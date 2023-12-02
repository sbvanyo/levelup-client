import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GameForm from '../../components/game/GameForm';
import { useAuth } from '../../utils/context/authContext';
import { getSingleGame } from '../../utils/data/gameData';

const UpdateGame = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [updateGame, setUpdateGame] = useState();

  useEffect(() => {
    getSingleGame(id).then(setUpdateGame);
  }, [id]);

  return (
    <div>
      <h2>Update Game</h2>
      <GameForm
        user={user}
        initialGame={updateGame}
      />
    </div>
  );
};

export default UpdateGame;

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EventForm from '../../components/event/EventForm';
import { useAuth } from '../../utils/context/authContext';
import { getSingleEvent } from '../../utils/data/eventData';

const UpdateEvent = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [updateEvent, setUpdateEvent] = useState();

  useEffect(() => {
    getSingleEvent(id).then(setUpdateEvent);
  }, [id]);

  return (
    <div>
      <h2>Update Event</h2>
      <EventForm
        user={user}
        initialEvent={updateEvent}
      />
    </div>
  );
};

export default UpdateEvent;

import React, { useEffect, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import EventCard from '../../components/event/EventCard';
import { getEvents, leaveEvent, joinEvent } from '../../utils/data/eventData';

function Home() {
  const [events, setEvents] = useState([]);
  const [refreshEvents, setRefreshEvents] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getEvents(user.uid).then((data) => setEvents(data));
    // Reset the refresh trigger
    setRefreshEvents(false);
  }, [user.uid, refreshEvents]); // Add refreshEvents as a dependency

  const updateCards = useCallback(() => {
    setRefreshEvents(true); // Set refreshEvents to true to trigger the useEffect
  }, []);

  const leaveEventFunc = useCallback((eventId, userId) => {
    leaveEvent(eventId, userId).then(() => updateCards());
  }, [updateCards]);

  const joinEventFunc = useCallback((eventId, userId) => {
    joinEvent(eventId, userId).then(() => updateCards());
  }, [updateCards]);

  return (
    <>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Event
      </Button>

      <article className="events">
        <h1>Events</h1>
        {events.map((event) => (
          <section key={`event--${event.id}`} className="event">
            <EventCard
              description={event.description}
              date={event.date}
              time={event.time}
              user={event.organizer.bio}
              id={event.id}
              game={event.game.title}
              onUpdate={updateCards}
            />
            {event.joined
              ? <Button onClick={() => leaveEventFunc(event.id, user.uid)}>Leave Event</Button>
              : <Button onClick={() => joinEventFunc(event.id, user.uid)}>Join Event</Button>}
          </section>
        ))}
      </article>

    </>
  );
}

export default Home;

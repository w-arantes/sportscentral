import { GetStaticProps } from 'next';

import { PLATFORM_SETTINGS } from '@/infra/config';
import { EventEntity } from '@/domain/models';
import { getAllEvents } from '@/domain/usecases/events';

import { PageLayout } from '@/layout';

interface EventsProps {
  events: EventEntity[];
}

export default function Events({ events }: EventsProps) {
  return (
    <PageLayout title="Events | SportsCentral">
      <h1>All Events Page</h1>

      {events &&
        events.map((event: EventEntity) => {
          return (
            <div key={event.id}>
              <p>{event.title}</p>
            </div>
          );
        })}
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const events: EventEntity[] = await getAllEvents();

  return {
    props: {
      events
    },
    revalidate: PLATFORM_SETTINGS.ssr.pages.EVENTS_REVALIDATION
  };
};

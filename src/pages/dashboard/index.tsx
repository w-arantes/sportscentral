import { useState } from 'react';
import { PageLayout, Section } from '@/layout';
import { CategoryCard } from '@/components/Categories';
import { EventCard } from '@/components/Event';

import { CategoryEntity, EventEntity } from '@/entities';

import { events, categories } from '@/mock';

export default function Dashboard() {
  const [isFetchingData] = useState<boolean>(false);

  return (
    <PageLayout title="Dashboard | SportsCentral" mt="1rem">
      <Section title="Following" isLoading={isFetchingData}>
        {events &&
          events.map((event: EventEntity) => {
            return (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                category={event.category}
                date={event.date}
                location={event.location}
                followers={event.followers}
              />
            );
          })}
      </Section>
      <Section title="Events" isLoading={isFetchingData}>
        {events &&
          events.map((event: EventEntity) => {
            return (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                category={event.category}
                date={event.date}
                location={event.location}
                followers={event.followers}
              />
            );
          })}
      </Section>
      <Section title="Categories" isLoadingCategories={isFetchingData}>
        {categories &&
          categories.map((category: CategoryEntity) => {
            return (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
              />
            );
          })}
      </Section>
    </PageLayout>
  );
}

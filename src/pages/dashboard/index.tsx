import { PageLayout, Section } from '@/layout';
import { CategoryCard } from '@/components/Categories';
import { EventCard } from '@/components/EventCard';

import { CategoryProps, EventProps } from '@/entities';
import { events, categories } from '@/mock';

export default function Dashboard() {
  return (
    <PageLayout title="Dashboard" mt="1rem">
      <Section title="Following" isLoading={!events}>
        {events &&
          events.map((event: EventProps) => {
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
      <Section title="Events" isLoading={!events}>
        {events &&
          events.map((event: EventProps) => {
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
      <Section title="Categories" isLoadingCategories={!categories}>
        {categories &&
          categories.map((category: CategoryProps) => {
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

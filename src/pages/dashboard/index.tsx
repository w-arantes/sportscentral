import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { PageLayout, Section } from '@/layout';
import { CategoryCard } from '@/components/Categories';
import { EventCard } from '@/components/Event';
import { CategoryEntity, EventEntity } from '@/entities';
import { useAuth } from '@/contexts';

import { events, categories } from '@/mock';

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const { push } = useRouter();

  const [isFetchingData] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated) {
      push('/login');
    }
  }, [isAuthenticated]);

  return (
    <PageLayout title="Dashboard | SportsCentral">
      <Section title="Following" isLoading={isFetchingData}>
        {events &&
          events.map((event: EventEntity) => {
            return (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                category={event.category}
                startDate={event.startDate}
                endDate={event.endDate}
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
                startDate={event.startDate}
                endDate={event.endDate}
                location={event.location}
                followers={event.followers}
              />
            );
          })}
      </Section>
      <Section
        title="Categories"
        isLoadingCategories={isFetchingData}
        height="250px"
      >
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

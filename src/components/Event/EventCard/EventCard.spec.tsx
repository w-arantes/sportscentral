import React from 'react';
import { EventEntity } from '@/domain/models';

import { EventCard } from '@/components/Event';

const MOCK_EVENT: EventEntity = {
  id: 'e22f1bde-8ab2-449f-8351-76eb9b8aae0a',
  title: 'Borussia Dortmund x Eintracht Frankfurt',
  description:
    'Borussia Dortmund will face off against Eintracht Frankfurt in a highly anticipated football match taking place at the Deutsche Bank Park in Frankfurt, Germany on May 12th, 2023. The game is expected to draw a large crowd of avid football fans from both teams and around the world. With both teams having a strong record, this game is sure to be a thrilling and intense experience for all in attendance.',
  category: 'football',
  startDate: '2023-05-12T20:30:00.000Z',
  endDate: '2023-05-12T22:30:00.000Z',
  location: 'Deutsche Bank Park - Frankfurt, Germany',
  followers: []
};

describe('<EventCard />', () => {
  beforeEach(() => {
    cy.mount(
      <EventCard
        id={MOCK_EVENT.id}
        title={MOCK_EVENT.title}
        category={MOCK_EVENT.category}
        startDate={MOCK_EVENT.startDate}
        endDate={MOCK_EVENT.endDate}
        followers={MOCK_EVENT.followers}
        location={MOCK_EVENT.location}
      />
    );
  });

  it('displays the correct information and image', () => {
    cy.get('[data-cy="EventImage"]');
    cy.get('[data-cy="EventTitle"]').should('contain', MOCK_EVENT.title);
    cy.get('[data-cy="EventLocation"]').should('contain', MOCK_EVENT.location);
  });
});

describe('Test Event page', () => {
  beforeEach(() => {
    cy.visit(
      'http://localhost:3000/event/e22f1bde-8ab2-449f-8351-76eb9b8aae0a'
    );
  });

  it('displays the event info', () => {
    cy.get('[data-cy="EventInfo"]').should('exist');
    cy.get('[data-cy="EventTitle"]').should('exist');
    cy.get('[data-cy="EventDate"]');
    cy.get('[data-cy="EventCategory"]').should('exist');
    cy.get('[data-cy="EventLocation"]').should('exist');
  });

  it('displays the event image', () => {
    cy.get('[data-cy="EventImage"]').should('exist');
  });

  it('Displays the Follow Button for non-authenticated users', () => {
    cy.get('[data-cy="FollowEventButton"]').should('exist');
    cy.get('[data-cy="FollowEventButton"]').should(
      'have.text',
      'SIGN-IN TO FOLLOW EVENT'
    );
  });

  it('displays the event followers', () => {
    cy.get('[data-cy="FollowEventButton"]').should('exist');
  });
});

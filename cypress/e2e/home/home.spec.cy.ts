describe('Test the Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('renders', () => {
    cy.get('[data-cy="LandingPage"]').should('exist');
  });

  it('displays HeroBanner', () => {
    cy.get('[data-cy="HeroBanner"]').should('exist');
  });

  it('displays CategoriesSection and CategoryCards', () => {
    cy.get('[data-cy="CategoriesSection"]').should('exist');
    cy.get('[data-cy="CategoryCard"]').should('exist');
  });

  it('displays EventsSection and EventCards', () => {
    cy.get('[data-cy="EventsSection"]').should('exist');
    cy.get('[data-cy="EventCard"]').should('exist');
  });
});

const MOCK_CREDENTIALS = {
  email: 'w.arantes@sportscentral.com',
  password: 'sportscentral'
};

it('Render the Sign-in page', () => {
  cy.visit('http://localhost:3000/sign-in');

  cy.get('input[name="email"]').type(MOCK_CREDENTIALS.email);
  cy.get('input[name="password"]').type(MOCK_CREDENTIALS.password);
});

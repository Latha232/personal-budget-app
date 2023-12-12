import '@applitools/eyes-cypress/commands';

Cypress.Commands.add('eyesOpen', (Mybudgetapp, e2etest) => {
  cy.eyesOpen({
    Mybudgetapp,
    e2etest,
  });
});

Cypress.Commands.add('eyesCheckWindow', () => {
  cy.eyesCheckWindow();
});
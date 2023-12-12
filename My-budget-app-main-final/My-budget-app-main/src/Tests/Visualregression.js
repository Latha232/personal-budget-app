describe('Visual Regression Test', () => {
    it('should display the page correctly', () => {
      cy.eyesOpen('My budget app', 'Visual regression');
      cy.visit('/');
      cy.eyesCheckWindow();
      cy.eyesClose();
    });
  });
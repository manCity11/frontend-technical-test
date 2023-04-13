export default function setViewport() {
  Cypress.Commands.add('setViewport', (viewport) => {
    _.isArray(viewport) && cy.viewport(viewport[0], viewport[1]) || cy.viewport(viewport);
  });
}

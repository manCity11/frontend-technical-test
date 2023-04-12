import doubleRun from 'e2e/double-run';
import { getRoute } from 'e2e/routes';

doubleRun((viewport, viewportKey) => {
  describe('Messaging: Conversation select', () => {
    beforeEach(() => {
      cy.setViewport(viewport);
      getRoute({ name: 'getUsers' }).as('users');
      getRoute({ name: 'getConversations' }).as('conversations');
    });

    it('should display conversations', () => {
      cy.visit('/')
        .wait(['@users', '@conversations'])
        .get('.funnels-layout__title')
        .compareSnapshot(`conversations-list-${viewportKey}`);
    });
  });
});

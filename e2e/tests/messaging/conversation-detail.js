import doubleRun from 'e2e/double-run';
import { getRoute } from 'e2e/routes';
import { Conversation } from 'models/conversations/conversation.model';

doubleRun((viewport, viewportKey) => {
  describe('Messaging: Conversation detail', () => {
    beforeEach(() => {
      cy.setViewport(viewport);
      getRoute({ name: 'getUsers' }).as('users');
      getRoute({ name: 'getConversations' }).as('conversations');
      getRoute({
        name: 'getMessages',
        data: [
          new Conversation({ id: 1, conversationId: 1, authorId: 1, body: 'Bonjour c\'est le premier message de la première conversation'}),
          new Conversation({ id: 2, conversationId: 1, authorId: 2, body: 'Bonjour c\'est le troisième message de la première conversation'}),
        ],
      }).as('messages');
    });

    it('should display messages', () => {
      cy.visit('/')
        .wait(['@users', '@conversations'])
        .get('.funnels-layout__title')
        .get('input[name="conversation"]')
        .eq(0)
        .click()
        .get('button')
        .eq(1)
        .click()
        .wait('@messages')
        .get('.funnels-layout__title')
        .compareSnapshot(`messages-list-${viewportKey}`);
    });
  });
});

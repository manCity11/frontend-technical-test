import React from 'react';
import { reverse } from 'named-urls';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConversationsSelectPage } from './conversations-select.page';
import { UserContext } from '../../../commons/users/user-provider.component';
import { ConversationsService } from '../../../commons/conversations/conversations.service';

import { MESSAGING_STATES } from '../route-path';
import { ERROR_TYPES }  from '../messaging.constants';

jest.mock('../../../commons/conversations/conversations.service', () => ({
  ConversationsService:{
    getConversations: jest.fn(),
    createConversations: jest.fn(),
    deleteConversation: jest.fn(),
  },
}));

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom')),
  useNavigate: () => mockedNavigate,
}));

describe('ConversationsSelectPage', () => {
  test('should fetch conversation', (done) => {
    // @ts-ignore
    ConversationsService.getConversations.mockResolvedValue([{
      id: 1,
      senderId: 1,
      senderNickname: 'Dummy',
      recipientId: 2,
      recipientNickname: 'Test',
      lastMessageTimestamp: Date.now(),
    }]);

    render(
      <UserContext.Provider value={{ userContext: { id: 1, nickname: '', token: 'xx' } }}>
        <BrowserRouter>
          <ConversationsSelectPage />
        </BrowserRouter>
      </UserContext.Provider>
    );

    waitFor(() => {
      expect(ConversationsService.getConversations).toBeCalled();
      done();
    });
  });

  test('should redirect to error page', (done) => {
    // @ts-ignore
    ConversationsService.getConversations.mockRejectedValue();

    render(
      <UserContext.Provider value={{ userContext: { id: 1, nickname: '', token: 'xx' } }}>
        <BrowserRouter>
          <ConversationsSelectPage />
        </BrowserRouter>
      </UserContext.Provider>
    );

    waitFor(() => {
      expect(mockedNavigate).toBeCalledWith(reverse(MESSAGING_STATES.ERROR, { reason: ERROR_TYPES.CANT_GET_CONVERSATIONS }));
      done();
    });
  });

  test('should select conversation', (done) => {
    // @ts-ignore
    ConversationsService.getConversations.mockResolvedValue([{
      id: 1,
      senderId: 1,
      senderNickname: 'Dummy',
      recipientId: 2,
      recipientNickname: 'Test',
      lastMessageTimestamp: Date.now(),
    }]);

    render(
      <UserContext.Provider value={{ userContext: { id: 1, nickname: '', token: 'xx' } }}>
        <BrowserRouter>
          <ConversationsSelectPage />
        </BrowserRouter>
      </UserContext.Provider>
    );

    waitFor(() => {
      const selectConversation = screen.getByLabelText('conversation');
      fireEvent.click(selectConversation, { target: { value: 1 } });
      expect(selectConversation).toBeInTheDocument();
      done();
    });
  });

  test('should redirect to next page', (done) => {
    const recipientId = 2;
    // @ts-ignore
    ConversationsService.getConversations.mockResolvedValue([{
      id: 1,
      senderId: 1,
      senderNickname: 'Dummy',
      recipientId,
      recipientNickname: 'Test',
      lastMessageTimestamp: Date.now(),
    }]);

    render(
      <UserContext.Provider value={{ userContext: { id: 1, nickname: '', token: 'xx' } }}>
        <BrowserRouter>
          <ConversationsSelectPage />
        </BrowserRouter>
      </UserContext.Provider>
    );

    waitFor(() => {
      const selectConversation = screen.getByLabelText('conversation');
      const redirectButton = screen.getAllByRole('button')[1];
      fireEvent.click(selectConversation, { target: { value: 1 } });
      fireEvent.click(redirectButton);
      expect(mockedNavigate).toBeCalledWith(reverse(MESSAGING_STATES.DETAIL, { conversationId: 1, recipientId }));
      done();
    });
  });

  test('should call conversation delete api', (done) => {
    // @ts-ignore
    ConversationsService.getConversations.mockResolvedValue([{
      id: 1,
      senderId: 1,
      senderNickname: 'Dummy',
      recipientId: 2,
      recipientNickname: 'Test',
      lastMessageTimestamp: Date.now(),
    }]);
    // @ts-ignore
    ConversationsService.deleteConversation.mockResolvedValue();

    render(
      <UserContext.Provider value={{ userContext: { id: 1, nickname: '', token: 'xx' } }}>
        <BrowserRouter>
          <ConversationsSelectPage />
        </BrowserRouter>
      </UserContext.Provider>
    );

    waitFor(() => {
      const selectConversation = screen.getByLabelText('conversation');
      const deleteButton = screen.getAllByRole('button')[0];
      fireEvent.click(selectConversation, { target: { value: 1 } });
      fireEvent.click(deleteButton);
      expect(ConversationsService.deleteConversation).toBeCalledWith(1);
      done();
    });
  });
});

import React from 'react';
import { reverse } from 'named-urls';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MESSAGING_STATES } from '../route-path';
import { ERROR_TYPES } from '../messaging.constants';
import { ConversationDetailPage } from './conversation-detail.page';
import { UserContext } from '../../../commons/users/user-provider.component';
import { MessagesService } from '../../../commons/messages/messages.service';

jest.mock('../../../commons/messages/messages.service', () => ({
  MessagesService:{
    getMessages: jest.fn(),
    sendMessage: jest.fn(),
    deleteMessage: jest.fn(),
  },
}));

const conversationId = 1;
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom')),
  useNavigate: () => mockedNavigate,
  useParams: () => ({ conversationId }),
}));

describe('ConversationsSelectPage', () => {
  test('should fetch message', (done) => {
    // @ts-ignore
    MessagesService.getMessages.mockResolvedValue(({
      id: 1,
      conversationId: 1,
      authorId: 1,
      timestamp: Date.now(),
      body: 'dummy content',
    }));

    render(
      <UserContext.Provider value={{ userContext: { id: 1, nickname: '', token: 'xx' } }}>
        <BrowserRouter>
          <ConversationDetailPage />
        </BrowserRouter>
      </UserContext.Provider>
    );

    waitFor(() => {
      expect(MessagesService.getMessages).toBeCalledWith(conversationId);
      done();
    });
  });

  test('should redirect to error page if cannot fetch', (done) => {
    // @ts-ignore
    MessagesService.getMessages.mockRejectedValue();

    render(
      <UserContext.Provider value={{ userContext: { id: 1, nickname: '', token: 'xx' } }}>
        <BrowserRouter>
          <ConversationDetailPage />
        </BrowserRouter>
      </UserContext.Provider>
    );

    waitFor(() => {
      expect(mockedNavigate).toBeCalledWith(reverse(MESSAGING_STATES.ERROR, { reason: ERROR_TYPES.CANT_GET_MESSAGES }));
      done();
    });
  });

  test('should send message to the api', (done) => {
    const message = 'this is a text';
    // @ts-ignore
    MessagesService.getMessages.mockResolvedValue(({
      id: 1,
      conversationId: 1,
      authorId: 1,
      timestamp: Date.now(),
      body: 'dummy content',
    }));

    // @ts-ignore
    MessagesService.sendMessage.mockResolvedValue();

    render(
      <UserContext.Provider value={{ userContext: { id: 1, nickname: '', token: 'xx' } }}>
        <BrowserRouter>
          <ConversationDetailPage />
        </BrowserRouter>
      </UserContext.Provider>
    );

    waitFor(() => {
      const input = screen.getAllByLabelText(/message/)[0];
      const submit = screen.getAllByLabelText(/send/)[0];
      fireEvent.change(input, { target: { value: message } });
      fireEvent.submit(submit);

      expect(MessagesService.sendMessage).toBeCalled();
      done();
    });
  });
});

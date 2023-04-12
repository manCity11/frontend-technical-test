import { reverse } from 'named-urls';
import classNames  from 'classnames';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LocalesService } from '../../../commons/locales/locales.service';
import { Trans } from '../../../commons/locales/trans.component';
import { Spinner } from '../../../commons/ui-kit/spinner/spinner.component';
import { MessagesService } from '../../../commons/messages/messages.service';
import { withUserContext } from '../../../commons/users/user-provider.component';
import { Message } from '../../../commons/messages/types';
import { MESSAGING_STATES } from '../route-path';
import { ERROR_TYPES }  from '../messaging.constants';

import './conversation-detail.scss';

const ConversationDetail = ({ userContext }) => {
  const history = useNavigate();
  const i18n = LocalesService.getI18n();
  const sendWording = i18n.get('globals.send');
  const { conversationId, recipientId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    MessagesService.getMessages(conversationId)
      .then((rMessages) => {
        setMessages(rMessages as never[]);
        setIsLoading(false);
      })
      .catch(() => {
        history(reverse(MESSAGING_STATES.ERROR, { reason: ERROR_TYPES.CANT_GET_MESSAGES }));
      });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    MessagesService
      .sendMessage(conversationId, { body: _.get(event, 'target[0].value'), recipientId: parseInt(recipientId, 10) })
      .then(() => MessagesService.getMessages(conversationId))
      .then((rMessages) => {
        setMessages(rMessages as never[]);
      })
      .catch(() => {
        history(reverse(MESSAGING_STATES.ERROR, { reason: ERROR_TYPES.CANT_SEND_MESSAGE }));
      });
  };

  return isLoading ? <Spinner /> : (
    <div className="conversation-detail">
      <h1 className="funnels-layout__title"><Trans id="messaging.conversationDetail.title" /></h1>
      <h2 className="funnels-layout__subtitle"><Trans id="messaging.conversationDetail.subtitle" /></h2>

      <form className="messages-form" onSubmit={onSubmit}>
        <div className="messages__container">
          {
            _.map(messages, (message, index) => (
              <div key={index} className={classNames('message', { me: (message as Message)?.authorId === userContext?.id, other: (message as Message)?.authorId !== userContext?.id })}>
                {(message as Message).body}
              </div>
            ))
          }
        </div>
        <div className="messages-form__submit">
          <input className="messages-form__input" type="text" aria-label="message" />
          <input className="funnels-layout__button primary" aria-label="send" type="submit" value={sendWording?.replace(/^./, sendWording[0]?.toUpperCase())} />
        </div>
      </form>
    </div>
  );
};

export const ConversationDetailPage = withUserContext(ConversationDetail);

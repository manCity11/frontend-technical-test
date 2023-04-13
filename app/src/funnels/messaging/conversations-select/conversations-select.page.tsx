import dayjs from 'dayjs';
import { reverse } from 'named-urls';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trans } from '../../../commons/locales/trans.component';
import { withUserContext } from '../../../commons/users/user-provider.component';
import { Spinner } from '../../../commons/ui-kit/spinner/spinner.component';
import { ConversationsService } from '../../../commons/conversations/conversations.service';
import { Conversation } from '../../../commons/conversations/models/conversation.model';
import { ERROR_TYPES }  from '../messaging.constants';
import { MESSAGING_STATES } from '../route-path';

import './conversations-select.scss';

const ConversationsSelect = ({ userContext }) => {
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState();
  
  useEffect(() => {
    userContext && ConversationsService.getConversations(userContext.id)
      .then((rConversations) => {
        setConversations(rConversations as any);
        setIsLoading(false);
      })
      .catch(() => {
        history(reverse(MESSAGING_STATES.ERROR, { reason: ERROR_TYPES.CANT_GET_CONVERSATIONS }));
      });
  }, [userContext]);

  const onSelect = (event) => {
    const foundConversation = _.find(conversations, { id: parseInt(event.target.value, 10) });
    foundConversation && setSelectedConversation(foundConversation as any);
  };

  const onDelete = () => {
    ConversationsService
      .deleteConversation((selectedConversation as any)?.id)
      .then(() => ConversationsService.getConversations(userContext.id))
      .then((rConversations) => setConversations(rConversations as any))
      .catch(() => {
        history(reverse(MESSAGING_STATES.ERROR, { reason: ERROR_TYPES.CANT_DELETE_CONVERSATION }));
      });
  };

  const goToDetail = () => {
    selectedConversation && history(
      reverse(
        MESSAGING_STATES.DETAIL,
        { recipientId: _.get(selectedConversation, 'recipientId'), conversationId: _.get(selectedConversation, 'id') },
      ),
    );
  };

  return isLoading ? <Spinner /> : (
    <div className="conversations-select">
      <h1 className="funnels-layout__title"><Trans id="messaging.conversationSelect.title" /></h1>
      <h2 className="funnels-layout__subtitle"><Trans id="messaging.conversationSelect.subtitle" /></h2>
      <div className="conversations-select__notifications-container">
        <div className="conversations-select__notifications_description">
          <Trans id="messaging.conversationSelect.nbMessages" values={{ NB_CONVERSATIONS: conversations.length }} />
        </div>
        <div className="conversations-select__notifications_icons-container">
          <button role="button" className="funnels-layout__button primary" onClick={onDelete}><Trans id="globals.delete" /></button>
          <button role="button" className="funnels-layout__button" onClick={goToDetail}><Trans id="globals.see" /></button>
        </div>
      </div>
      <fieldset className="conversations-container" onChange={onSelect}>
        {
          _.map(conversations, (conversation, index) => (
            <div key={index} className="conversation">
              <input type="radio" id="conversation" aria-label="conversation" name="conversation" value={(conversation as Conversation)?.id} checked={_.get(conversation, 'id') === _.get(selectedConversation, 'id')} />
              <label htmlFor="conversation" className="conversation__input-label">
                <div className="conversation__sender">{(conversation as Conversation)?.recipientNickname}</div>
                <div className="conversation__date">{dayjs((conversation as Conversation)?.displayedLastMessageTimestamp).format('DD/MM/YYYY')}</div>
              </label>
            </div>
          ))
        }
      </fieldset>
    </div>
  );
};

export const ConversationsSelectPage = withUserContext(ConversationsSelect);

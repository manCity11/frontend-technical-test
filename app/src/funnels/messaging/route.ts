/* istanbul ignore file */
import { MESSAGING_PATHS } from './route-path';

import { ErrorPage } from './error.page';
import { ConversationsSelectPage } from './conversations-select/conversations-select.page';
import { ConversationDetailPage } from './conversation-detail/conversation-detail.page';

export const MESSAGING_ROUTES = [
  {
    path: MESSAGING_PATHS.ENTRY,
    component: ConversationsSelectPage,
    exact: true,
  },
  {
    path: MESSAGING_PATHS.DETAIL,
    component: ConversationDetailPage,
  },
  {
    path: MESSAGING_PATHS.ERROR,
    component: ErrorPage,
  }
];
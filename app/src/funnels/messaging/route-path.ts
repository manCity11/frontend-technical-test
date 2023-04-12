/* istanbul ignore file */
export const PREFIX = '/';

export const MESSAGING_PATHS = {
  ENTRY: '/',
  ERROR: '/error/:reason',
  DETAIL: '/detail/:recipientId/:conversationId',
};

export const MESSAGING_STATES = {
  ENTRY: PREFIX,
  ERROR: MESSAGING_PATHS.ERROR,
  DETAIL: MESSAGING_PATHS.DETAIL,
};

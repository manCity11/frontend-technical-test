/* istanbul ignore file */
import React from 'react';
import { User } from './types';

export const UserContext = React.createContext({ userContext: {} as User | undefined });

export const withUserContext = (Component: any) => (props: any) => (
  <UserContext.Consumer>{(contexts) => <Component {...props} {...contexts} />}</UserContext.Consumer>
);

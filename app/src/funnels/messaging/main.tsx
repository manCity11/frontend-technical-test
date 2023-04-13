/* istanbul ignore file */
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { MESSAGING_ROUTES } from './route';
import { Trans } from '../../commons/locales/trans.component';
import { UsersService } from '../../commons/users/users.service';
import { UserContext } from '../../commons/users/user-provider.component';

import './messaging.scss';
import './locales/locales-fr.i18n';

export function MainTemplate() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    UsersService.getUsers()
    .then((rUsers) => {
      setUsers(rUsers);
      setSelectedUser(rUsers[0]);
    }).catch(() => {
      // do nothing
    });
  }, []);

  const onSelect = (event) => {
    const selectedId = parseInt(event?.target?.value, 10);
    const foundUser = _.find(users, ({ id }) => id === selectedId);
    foundUser && setSelectedUser(foundUser);
  };

  return (
    <div className="funnels-layout messaging">
      <div className="messaging__user-select-container">
        <div className="messaging__user-select-container-content">
          <span className="messaging__user-title"><Trans id="globals.user" />:&nbsp;</span>
          <select onChange={onSelect}>
            {
              _.map(users, ({ id, nickname }, index) => (
                <option key={index} value={id}>{nickname}</option>
              ))
            }
          </select>
        </div>
      </div>
      <div className="funnels-layout__container">
        <UserContext.Provider value={{ userContext: selectedUser }}>
          <Routes>
            {
              MESSAGING_ROUTES.map(({ path, component: Component, exact }) => <Route path={path} element={<Component />} exact={exact} key={path} />)
            }
          </Routes>
        </UserContext.Provider>
      </div>
    </div>
  );
}

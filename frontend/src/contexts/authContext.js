import React from 'react';

export const AuthContext = React.createContext({
  username: null,
  setUsername: () => { },
});
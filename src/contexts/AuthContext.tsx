import React from 'react';


const defaultAuthContext = {
  login: (_: { email: string, password: string }) => {},
  logout: () => {},
  register: (_: { email: string, password: string }) => {},
}

const AuthContext = React.createContext(defaultAuthContext);

export default AuthContext;

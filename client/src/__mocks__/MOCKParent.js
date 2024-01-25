import React, { createContext } from "react";

// NOTE for jest mocking to work and access these out-of-scope variables. Variable names must be prefixed with "mock"

const MockUserContext = createContext();

const userData = {
    id: 1,
    first_name: "George",
    last_name: "Washington",
    username: "gwash"
  };

const MockUserContextProvider = ({ children }) => (
  <MockUserContext.Provider
    value={{
      userData
    }}
  >
    {children}
  </MockUserContext.Provider>
);

const MockUserContextConsumer = (Child) => (props) => (
  <MockUserDataContext.Consumer>
    {(context) => <Child {...props} {...context} />}
  </MockUserDataContext.Consumer>
);

export { MockUserContextProvider, MockUserContextConsumer };
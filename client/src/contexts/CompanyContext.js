import React, { createContext, useState } from "react";
const CompanyContext = createContext();

const CompanyProvider = ({ children }) => {

const [companyName, ] = useState("The Data Life");
const [employee, ] = useState("Niccolo Lampa");

  return (
    <CompanyContext.Provider
      value={{ companyName, employee }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

const CompanyConsumer = (Child) => (props) => (
  <CompanyContext.Consumer>
    {(context) => <Child {...props} {...context} />}
  </CompanyContext.Consumer>
);

export { CompanyProvider, CompanyConsumer };

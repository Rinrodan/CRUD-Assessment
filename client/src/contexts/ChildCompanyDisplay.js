import React from "react";
import { CompanyConsumer } from "./CompanyContext";




const ChildCompanyDisplay = ({ companyName, employee }) => {
  return (
    <div>{`${employee}: ${companyName}`}</div>
  )
};

export default CompanyConsumer(ChildCompanyDisplay);

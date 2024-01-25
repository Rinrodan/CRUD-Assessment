import React from "react";
import {
  render,
  screen,
  cleanup
} from "@testing-library/react";
import { ParentDisplay } from "./ParentDisplay";
import { MockCompanyConsumer, MockCompanyProvider } from "../__mocks__/CompanyContextMock";

// mocking companyContext's companyConsumer module for child components.
jest.mock("../contexts/CompanyContext", () => ({
    ...jest.requireActual("../contexts/CompanyContext"),
    CompanyConsumer: MockCompanyConsumer, 
  }));

describe("ParentDisplay Unit Test", () => {
    afterEach(() => {
      cleanup();
    });

  test('Parent displays employee name properly', () => {
    render(
        <MockCompanyProvider>
            <ParentDisplay />
        </MockCompanyProvider>
    );
    const employeeName = screen.getByText(/Niccolo Lampa/i);
    expect(employeeName).toBeInTheDocument();
  });

  test('Parent displays company name properly', () => {
    render(
        <MockCompanyProvider>
            <ParentDisplay />
        </MockCompanyProvider>
    );
    const companyName = screen.getByText(/The Data Life/i);
    expect(companyName).toBeInTheDocument();
  });


});

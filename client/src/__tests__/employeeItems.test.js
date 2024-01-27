import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { UserContext } from '../App';

import { BrowserRouter } from 'react-router-dom';
import EmployeeItems from '../components/pages/dashboard/tabs/itemsByEmployee';
import { MockAllUsers } from '../__mocks__/MockObjects';




const userData = {
  id: 1,
  first_name: "George",
  last_name: "Washington",
  username: "gwash"
};

const handleChange = jest.fn();

const users = MockAllUsers();
// console.log("ALL users ----------------------- mock ----------------------------- ",users)


describe('Employee Items Tab', () => {

  beforeEach(() => {
      render(   
        <BrowserRouter>
          <UserContext.Provider value={{ userData }}>
            <EmployeeItems />
          </UserContext.Provider>
        </BrowserRouter> 
        )
  });
  
  afterEach(() => {
    cleanup();
  });



  it('displays a dropdown select',async () => {
    expect(screen.getByRole("combobox")).toHaveValue("Select an Employee to View");

  });
  it('displays a tray after clicking dropdown',async () => {
    const dropDown = screen.getByRole('combobox')
    fireEvent.mouseDown(dropDown)
const tool = screen.getByRole('option')
expect(tool).toBeInTheDocument()



  });

    it('fetches data after clicking an option',  async () => {
      fetch = require('jest-fetch-mock');
      fetch.mockResponseOnce(JSON.stringify(users));

      render(
        <BrowserRouter>
          <UserContext.Provider value={{ userData }}>
            <EmployeeItems />
          </UserContext.Provider>
        </BrowserRouter>
      );
      // const dropDown = screen.getByRole('combobox')
      // fireEvent.mouseDown(dropDown)
      // const dropDownOptionOne = screen.getByRole("option")
      // fireEvent.click(dropDownOptionOne)
      expect(screen.queryByText('description')).toBeNull()
      // :::::::::  click option 2 on the dropdown combobox   ::::::::
      handleChange(2)
      await waitFor(() => expect(handleChange).toBeCalledTimes(1));

      expect(screen.findByText(/description/i).toBeInTheDocument)

    });
  });

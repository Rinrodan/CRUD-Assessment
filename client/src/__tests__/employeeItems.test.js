import { cleanup, fireEvent, render, screen } from '@testing-library/react';
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

const users = MockAllUsers();
console.log("ALL users ----------------------- mock ----------------------------- ",users)


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



  it('displays a dropdown button',async () => {
    const dropDown = screen.getByRole('button')
    expect(dropDown).toBeInTheDocument()

  });
  it('displays a tray after clicking dropdown',async () => {
    const dropDown = screen.getByRole('dropdown')
    fireEvent.click(dropDown)
    
screen.findByText("")
    // const tray = screen.findAllByAltText(/dropdown items/i)
    // expect(tray).toBeInTheDocument()

  });
});
  describe('Mocking', () => {
    it('renders a tray of users First and Last Names as links',  async () => {
      global.fetch = require('jest-fetch-mock');
      fetch.mockResponseOnce(JSON.stringify(users));

      render(
        <BrowserRouter>
          <UserContext.Provider value={{ userData }}>
            <EmployeeItems />
          </UserContext.Provider>
        </BrowserRouter>
      );
      const dropDown = screen.getByRole('button')
      // fireEvent.click(dropDown)
      // const tray = screen.getByRole('link')
      // expect(tray).toBeInTheDocument()
      // const userMonroe = await screen.findByText(/monroe/i)
      // expect(userMonroe).toBeInTheDocument();
    });
  });

import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import Dashboard from '../components/pages/dashboard/dashboardPage';
import { UserContext } from '../App';
import Header from '../components/utils/Header';
import { BrowserRouter } from 'react-router-dom';



const userData = {
  id: 1,
  first_name: "George",
  last_name: "Washington",
  username: "gwash"
};

describe('Dashboard Page', () => {
  var parent;

  beforeEach(() => {
      parent = render(   
        <BrowserRouter>
          <UserContext.Provider value={{ userData }}>
            <Header />
            <Dashboard />
          
          </UserContext.Provider>
        </BrowserRouter> 
        )
  });
  
  afterEach(() => {
    cleanup();
  });

  it('Renders Dashboard Page', () => {
    const firstName = screen.getByText(/Welcome Back George/i);
    expect(firstName).toBeInTheDocument();
  });

  it('Renders Inventory Tabs',async () => {

    const Tab = screen.getByText('ALL')
    expect(Tab).toBeInTheDocument();
  });
  it('Renders log out button', () => {

    const logoutButton = screen.getByText('LOG OUT')
    expect(logoutButton).toBeInTheDocument();
  });
  it('Renders Inventory List',async () => {
    const idColumn = await screen.findByText('QUANTITY');
    expect(idColumn).toBeInTheDocument();
  });
  
});
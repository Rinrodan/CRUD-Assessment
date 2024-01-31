import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import Dashboard from '../components/pages/dashboard';
import { UserContext } from '../App';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/utils/Header';
import AuthInventoryWithModal from '../components/pages/dashboard/tabs/AuthInventoryWithModal';
import InventoryTabs from '../components/pages/dashboard/tabs';

const userData = {
  id: 1,
  first_name: "George",
  last_name: "Washington",
  username: "gwash"
};

const items = [
  {
    "id":1,
    "item_userid":4,
    "item_name":"Test Name",
    "item_description":"Test Description",
    "item_quantity":99
  },
  {
    "id":2,
    "item_userid":4,
    "item_name":"Test Name Two",
    "item_description":"Test Description Two",
    "item_quantity":99
  },
]

describe('Dashboard Page', () => {


  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('Renders Dashboard Page', () => {
      render(
        <BrowserRouter>
          <UserContext.Provider value={{ userData }}>
            <Dashboard />
          </UserContext.Provider>
        </BrowserRouter>
      );
      const firstName = screen.getByText(/Welcome Back George/i);
      expect(firstName).toBeInTheDocument();
    });

    it('Renders log out button', () => {
      render(
        <BrowserRouter>
          <UserContext.Provider value={{ userData }}>
            <Header />
          </UserContext.Provider>
        </BrowserRouter>
      );
      const logoutButton = screen.getByText('LOG OUT')
      expect(logoutButton).toBeInTheDocument();
    });

    it('Renders Inventory Tabs',async () => {
      render(
        <BrowserRouter>
          <UserContext.Provider value={{ userData }}>
            <Dashboard />
          </UserContext.Provider>
        </BrowserRouter>
      );
      const Tab = screen.getByText('ALL')
      expect(Tab).toBeInTheDocument();
    });

    it('Renders Inventory List',async () => {
      render(
        <BrowserRouter>
          <UserContext.Provider value={{ userData }}>
          <Dashboard />
          </UserContext.Provider>
        </BrowserRouter>
      );
      const idColumn = await screen.findByText('QUANTITY');
      expect(idColumn).toBeInTheDocument();
    });
  });

  describe('Mocking', () => {
    it('renders auth inventory with mock',  async () => {
      global.fetch = require('jest-fetch-mock');
      fetch.mockResponseOnce(JSON.stringify(items));

      render(
        <BrowserRouter>
          <UserContext.Provider value={{ userData }}>
            <AuthInventoryWithModal />
          </UserContext.Provider>
        </BrowserRouter>
      );

      const itemName = await screen.findByText(/Test Name Two/i);
      expect(itemName).toBeInTheDocument();
    });
  });
});



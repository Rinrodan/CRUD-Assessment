import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import mockInventory from '../__mocks__/mockInventory.json'
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../App';
import MyItemsTab from '../components/pages/dashboard/tabs/myItemsTab';


const userData = {
    id: 1,
    first_name: "George",
    last_name: "Washington",
    username: "gwash"
  };

const items = [
    {
      "id":1,
      "item_userid": 1,
      "item_name":"Test Name",
      "item_description":"Test Description",
      "item_quantity":99
    },
    {
      "id":2,
      "item_userid": 2,
      "item_name":"Test Name Two",
      "item_description":"Test Description Two",
      "item_quantity":99
    },
  ]


describe('My Items Tab', () => {
    beforeEach(() => {

        render(        
            <BrowserRouter>
                <UserContext.Provider value={{ userData }}>
                    <MyItemsTab />
                </UserContext.Provider>
            </BrowserRouter>);

      });
      afterEach(() => {
        cleanup();
        jest.restoreAllMocks();
      });
    it('renders MyItems Tab', () => {
        const refreshButton = screen.getByRole('button', {  name: /refresh your item list/i})
        // expect(refreshButton).not.toBeInTheDocument();
            expect(refreshButton).toBeInTheDocument();
    });

    it('renders users filtered inventory',  async () => {
        const mockFn = jest.fn();
        act(() => {
            render(        
                <BrowserRouter>
                    <UserContext.Provider value={{ userData }}>
                        <MyItemsTab />
                    </UserContext.Provider>
                </BrowserRouter>);
          });
          const mockItems = items;
        global.fetch = require('jest-fetch-mock');
        fetch.mockResponseOnce(JSON.stringify(mockItems));

              // expect(mockFn).toHaveBeenCalled();

              expect( await screen.findByText(/plastic/i)).toBeInTheDocument();
        // fireEvent.click(await screen.getAllByRole('button', {  name: /refresh your item list/i})[0])

        // expect(mockFn).toHaveBeenCalled();


    });
  });

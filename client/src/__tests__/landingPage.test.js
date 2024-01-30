import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LandingPage from '../components/pages/landingPage';
import PublicInventoryAccordion from '../components/pages/landingPage/PublicInventoryAccordion';
import mockInventory from '../__mocks__/mockInventory.json'
import { fetchItemsMock } from '../__mocks__/fetchMocks';
import Header from '../components/utils/Header';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../App';


const userData = {

  };

const items = [
    {
      "id":1,
      "item_name":"Test Name",
      "item_description":"Test Description",
      "item_quantity":99
    },
    {
      "id":2,
      "item_name":"Test Name Two",
      "item_description":"Test Description Two",
      "item_quantity":99
    },
  ]


describe('Landing Page', () => {
    beforeEach(() => {

        render(        
            <BrowserRouter>
                <UserContext.Provider value={{ userData }}>
                <Header />
                <LandingPage />
                </UserContext.Provider>
            </BrowserRouter>);

      });
    it('renders LandingPage component', () => {
    
    const welcomeText = screen.getByText(/Welcome/i);
    expect(welcomeText).toBeInTheDocument();
    });

    it('renders public inventory button', () => {
        const button = screen.getByText('Our Inventory');
        expect(button).toBeInTheDocument();
    });
    it('renders public inventory list', async() => {
      const list = await screen.findByRole('list');
      expect(list).toBeInTheDocument();
  });
    

    it('renders Login', async () => {
  
        waitFor(() => expect(getByText("sign-in")).toBeInTheDocument());
    });
    
});
describe('Mocking', () => {
    it('renders auth inventory with mock',  async () => {
      global.fetch = require('jest-fetch-mock');
      fetch.mockResponseOnce(JSON.stringify(items));

      render(
        <BrowserRouter>
          <UserContext.Provider value={{ userData }}>
            <PublicInventoryAccordion />
          </UserContext.Provider>
        </BrowserRouter>
      );
      const list = await screen.findByRole('list');
      expect(list).toBeInTheDocument();

      const fakeItemName = screen.findAllByText(/Test Name Two/i);
      waitFor(() => expect(fakeItemName).toBeInTheDocument());
      
    });
  });
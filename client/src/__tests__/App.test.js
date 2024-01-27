import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <App/>
            </BrowserRouter>);
      });
    it('renders the app', () => {

    const welcomeText = screen.getByText(/Welcome/i);
    expect(welcomeText).toBeInTheDocument();
    });
});
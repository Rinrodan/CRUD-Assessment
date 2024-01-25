import { render, screen, waitFor } from '@testing-library/react';
import LandingPage from '../components/pages/landingPage/landingPage';
import PublicInventory from '../components/pages/landingPage/PublicInventory';
describe('Landing Page', () => {
    it('renders LandingPage component', () => {
    render(<LandingPage />);
    const welcomeText = screen.getByText(/Welcome/i);
    expect(welcomeText).toBeInTheDocument();
    });

    it('renders public inventory button', () => {
        render(<PublicInventory />);
        const button = screen.getByText('Our Inventory');
        expect(button).toBeInTheDocument();
    });

    it('renders Login', () => {
        render(<LandingPage />);
        waitFor(() => expect(getByText("sign-in")).toBeInTheDocument());
    });


});
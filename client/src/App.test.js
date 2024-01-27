import { cleanup, render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import App from "./App";

describe('App', () => {
    beforeEach(() => {
        parent = render(   
          <BrowserRouter>
            <App />
          </BrowserRouter> 
          )
    });
    
    afterEach(() => {
      cleanup();
    });
        it('renders the app', () => {
        
        const welcomeText = screen.getByText(/Welcome/i);
        expect(welcomeText).toBeInTheDocument();
        });
    

    
    
    });
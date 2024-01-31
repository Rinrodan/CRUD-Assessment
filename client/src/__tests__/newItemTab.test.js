import { cleanup, findByText, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { UserContext } from '../App';

import { BrowserRouter } from 'react-router-dom';
import EmployeeItems from '../components/pages/dashboard/tabs/itemsByEmployee';
import { MockAllUsers } from '../__mocks__/MockObjects';
import NewItemTab from '../components/pages/dashboard/tabs/newItemTab';




const userData = [{
  "id": 1,
  "first_name": "George",
  "last_name": "Washington",
  "username": "gwash"
}];

const handleChange = jest.fn();

const users = MockAllUsers();
// console.log("ALL users ----------------------- mock ----------------------------- ",users)


describe('New Item Tab', () => {
    global.alert = jest.fn();

    beforeEach(()  => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(   
        <BrowserRouter>
            <UserContext.Provider value={{ userData }}>
            <NewItemTab />
            </UserContext.Provider>
        </BrowserRouter> 
        )
    })

    const setup = () => {
        const utils = render(
            <BrowserRouter>
            <UserContext.Provider value={{ userData }}>
            <NewItemTab />
            </UserContext.Provider>
            </BrowserRouter> )
        const input = screen.getByRole('textbox', {  name: /username/i})
        return {
          input,
          ...utils,
        }
      }
    afterEach(() => {
    cleanup();
    });



    it('renders the new item component', () => {
        expect(screen.getByText(/new item tab/i)).toBeInTheDocument()

    });
    it('renders the new item form', () => {
        // expect(welcomseText).not.toBeInTheDocument()
        expect(screen.getByText(/submit/i)).toBeInTheDocument()
    });

    it('alert after empty sumbit click', () => {
        const button = screen.getByText(/submit/i)
        fireEvent.click(button)
        // expect(window.alert).not.toBeCalled()
        expect(window.alert).toBeCalled()
    });
    it('text inputs recieves text', () => {
        const itemName = screen.getByRole('textbox', {  name: /username/i})
        const itemDescription = screen.getByRole('textbox', {  name: /description/i})
        const itemQuantity = screen.getByRole('textbox', {  name: /quantity/i})
        fireEvent.change(itemName, {target: {value: 'jest item'}})
        fireEvent.change(itemDescription, {target: {value: 'jest description'}})
        fireEvent.change(itemQuantity, {target: {value: '32'}})
        expect(itemName.value).toBe('jest item')
        expect(itemDescription.value).toBe('jest description')
        expect(itemQuantity.value).toBe('32')
    });
    it('sends new item request after full submit', () =>{
        const logSpy = jest.spyOn(console, 'log');

        const itemName = screen.getByRole('textbox', {  name: /username/i})
        const itemDescription = screen.getByRole('textbox', {  name: /description/i})
        const itemQuantity = screen.getByRole('textbox', {  name: /quantity/i})
        fireEvent.change(itemName, {target: {value: 'jest item'}})
        fireEvent.change(itemDescription, {target: {value: 'jest description'}})
        fireEvent.change(itemQuantity, {target: {value: '32'}})
        const button = screen.getByText(/submit/i)
        fireEvent.click(button)

        expect(logSpy).toHaveBeenCalledWith('jest item');
        // `\""handle newitem submit new item"\`
    
        // expect(input.value).toBe('23')
    })
});
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginForm from '../Login/Login';
import { BrowserRouter } from 'react-router-dom';

jest.useFakeTimers();

describe('Login', () => {
    // Test 1:
	it('Login form is rendered properly', () => {
		const { getByTestId } = render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );
        const loginMainText = getByTestId('login-maintext');
        const loginEmail = getByTestId('login-email');
        const loginPass = getByTestId('login-pass');
        const loginButton = getByTestId('login-button');

        expect(loginMainText).toBeInTheDocument();
        expect(loginEmail).toBeInTheDocument();
        expect(loginPass).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
	});

    // Test 2:
    it('Wrong login', () => {
		const { getByTestId } = render(
            <BrowserRouter>
                <LoginForm/>
            </BrowserRouter>
        );
        const loginMainText = getByTestId('login-maintext');
        const loginEmail = getByTestId('login-email');
        const loginPass = getByTestId('login-pass');
        const loginButton = getByTestId('login-button');
        
        fireEvent.change(loginEmail, {target: {textContent: 'lazniuser@nepostojeci.com'}});
        fireEvent.change(loginPass, {target: {textContent: 'sifranepostojeca1!'}});
        fireEvent.click(loginButton);

        jest.advanceTimersByTime(5000);
        
        expect(loginEmail.textContent).toBe('lazniuser@nepostojeci.com');
        expect(loginPass.textContent).toBe('sifranepostojeca1!');
        
        const loginAlert = getByTestId('login-alert');
        expect(loginAlert).toBeInTheDocument();
	});

    // Test 3:
    it('Wrong password only', () => {
		const { getByTestId } = render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );
        const loginMainText = getByTestId('login-maintext');
        const loginEmail = getByTestId('login-email');
        const loginPass = getByTestId('login-pass');
        const loginButton = getByTestId('login-button');

        fireEvent.change(loginEmail, {target: {textContent: 'esmajic2@etf.unsa.ba'}});
        fireEvent.change(loginPass, {target: {textContent: 'sifranepostojeca1!'}});
        fireEvent.click(loginButton);

        jest.advanceTimersByTime(5000);
        
        expect(loginEmail.textContent).toBe('esmajic2@etf.unsa.ba');
        expect(loginPass.textContent).toBe('sifranepostojeca1!');
        
        const loginAlert = getByTestId('login-alert');
        expect(loginAlert).toBeInTheDocument();
	});

    // Test 4:
    it('Wrong email only', () => {
		const { getByTestId } = render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );
        const loginMainText = getByTestId('login-maintext');
        const loginEmail = getByTestId('login-email');
        const loginPass = getByTestId('login-pass');
        const loginButton = getByTestId('login-button');

        fireEvent.change(loginEmail, {target: {textContent: 'lazniuser@nepostojeci.com'}});
        fireEvent.change(loginPass, {target: {textContent: 'String1!'}});
        fireEvent.click(loginButton);

        jest.advanceTimersByTime(5000);
        
        expect(loginEmail.textContent).toBe('lazniuser@nepostojeci.com');
        expect(loginPass.textContent).toBe('String1!');
        
        const loginAlert = getByTestId('login-alert');
        expect(loginAlert).toBeInTheDocument();
	});

    // Test 5:
    it('MOCKED TEST: Error alert pops up if data is wrong', () => {
        const testProp = {
            user: {
                email: 'email@example.com',
                password: 'password1!'
            }
        }

        const { getByTestId } = render(
            <BrowserRouter>
                <LoginForm {...testProp}/>
            </BrowserRouter>
        );

        const loginButton = getByTestId('login-button');
        fireEvent.click(loginButton);
        
        const loginAlert = getByTestId('login-alert');
        expect(loginAlert).toBeInTheDocument();
    });
});
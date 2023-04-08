import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginForm from '../Login/Login';
import { BrowserRouter } from 'react-router-dom';

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
    it('Empty form is not accepted', () => {
		const { getByTestId } = render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );
        const loginButton = getByTestId('login-button');
        fireEvent.click(loginButton);
        
        setTimeout(() => {
            const loginAlert = getByTestId('login-alert');
            expect(loginAlert).toBeInTheDocument();
        }, 3000);
	});
});
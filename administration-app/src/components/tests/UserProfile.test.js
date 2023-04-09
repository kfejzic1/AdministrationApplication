import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProfilePage from '../User/UserProfile.js';
import { BrowserRouter } from 'react-router-dom';

describe('User Profile', () => {
    // Test 1:
	it('User profile is rendered properly', () => {
		const { getByTestId } = render(
            <BrowserRouter>
                <ProfilePage />
            </BrowserRouter>
        );
        const userBanner = getByTestId('user-banner');
        const userImage = getByTestId('user-image');
        const userName = getByTestId('user-name');
        const userDetails = getByTestId('user-details');
        const userLogout = getByTestId('user-logout');

        expect(userBanner).toBeInTheDocument();
        expect(userImage).toBeInTheDocument();
        expect(userName).toBeInTheDocument();
        expect(userDetails).toBeInTheDocument();
        expect(userLogout).toBeInTheDocument();
	});

    // Test 2:
    it('User informations are written properly', () => {
        const testprop = {
            user: {
                userName: 'testni',
                firstName: 'Ime',
                lastName: 'Prezime',
                email: 'email@example.com',
                phone: '111111',
            }
        }
        
        const { getByTestId } = render(
            <BrowserRouter>
                <ProfilePage {...testprop}/>
            </BrowserRouter>
        );

        const userName = getByTestId('user-name');
        const firstName = getByTestId('user-firstname');
        const lastName = getByTestId('user-lastname');
        const email = getByTestId('user-email');
        const phone = getByTestId('user-phone');
        
        expect(userName.textContent).toBe('testni');
        expect(firstName.textContent).toBe('Ime');
        expect(lastName.textContent).toBe('Prezime');
        expect(email.textContent).toBe('email@example.com');
        expect(phone.textContent).toBe('111111');
    })
});


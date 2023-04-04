import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserCreation } from './components/UserCreationView/UserCreation';
import { UserPassword } from './components/UserCreationView/UserPassword';

test('renders input field with placeholder "Name" on /usercreation', () => {
	render(<UserCreation />);
	const inputElement = screen.getByLabelText('Name');
	expect(inputElement).toBeInTheDocument();
});

test('renders input field with placeholder "Surname" on /usercreation', () => {
	render(<UserCreation />);
	const inputElement = screen.getByLabelText('Surname');
	expect(inputElement).toBeInTheDocument();
});

test('renders input field with placeholder "Email" on /usercreation', () => {
	render(<UserCreation />);
	const inputElement = screen.getByLabelText('Email');
	expect(inputElement).toBeInTheDocument();
});

test('renders input field with placeholder "Phone number" on /usercreation', () => {
	render(<UserCreation />);
	const inputElement = screen.getByLabelText('Phone number');
	expect(inputElement).toBeInTheDocument();
});

test('renders input field with placeholder "Password" on /userpassword', () => {
	render(<UserPassword />);
	const inputElement = screen.getByLabelText('Password');
	expect(inputElement).toBeInTheDocument();
});

test('renders input field with placeholder "Confirm password" on /userpassword', () => {
	render(<UserPassword />);
	const inputElement = screen.getByLabelText('Confirm password');
	expect(inputElement).toBeInTheDocument();
});

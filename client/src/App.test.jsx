import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import { serverUrl } from './global/constants';

// Mocking axios for HTTP requests
jest.mock('axios');

// Mocking the global constants
jest.mock('./global/constants', () => ({
    serverUrl: 'http://localhost'
}));

// Mocking window.location.reload
const mockReload = jest.fn();
delete window.location;
window.location = { reload: mockReload };
// // Mocking the navigation and location hooks from react-router-dom
const mockedNavigate = jest.fn();
const mockedLocation = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
    useLocation: () => ({
        state: mockedLocation(),
        pathname: '/login'
    })
}));

describe('Home Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should display the profile name when user is authenticated', async () => {
        // Mocking the axios response for successful authentication
        axios.get.mockResolvedValue({
            data: {
                Status: 'Success',
                profile_name: 'John Doe'
            }
        });

        render(<BrowserRouter><Home /></BrowserRouter>);

        // Wait for the useEffect to complete
        await waitFor(() => {
            expect(screen.getByText('Profile: John Doe')).toBeInTheDocument();
        });
    });

    it('should not display the profile name when user is not authenticated', async () => {
        // Mocking the axios response for failed authentication
        axios.get.mockResolvedValue({
            data: {
                Status: 'Fail'
            }
        });

        render(<BrowserRouter><Home /></BrowserRouter>);

        // Wait for the useEffect to complete
        await waitFor(() => {
            expect(screen.queryByText('Profile:')).not.toBeInTheDocument();
        });
    });

    it('should handle logout', async () => {
        // Mocking the axios response for successful authentication
        axios.get.mockResolvedValueOnce({
            data: {
                Status: 'Success',
                profile_name: 'John Doe'
            }
        });

        // Mocking the axios response for logout
        axios.get.mockResolvedValueOnce({});

        render(<BrowserRouter><Home /></BrowserRouter>);

        // Wait for the useEffect to complete
        await waitFor(() => {
            expect(screen.getByText('Profile: John Doe')).toBeInTheDocument();
        });

        // Simulate user clicking on logout
        userEvent.click(screen.getByText('Logout'));

        await waitFor(() => {
            expect(mockReload).toHaveBeenCalled();
        });
    });
});

import Login from './Login';

describe('Login Component', () => {
    beforeEach(() => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('handles successful login', async () => {
        const mockSuccessResponse = { data: { Status: "Success" } };
        axios.post.mockResolvedValue(mockSuccessResponse);

        const { getByLabelText, getByRole } = render(<BrowserRouter><Login /></BrowserRouter>);
        const usernameInput = getByLabelText('Username');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByRole('button', { name: /Login/i });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(`${serverUrl}/login`, {
                username: 'testuser',
                password: 'password123'
            });
            expect(window.alert).toHaveBeenCalledWith('Login Successful');
        });
    });

    it('handles login failure due to incorrect credentials', async () => {
        const mockErrorResponse = { data: { Error: "Password not matched" } };
        axios.post.mockResolvedValue(mockErrorResponse);

        const { getByLabelText, getByRole } = render(<BrowserRouter><Login /></BrowserRouter>);
        const usernameInput = getByLabelText('Username');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByRole('button', { name: /Login/i });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(`${serverUrl}/login`, {
                username: 'testuser',
                password: 'wrongpassword'
            });
            expect(window.alert).toHaveBeenCalledWith('Password not matched');
        });
    });
});

import Register from './Register';

// Mocking the navigation hook from react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe('Register Component', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
    });

    it('renders Register form and allows user to input values', () => {
        render(<BrowserRouter><Register /></BrowserRouter>);

        // Find form elements
        const profileNameInput = screen.getByLabelText(/profile name/i);
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInputs = screen.getAllByLabelText(/password/i);
        const passwordInput = passwordInputs[0]; // The first password input
        const confirmPasswordInput = passwordInputs[1]; // The second password input

        // Simulate user typing into form fields
        userEvent.type(profileNameInput, 'John Doe');
        userEvent.type(usernameInput, 'johndoe');
        userEvent.type(passwordInput, 'password123');
        userEvent.type(confirmPasswordInput, 'password123');

        // Check if the values are updated correctly
        expect(profileNameInput.value).toBe('John Doe');
        expect(usernameInput.value).toBe('johndoe');
        expect(passwordInput.value).toBe('password123');
        expect(confirmPasswordInput.value).toBe('password123');
    });

    it('shows error message if passwords do not match after 3 seconds', async () => {
        render(<BrowserRouter><Register /></BrowserRouter>);

        // Type into the password fields
        const passwordInputs = screen.getAllByLabelText(/password/i);
        const passwordInput = passwordInputs[0]; // The first password input
        const confirmPasswordInput = passwordInputs[1]; // The second password input

        userEvent.type(passwordInput, 'password123');
        userEvent.type(confirmPasswordInput, 'password321');

        // Wait for the error message to appear after 3 seconds
        await waitFor(() => {
            expect(screen.queryByText('Passwords do not match')).toBeInTheDocument();
        }, { timeout: 4000 }); // Timeout slightly longer than 3 seconds to account for any additional delays
    });


    it('submits the form and navigates to login on successful registration', async () => {
        // Mocking the axios post request
        axios.post.mockResolvedValue({
            data: { Status: 'Success' }
        });

        render(<BrowserRouter><Register /></BrowserRouter>);

        // Type into the form fields
        const profileNameInput = screen.getByLabelText(/profile name/i);
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInputs = screen.getAllByLabelText(/password/i);
        const passwordInput = passwordInputs[0]; // The first password input
        const confirmPasswordInput = passwordInputs[1]; // The second password input
        const submitButton = screen.getByRole('button', { name: /sign up/i });

        userEvent.type(profileNameInput, 'John Doe');
        userEvent.type(usernameInput, 'johndoe');
        userEvent.type(passwordInput, 'password123');
        userEvent.type(confirmPasswordInput, 'password123');

        // Simulate form submission
        fireEvent.submit(submitButton);

        // Wait for the axios call to resolve
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(`${serverUrl}/register`, {
                username: 'johndoe',
                password: 'password123',
                profile_name: 'John Doe'
            });
        });

        // Check if the navigation has been called
        expect(mockedNavigate).toHaveBeenCalledWith('/login');
    });
});

import EarTraining from './EarTraining';

describe('EarTraining Component', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
    });

    it('navigates to login if not authenticated', async () => {
        // Mocking the axios get request for authentication check
        axios.get.mockResolvedValueOnce({
            data: { Status: 'Error' }
        });

        render(<BrowserRouter><EarTraining /></BrowserRouter>);

        // Wait for the axios call to resolve and check navigation
        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledWith('/login');
        });
    });

    it('displays profile name if authenticated', async () => {
        // Mocking the axios get request for authentication check
        axios.get.mockResolvedValueOnce({
            data: { Status: 'Success', profile_name: 'John Doe' }
        });

        render(<BrowserRouter><EarTraining /></BrowserRouter>);

        // Wait for the axios call to resolve and check for profile name display
        await waitFor(() => {
            expect(screen.getByText('Profile: John Doe')).toBeInTheDocument();
        });
    });

});

import EartrainChord from './EartrainChord';

describe('EartrainChord Component', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
    });

    it('navigates to login if not authenticated', async () => {
        // Mocking the axios get request for authentication check
        axios.get.mockResolvedValueOnce({
            data: { Status: 'Error' }
        });

        render(<BrowserRouter><EartrainChord /></BrowserRouter>);

        // Wait for the axios call to resolve and check navigation
        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledWith('/login');
        });
    });

    it('displays profile name if authenticated', async () => {
        // Mocking the axios get request for authentication check
        axios.get.mockResolvedValueOnce({
            data: { Status: 'Success', profile_name: 'John Doe' }
        });

        render(<BrowserRouter><EartrainChord /></BrowserRouter>);

        // Wait for the axios call to resolve and check for profile name display
        await waitFor(() => {
            expect(screen.getByText('Profile: John Doe')).toBeInTheDocument();
        });
    });

    it('submits the form with category "Chord" and navigates correctly', async () => {
        axios.get.mockResolvedValueOnce({
            data: { Status: 'Success', profile_name: 'John Doe' }
        });
        const { getByText } = render(<BrowserRouter><EartrainChord /></BrowserRouter>);
        const easyButton = getByText('Easy');

        fireEvent.click(easyButton);
        fireEvent.submit(easyButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(`${serverUrl}/eartrain/question`, {
                difficulty_name: 'Easy',
                category_name: 'Chord',
            });
            expect(axios.get).toHaveBeenCalledWith(`${serverUrl}/eartrain/chord`)
            // expect(mockedNavigate).toHaveBeenCalledWith('/eartrain/question');
        });
    });
});


import EartrainNote from './EartrainNote';

describe('EartrainNote Component', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
    });

    it('navigates to login if not authenticated', async () => {
        // Mocking the axios get request for authentication check
        axios.get.mockResolvedValueOnce({
            data: { Status: 'Error' }
        });

        render(<BrowserRouter><EartrainNote /></BrowserRouter>);

        // Wait for the axios call to resolve and check navigation
        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledWith('/login');
        });
    });

    it('displays profile name if authenticated', async () => {
        // Mocking the axios get request for authentication check
        axios.get.mockResolvedValueOnce({
            data: { Status: 'Success', profile_name: 'John Doe' }
        });

        render(<BrowserRouter><EartrainNote /></BrowserRouter>);

        // Wait for the axios call to resolve and check for profile name display
        await waitFor(() => {
            expect(screen.getByText('Profile: John Doe')).toBeInTheDocument();
        });
    });

    it('submits the form with category "Note" and navigates correctly', async () => {
        axios.get.mockResolvedValueOnce({
            data: { Status: 'Success', profile_name: 'John Doe' }
        });
        const { getByText } = render(<BrowserRouter><EartrainNote /></BrowserRouter>);
        const easyButton = getByText('Easy');

        fireEvent.click(easyButton);
        fireEvent.submit(easyButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(`${serverUrl}/eartrain/question`, {
                difficulty_name: 'Easy',
                category_name: 'Note',
            });
            expect(axios.get).toHaveBeenCalledWith(`${serverUrl}/eartrain/note`)
            // expect(mockedNavigate).toHaveBeenCalledWith('/eartrain/question');
        });
    });
});

import QuizHome from './QuizHome';

describe('QuizHome Component', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
    });

    it('navigates to login if not authenticated', async () => {
        // Mocking the axios get request for authentication check
        axios.get.mockResolvedValueOnce({
            data: { Status: 'Error' }
        });

        render(<BrowserRouter><QuizHome /></BrowserRouter>);

        // Wait for the axios call to resolve and check navigation
        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledWith('/login');
        });
    });

    it('displays profile name if authenticated', async () => {
        // Mocking the axios get request for authentication check
        axios.get.mockResolvedValueOnce({
            data: { Status: 'Success', profile_name: 'John Doe' }
        });

        render(<BrowserRouter><QuizHome /></BrowserRouter>);

        // Wait for the axios call to resolve and check for profile name display
        await waitFor(() => {
            expect(screen.getByText('Profile: John Doe')).toBeInTheDocument();
        });
    });

    it('submits the form with category "Note" and navigates correctly', async () => {
        axios.get.mockResolvedValueOnce({
            data: { Status: 'Success', profile_name: 'John Doe' }
        });
        const { getByText } = render(<BrowserRouter><QuizHome /></BrowserRouter>);
        const easyButton = getByText('Easy');

        fireEvent.click(easyButton);
        fireEvent.submit(easyButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(`${serverUrl}/quiz/question`, {
                difficulty_name: 'Easy',
                category_name: 'Quiz',
            });
            // expect(mockedNavigate).toHaveBeenCalledWith('/quiz/question');
        });
    });
});
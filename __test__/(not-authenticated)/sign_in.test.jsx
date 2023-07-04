import { render, screen, fireEvent } from '@testing-library/react';
import SignIn from '~/app/(not-authenticated)/sign_in/page';
import { signIn } from 'next-auth/react';
import { AuthLayoutProvider } from '../../src/hooks/useAuthLayout';

// mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      query: {},
      push: pushMock,
      pathname: '',
      asPath: '',
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
    };
  },
}));

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('Sign In', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders a heading', () => {
    render(
      <AuthLayoutProvider>
        <SignIn />
      </AuthLayoutProvider>
    );

    const heading = screen.getByRole('heading', {
      name: 'Black Market',
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders an email input', () => {
    render(
      <AuthLayoutProvider>
        <SignIn />
      </AuthLayoutProvider>
    );

    const input = screen.getByRole('textbox', {
      name: 'Email',
    });

    expect(input).toBeInTheDocument();
  });

  it('renders a password input', () => {
    render(
      <AuthLayoutProvider>
        <SignIn />
      </AuthLayoutProvider>
    );

    const input = screen.getByLabelText(/^Password$/);

    expect(input).toBeInTheDocument();
  });

  it('renders a Sign In button', () => {
    render(
      <AuthLayoutProvider>
        <SignIn />
      </AuthLayoutProvider>
    );

    const button = screen.getByRole('button', {
      name: 'Log in',
    });

    expect(button).toBeInTheDocument();
  });

  it('renders a forgot password link', () => {
    render(
      <AuthLayoutProvider>
        <SignIn />
      </AuthLayoutProvider>
    );

    const link = screen.getByRole('link', {
      name: 'I forgot my password',
    });

    expect(link).toBeInTheDocument();
  });

  it('renders a SignUp link', () => {
    render(
      <AuthLayoutProvider>
        <SignIn />
      </AuthLayoutProvider>
    );

    const input = screen.getByRole('link', {
      name: 'Sign up',
    });

    expect(input).toBeInTheDocument();
  });

  it('calls signIn when the sign-in button is pressed with valid credentials', () => {
    const { getByLabelText, getByText } = render(
      <AuthLayoutProvider>
        <SignIn />
      </AuthLayoutProvider>
    );
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const signInButton = getByText('Log in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);

    expect(signIn).toHaveBeenCalledWith('credentials', {
      username: 'test@example.com',
      password: 'password123',
      redirect: true,
      callbackUrl: '/',
    });
  });

  it('does not call signIn when the sign-in button is pressed with invalid credentials', () => {
    const { getByLabelText, getByText } = render(
      <AuthLayoutProvider>
        <SignIn />
      </AuthLayoutProvider>
    );
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const signInButton = getByText('Log in');

    fireEvent.change(emailInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(signInButton);

    expect(signIn).not.toHaveBeenCalled();
    console.log('here ends the test');
  });
});

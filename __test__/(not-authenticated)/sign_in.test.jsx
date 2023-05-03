import { render, screen } from '@testing-library/react';
import SignIn from '../../src/app/(not-authenticated)/sign_in/page';
import '@testing-library/jest-dom';

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

describe('Sign In', () => {
  it('renders a heading', () => {
    render(<SignIn />);

    const heading = screen.getByRole('heading', {
      name: 'Black Market',
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders an email input', () => {
    render(<SignIn />);

    const input = screen.getByRole('textbox', {
      name: 'Email',
    });

    expect(input).toBeInTheDocument();
  });

  it('renders a password input', () => {
    render(<SignIn />);

    const input = screen.getByLabelText(/^Password$/);

    expect(input).toBeInTheDocument();
  });

  it('renders a Sign In button', () => {
    render(<SignIn />);

    const button = screen.getByRole('button', {
      name: 'Log in',
    });

    expect(button).toBeInTheDocument();
  });

  it('renders a forgot password link', () => {
    render(<SignIn />);

    const link = screen.getByRole('link', {
      name: 'I forgot my password',
    });

    expect(link).toBeInTheDocument();
  });

  it('renders a SignUp button', () => {
    render(<SignIn />);

    const input = screen.getByRole('button', {
      name: 'Sign up',
    });

    expect(input).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import SignUp from '../../src/app/(not-authenticated)/sign_up/page';
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

describe('Sign Up', () => {
  it('renders a heading', () => {
    render(<SignUp />);

    const heading = screen.getByRole('heading', {
      name: 'Black Market',
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders an email input', () => {
    render(<SignUp />);

    const input = screen.getByRole('textbox', {
      name: 'Email',
    });

    expect(input).toBeInTheDocument();
  });

  it('renders a full name input', () => {
    render(<SignUp />);

    const input = screen.getByRole('textbox', {
      name: 'Full Name',
    });

    expect(input).toBeInTheDocument();
  });

  it('renders a password input', () => {
    render(<SignUp />);

    const input = screen.getByLabelText(/^Password$/);

    expect(input).toBeInTheDocument();
  });

  it('renders a Sign Up button', () => {
    render(<SignUp />);

    const button = screen.getByRole('button', {
      name: 'Sign up',
    });

    expect(button).toBeInTheDocument();
  });

  it('renders a data policy link', () => {
    render(<SignUp />);

    const link = screen.getByRole('link', {
      name: 'Data Policy',
    });

    expect(link).toBeInTheDocument();
  });

  it('renders a cookies policy link', () => {
    render(<SignUp />);

    const link = screen.getByRole('link', {
      name: 'Cookies Policy.',
    });

    expect(link).toBeInTheDocument();
  });

  it('renders a Sign In link', () => {
    render(<SignUp />);

    const link = screen.getByRole('link', {
      name: 'Log in',
    });

    expect(link).toBeInTheDocument();
  });
});

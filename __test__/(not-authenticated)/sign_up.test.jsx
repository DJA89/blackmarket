import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from '~/app/(not-authenticated)/sign_up/page';
import {
  AuthLayoutProvider,
  useAuthLayout,
} from '../../src/hooks/useAuthLayout';
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
    render(
      <AuthLayoutProvider>
        <SignUp />
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
        <SignUp />
      </AuthLayoutProvider>
    );

    const input = findEmailInput();

    expect(input).toBeInTheDocument();
  });

  it('should update the email input value when typed into', () => {
    render(
      <AuthLayoutProvider>
        <SignUp />
      </AuthLayoutProvider>
    );

    const emailInput = fillEmailInput();

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('renders a full name input', () => {
    render(
      <AuthLayoutProvider>
        <SignUp />
      </AuthLayoutProvider>
    );

    const input = findFullNameInput();

    expect(input).toBeInTheDocument();
  });

  it('should update the name input value when typed into', () => {
    render(
      <AuthLayoutProvider>
        <SignUp />
      </AuthLayoutProvider>
    );

    const nameInput = fillFullNameInput();

    expect(nameInput).toHaveValue('John Doe');
  });

  it('renders a password input', () => {
    render(
      <AuthLayoutProvider>
        <SignUp />
      </AuthLayoutProvider>
    );

    const input = findPasswordInput();

    expect(input).toBeInTheDocument();
  });

  it('should update the password input value when typed into', () => {
    render(
      <AuthLayoutProvider>
        <SignUp />
      </AuthLayoutProvider>
    );

    const passwordInput = fillPasswordInput();

    expect(passwordInput).toHaveValue('password123');
  });

  describe('Submit button', () => {
    jest.mock('../../src/hooks/useAuthLayout', () => ({
      useAuthLayout: jest.fn(),
    }));

    const useAuthLayoutMock = {
      handleSubmit: jest.fn(),
      email: 'email',
      emailError: 'email error',
      password: 'password',
      passwordError: 'password error',
      setEmail: jest.fn(),
      setPassword: jest.fn(),
      name: 'name',
      setName: jest.fn(),
      nameError: 'name error',
    };

    it('renders a Sign Up button', () => {
      render(
        <AuthLayoutProvider>
          <SignUp />
        </AuthLayoutProvider>
      );

      const button = findSignUpButton();

      expect(button).toBeInTheDocument();
    });

    it('should call handleSubmit when the sign-up button is pressed', () => {
      useAuthLayout.mockReturnValue(useAuthLayoutMock);

      render(<SignUp />);

      const signUpButton = findSignUpButton();

      fireEvent.click(signUpButton);
      expect(useAuthLayoutMock.handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('renders a data policy link', () => {
    render(
      <AuthLayoutProvider>
        <SignUp />
      </AuthLayoutProvider>
    );

    const link = screen.getByRole('link', {
      name: 'Data Policy',
    });

    expect(link).toBeInTheDocument();
  });

  it('renders a cookies policy link', () => {
    render(
      <AuthLayoutProvider>
        <SignUp />
      </AuthLayoutProvider>
    );

    const link = screen.getByRole('link', {
      name: 'Cookies Policy.',
    });

    expect(link).toBeInTheDocument();
  });

  it('renders a Sign In link', () => {
    render(
      <AuthLayoutProvider>
        <SignUp />
      </AuthLayoutProvider>
    );

    const link = screen.getByRole('link', {
      name: 'Log in',
    });

    expect(link).toBeInTheDocument();
  });

  const findEmailInput = () => screen.getByRole('textbox', { name: 'Email' });

  const findFullNameInput = () =>
    screen.getByRole('textbox', { name: 'Full Name' });

  const findPasswordInput = () => screen.getByLabelText(/^Password$/);

  const findSignUpButton = () =>
    screen.getByRole('button', { name: 'Sign up' });

  const fillEmailInput = () => {
    const input = findEmailInput();
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    return input;
  };

  const fillFullNameInput = () => {
    const input = findFullNameInput();
    fireEvent.change(input, { target: { value: 'John Doe' } });

    return input;
  };

  const fillPasswordInput = () => {
    const input = findPasswordInput();
    fireEvent.change(input, { target: { value: 'password123' } });

    return input;
  };

  const fillForm = () => {
    fillEmailInput();
    fillFullNameInput();
    fillPasswordInput();
  };
});

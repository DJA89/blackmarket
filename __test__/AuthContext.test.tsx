import { render, screen } from '@testing-library/react';
import { Session } from 'next-auth';
import AuthContext from '~/components/Providers/AuthContext';

describe('AuthContext', () => {
  it('should render the component with a session', () => {
    const session: Session = {
      user: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        accessToken: 'access token',
        client: 'client',
        uid: 'uid',
        expiry: 333,
        id: '3',
      },
      expires: '2022-01-01T00:00:00.000Z',
      accessToken: 'access token',
      client: 'client',
      uid: 'uid',
      expiry: 333,
    };
    render(
      <AuthContext session={session}>
        <div>Hello, world!</div>
      </AuthContext>
    );
    const button = screen.getByText('Hello, world!');

    expect(button).toBeInTheDocument();
  });

  it('should render the component without a session', () => {
    const { getByText } = render(
      <AuthContext session={null}>Hello, world!</AuthContext>
    );
    expect(getByText('Hello, world!')).toBeInTheDocument();
  });
});

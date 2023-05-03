import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { createRouter } from 'next/router';
import SignIn from '../../src/app/(not-authenticated)/sign_in/page';
import '@testing-library/jest-dom';
// import { AppRouterProvider } from 'next/router';
// import { RouterContext } from 'next-server/dist/lib/router-context';
import * as nextRouter from 'next/router';

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));

// mock useRouter
// jest.mock('next/router', () => ({
//   useRouter: jest.fn(),
// }));

// setup a new mocking function for push method

// const router = createRouter('', { user: 'nikita' }, '', {
//   initialProps: {},
//   pageLoader: jest.fn(),
//   App: jest.fn(),
//   Component: jest.fn(),
// });
// const pushMock = jest.fn();
// jest.mock('next/router', () => ({
//   useRouter() {
//     return {
//       query: {},
//       push: pushMock,
//       pathname: '',
//       asPath: '',
//       events: {
//         on: jest.fn(),
//         off: jest.fn(),
//       },
//     };
//   },
// }));

// mock a return value on useRouter
// useRouter.mockReturnValue({
//   query: {},
//   // return mock for push method
//   push: pushMock,
//   // ... add the props or methods you need
// });

describe('Sign In', () => {
  it('renders a heading', () => {
    render(<SignIn />); //Leer la pestaña con esto y las demás pestañas de esa ventana https://dev.to/peterlidee/how-to-mock-next-router-with-jest-3p6b

    const heading = screen.getByRole('heading', {
      name: 'Black Market',
    });

    expect(heading).toBeInTheDocument();
  });
});

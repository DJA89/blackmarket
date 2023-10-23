export const API = {
  signIn: '/dj-rest-auth/login/',
  signUp: '/dj-rest-auth/registration/',
};

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://black-market-juan-rs.herokuapp.com';

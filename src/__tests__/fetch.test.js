import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, waitFor, screen } from '@testing-library/react';
import App from '../components/App';
import '@testing-library/jest-dom/extend-expect';

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there' }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays greeting', async () => {
  render(<App />);

  await waitFor(() => screen.getByRole('heading'));

  expect(screen.getByRole('heading')).toHaveTextContent('Privet');
  expect(screen.getByRole('heading')).toBeDisabled();
});

test('handles server error', async () => {
  server.use(
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );

  render(<App />);

  expect(screen.getByRole('heading')).toBeDisabled();
});

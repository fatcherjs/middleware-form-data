import { fatcher } from 'fatcher';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { formData } from '../src';
import { isFormDataString } from './isFormDataString';

const server = setupServer(
  http.all('https://foo.bar', async ({ request }) => {
    await delay(1000);
    return HttpResponse.json({
      isFormData: isFormDataString(await request.text()),
      isEmpty: !request.body,
    });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Body Type', () => {
  it('Will ignore when body is empty', async () => {
    const response = await fatcher('https://foo.bar', {
      middlewares: [formData],
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: null,
    });

    expect(await response.json()).toEqual({ isFormData: false, isEmpty: true });
  });

  it('Will Ignore when body is not plain object', async () => {
    const response = await fatcher('https://foo.bar', {
      middlewares: [formData],
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: new Response(),
    });

    expect(await response.json()).toEqual({ isFormData: false, isEmpty: false });
  });
});

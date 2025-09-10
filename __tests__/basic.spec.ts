import { fatcher } from 'fatcher';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { formData } from '../src';
import { isFormDataString } from './isFormDataString';

const server = setupServer(
  http.all('https://foo.bar', async ({ request }) => {
    await delay(1000);
    return HttpResponse.json({ isFormData: isFormDataString(await request.text()) });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Basic', () => {
  it('Basic Using', async () => {
    const response = await fatcher('https://foo.bar', {
      middlewares: [formData],
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: {
        foo: 'bar',
        test: 'a',
        b: new Blob(['1']),
      },
    });

    expect(await response.json()).toEqual({ isFormData: true });
  });

  it('Origin FormData', async () => {
    const body = new FormData();

    body.append('foo', 'bar');

    const response = await fatcher('https://foo.bar', {
      middlewares: [formData],
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body,
    });

    expect(await response.json()).toEqual({ isFormData: true });
  });

  it('Array Value', async () => {
    const response = await fatcher('https://foo.bar', {
      middlewares: [formData],
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: {
        foo: ['bar', 'bar1'],
      },
    });

    expect(await response.json()).toEqual({ isFormData: true });
  });
});

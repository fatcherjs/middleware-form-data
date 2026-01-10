import { fatcher } from 'fatcher';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { formData } from '../src';
import { isFormDataString } from './isFormDataString';

const server = setupServer(
  http.all('https://foo.bar', async ({ request }) => {
    await delay(10);

    const text = await request.text();

    return HttpResponse.json({
      isFormData: isFormDataString(text),
    });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('formData middleware', () => {
  it('Basic Using (plain object)', async () => {
    const response = await fatcher('https://foo.bar', {
      middlewares: [formData],
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: {
        foo: 'bar',
        test: 'a',
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

  it('HTMLFormElement FormData', async () => {
    document.body.innerHTML = `
        <form id="login">
          <input name="username" value="alice" />
          <input name="age" value="18" />
        </form>
      `;

    const form = document.querySelector('#login') as HTMLFormElement;

    const response = await fatcher('https://foo.bar', {
      middlewares: [formData],
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: form,
    });

    expect(await response.json()).toEqual({ isFormData: true });
  });
});

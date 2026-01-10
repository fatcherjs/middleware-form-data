import { isPlainObject } from 'es-toolkit';
import { FatcherMiddleware } from 'fatcher';

export const formData: FatcherMiddleware = {
  name: 'fatcher-middleware-formdata',
  use: (context, next) => {
    const { body } = context;

    if (!body) {
      return next();
    }

    if (body instanceof HTMLFormElement) {
      context.request.headers.delete('content-type');

      return next({
        request: new Request(context.request, { body: new FormData(body) }),
      });
    }

    if (body instanceof FormData) {
      context.request.headers.delete('content-type');
      return next();
    }

    if (isPlainObject(body)) {
      const form = new FormData();
      context.request.headers.delete('content-type');

      for (const [key, value] of Object.entries(body)) {
        if (Array.isArray(value)) {
          value.forEach(item => form.append(key, item));
        } else {
          form.append(key, value);
        }
      }

      return next({ request: new Request(context.request, { body: form }) });
    }

    return next();
  },
};

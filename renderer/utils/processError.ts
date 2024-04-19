import axios from 'axios';
import { map, mergeMap, of } from 'rxjs';
import { ValidationError } from 'class-validator';
import { store } from '../Reducer';
import { t } from 'i18next';
import { createError } from '@tools/rxjs-pipes';
import { baseRequestInstance } from './baseRequest';
import { TranslateMessage } from '../hooks/Validation/checker';
import { addMessage } from '../Reducer/Message';
import getToken from '../api/Login/getToken';

function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

export function isValidationErrors(e: unknown): e is ValidationError[] {
  if (e instanceof Array)
    if (e.length > 0) if (e[0] instanceof ValidationError) return true;
  return false;
}
interface ResultError {
  addon?: string;
  e: unknown;
}
export default function processError(e: unknown, name?: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const error = e.response.data.message as string;
  console.log(error);
  return of(e).pipe(
    map<unknown, ResultError>((e) => {
      if (isValidationErrors(e)) {
        for (const error of e) {
          if (error.constraints) {
            const keys = objectKeys(error.constraints);
            let errorName = ``;
            let options: Record<string, string> = {};
            const errorMessage = error.constraints[keys[0]];
            if (errorMessage.startsWith('{')) {
              const JsonMessage = JSON.parse(errorMessage) as TranslateMessage;
              errorName = JsonMessage.name;
              options = JsonMessage.options;
            } else {
              errorName = errorMessage;
            }
            store.dispatch(
              addMessage({
                text: t(
                  `form${
                    name ? `.${name}.errors_popup` : '.errors'
                  }.${errorName}`,
                  {
                    property: error.property,
                    value: error.property,
                    ...options,
                  },
                ),
                params: { variant: 'error' },
              }),
            );
          }
        }
      }

      if (axios.isAxiosError(e)) {
        if (e.response) {
          if (e.response.status === 401) {
            return { e, addon: 'retry' };
          }
          store.dispatch(
            addMessage({
              text: `${e.message}`,
              params: {
                variant: 'error',
                autoHideDuration: 3500,
              },
            }),
          );
          /**
           * Обработчик ошибок
           */
          if (error) {
            store.dispatch(
              addMessage({
                text: error,
                params: {
                  variant: 'error',
                  autoHideDuration: 3500,
                },
              }),
            );
          } else {
            store.dispatch(
              addMessage({
                text: 'Произошла непредвиденная ошибка, обратитесь к администратору',
                params: {
                  variant: 'error',
                  autoHideDuration: 7500,
                },
              }),
            );
          }
        }
      }
      return { e };
    }),
    mergeMap((result) => {
      if (result.addon === 'retry') {
        return getToken().pipe(
          map((token) => {
            if (token) {
              window.store.set('token', token);
              baseRequestInstance.defaults.headers.token = '';
              return result.addon;
            }
          }),
        );
      }
      return of(result.e);
    }),
  );
}
export const transformError = createError(processError);

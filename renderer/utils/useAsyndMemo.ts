import React from 'react';
import { isObservable, Observable } from 'rxjs';

export default function useAsyncMemo<T, V extends T | undefined>(
  effect: (...args: []) => Observable<T> | Promise<T> | T,
  deps: React.DependencyList,
  initialState?: V,
  onError?: (e: unknown) => void,
) {
  const [value, setValue] = React.useState<T>(initialState as T);
  React.useEffect((...args) => {
    const data = effect(...args);
    if (isObservable(data)) {
      const sub = data.subscribe({ next: setValue, error: onError });
      return sub.unsubscribe.bind(sub);
    } else {
      Promise.resolve(data)
        .then((res) => setValue(res as T))
        .catch(onError);
    }
  }, deps);
  return value as V extends undefined ? T | undefined : T;
}

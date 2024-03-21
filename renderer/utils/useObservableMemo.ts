import React from 'react';
import { Observable, isObservable } from 'rxjs';

export function useObservableMemo<T>(
  effect: () => T | Observable<T>,
  deps: React.DependencyList,
): T | undefined {
  const [data, setData] = React.useState<T>();
  React.useEffect(() => {
    const observable = effect();
    if (isObservable(observable)) {
      const sub = observable.subscribe(setData);
      return sub.unsubscribe.bind(sub);
    } else {
      setData(observable);
    }
  }, deps);
  return data;
}

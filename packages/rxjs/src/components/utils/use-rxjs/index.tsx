import { useState, useEffect, useMemo } from 'react';
import { BehaviorSubject, Observable } from 'rxjs';

export function useRxjs<T>(target$: BehaviorSubject<T>) {
  const [data, setData] = useState<T>(
    useMemo(() => target$.value, [])
  );
  useEffect(() => {
    target$.subscribe(setData);
  }, [target$])
  return data;
}
import { createContext } from 'react'
import { ICity } from './models';
import { Updater } from 'use-immer';

export const CitysContext = createContext<[ICity[], Updater<ICity[]>]>([[], () => { }]);


export const KeyWordContext = createContext<[string, (str: string) => void]>([
  '',
  (str: string) => { }
]);
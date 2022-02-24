import type { Updater } from 'use-immer';

interface ICity {
  name: string;
  subscribe: boolean;
  temperature?: string;
  weatherType?: string;
}

interface IWorkspaceProps {
  citys: ICity[];
  keyWord: string;
  setCitys: Updater<ICity[]>;
  setKeyWord: (citys: string) => void;
}

interface IComputedProps {
  citys: ICity[];
}

interface ITailProps {
  citys: ICity[];
  keyWord: string;
}

export type {
  ICity,
  IWorkspaceProps,
  IComputedProps,
  ITailProps
}
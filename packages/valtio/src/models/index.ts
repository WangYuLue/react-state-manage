interface ICity {
  name: string;
  subscribe: boolean;
  temperature?: string;
  weatherType?: string;
}

interface IData {
  citys: ICity[];
  keyWord: string;
}

export type {
  ICity,
  IData
}
import { ICity } from './models';
import create from 'zustand'
import { makeCity } from './utils';
import produce from "immer";

interface IStore {
  citys: ICity[];
  keyWord: string;
  addCity: (city: ICity) => void;
  removeCity: (cityName: string) => void;
  toggleSubscribeCity: (cityName: string) => void;
  updateCityTemperature: (city: ICity) => void;
  updateCityWeather: (city: ICity) => void;
  setKeyWord: (keyWord: string) => void;
}

const useStore = create<IStore>((set) => ({
  citys: [
    makeCity('北京'),
    makeCity('上海'),
    makeCity('深圳'),
    makeCity('广州'),
    makeCity('成都'),
    makeCity('南京'),
    makeCity('西安')
  ],
  keyWord: '',
  addCity: (city: ICity) => set(produce((draft: IStore) => {
    draft.citys.push(city)
  })),
  removeCity: (cityName: string) => set(produce((draft: IStore) => {
    const removeCityIndex = draft.citys.findIndex(target => target.name === cityName);
    if (removeCityIndex >= 0) {
      draft.citys.splice(removeCityIndex, 1);
    }
  })),
  toggleSubscribeCity: (cityName: string) => set(produce((draft: IStore) => {
    draft.citys.forEach(target => {
      if (target.name === cityName) {
        target.subscribe = !target.subscribe
      }
    })
  })),
  updateCityTemperature: (city: ICity) => set(produce((draft: IStore) => {
    draft.citys.forEach(target => {
      if (target.name === city.name) {
        target.temperature = city.temperature;
      }
    });
  })),
  updateCityWeather: (city: ICity) => set(produce((draft: IStore) => {
    draft.citys.forEach(target => {
      if (target.name === city.name) {
        target.weatherType = city.weatherType;
      }
    });
  })),
  setKeyWord: (keyWord: string) => set({ keyWord: keyWord })
}))

export {
  useStore
}
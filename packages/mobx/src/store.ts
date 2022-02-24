import { makeAutoObservable } from "mobx";
import { makeCity } from './utils';
import { ICity } from './models';

class Store {
  constructor(citys: ICity[]) {
    makeAutoObservable(this)
    this.citys = citys;
  }
  keyWord = '';
  citys: ICity[] = [];
  _historyMaxTemperature = 0;
  _historyMaxAverageTemperature = 0;

  get maxTemperature() {
    return Math.max(...this.citys.map(city => Number(city.temperature) || 0))
  }

  get averageTemperature() {
    return (store.citys.reduce((res, city) => res += Number(city.temperature) || 0, 0) / store.citys.length).toFixed(1)
  }

  get historyMaxTemperature() {
    this._historyMaxTemperature = Math.max(this._historyMaxTemperature, this.maxTemperature);
    return this._historyMaxTemperature;
  }

  get historyMaxAverageTemperature() {
    const average = store.citys.length ? Number(this.averageTemperature) : 0;
    this._historyMaxAverageTemperature = Math.max(this._historyMaxAverageTemperature, average);
    return this._historyMaxAverageTemperature;
  }

  addCity(city: ICity) {
    this.citys.push(city)
  }

  removeCity(cityName: string) {
    const removeCityIndex = this.citys.findIndex(target => target.name === cityName);
    if (removeCityIndex >= 0) {
      this.citys.splice(removeCityIndex, 1);
    }
  }

  toggleSubscribeCity(cityName: string) {
    this.citys.forEach(target => {
      if (target.name === cityName) {
        target.subscribe = !target.subscribe
      }
    });
  }

  updateCityTemperature(city: ICity) {
    this.citys.forEach(target => {
      if (target.name === city.name) {
        target.temperature = city.temperature;
      }
    });
  }

  updateCityWeather(city: ICity) {
    this.citys.forEach(target => {
      if (target.name === city.name) {
        target.weatherType = city.weatherType;
      }
    });
  }

  setKeyWord(keyWord: string) {
    this.keyWord = keyWord;
  }
}

const store = new Store([
  makeCity('北京'),
  makeCity('上海'),
  makeCity('深圳'),
  makeCity('广州'),
  makeCity('成都'),
  makeCity('南京'),
  makeCity('西安')
])

export {
  store
}
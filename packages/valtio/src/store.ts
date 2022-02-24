import { proxyWithComputed } from 'valtio/utils'
import { makeCity } from './utils';
import { ICity, IData } from './models';

let _historyMaxTemperature = 0;
let _historyMaxAverageTemperature = 0;

interface IComputed {
  maxTemperature: number;
  averageTemperature: string;
  historyMaxTemperature: number;
  historyMaxAverageTemperature: number;
}

const store: IData & IComputed = proxyWithComputed({
  keyWord: '',
  citys: [
    makeCity('北京'),
    makeCity('上海'),
    makeCity('深圳'),
    makeCity('广州'),
    makeCity('成都'),
    makeCity('南京'),
    makeCity('西安')
  ]
}, {
  maxTemperature(snap) {
    return Math.max(...snap.citys.map(snap => Number(snap.temperature) || 0))
  },
  averageTemperature(snap) {
    return (snap.citys.reduce((res, city) => res += Number(city.temperature) || 0, 0) / store.citys.length).toFixed(1)
  },
  historyMaxTemperature(snap) {
    _historyMaxTemperature = Math.max(_historyMaxTemperature, snap.maxTemperature);
    return _historyMaxTemperature;
  },
  historyMaxAverageTemperature(snap) {
    const average = snap.citys.length ? Number(snap.averageTemperature) : 0;
    _historyMaxAverageTemperature = Math.max(_historyMaxAverageTemperature, average);
    return _historyMaxAverageTemperature;
  }
})

function addCity(city: ICity) {
  store.citys.push(city);
}

function removeCity(cityName: string) {
  const removeCityIndex = store.citys.findIndex(target => target.name === cityName);
  if (removeCityIndex >= 0) {
    store.citys.splice(removeCityIndex, 1);
  }
}

function toggleSubscribeCity(cityName: string) {
  store.citys.forEach(target => {
    if (target.name === cityName) {
      target.subscribe = !target.subscribe
    }
  });
}

function updateCityTemperature(city: ICity) {
  store.citys.forEach(target => {
    if (target.name === city.name) {
      target.temperature = city.temperature;
    }
  });
}

function updateCityWeather(city: ICity) {
  store.citys.forEach(target => {
    if (target.name === city.name) {
      target.weatherType = city.weatherType;
    }
  });
}

function setKeyWord(keyWord: string) {
  store.keyWord = keyWord;
}


export {
  store,
  addCity,
  updateCityWeather,
  updateCityTemperature,
  toggleSubscribeCity,
  removeCity,
  setKeyWord
}